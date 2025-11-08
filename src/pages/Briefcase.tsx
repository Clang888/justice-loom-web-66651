import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileText, Mic, Square, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Briefcase = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI legal assistant for Hong Kong legal forms. I'm currently in BETA and specialize in Hong Kong jurisdiction only. I can help you discover the right legal forms for your situation. Tell me what you need help with, such as divorce, small claims, or wills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceRecording();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("briefcase-chat", {
        body: { messages: [...messages, userMessage] },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecording = async () => {
    if (isRecording) {
      const transcribedText = await stopRecording();
      if (transcribedText) {
        setInput(transcribedText);
      }
    } else {
      await startRecording();
    }
  };

  const handleDownload = async (formName: string, formNumber: string) => {
    try {
      // Clean up form number and try multiple variations
      const cleanFormNumber = formNumber.trim().toUpperCase();
      
      // Try exact match first
      let { data: formData, error: queryError } = await supabase
        .from("legal_forms")
        .select("pdf_file_path, form_name")
        .ilike("form_number", cleanFormNumber)
        .maybeSingle();

      // If not found, try with "FORM " prefix
      if (!formData && !cleanFormNumber.startsWith("FORM")) {
        const result = await supabase
          .from("legal_forms")
          .select("pdf_file_path, form_name")
          .ilike("form_number", `FORM ${cleanFormNumber}`)
          .maybeSingle();
        formData = result.data;
        queryError = result.error;
      }

      if (queryError) throw queryError;

      if (!formData) {
        toast({
          title: "Form not found",
          description: `Could not find ${formName} in the database.`,
          variant: "destructive",
        });
        return;
      }

      // Get signed URL for secure download (1 hour expiry)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("legal-forms")
        .createSignedUrl(formData.pdf_file_path, 3600);

      if (signedUrlError) throw signedUrlError;
      if (!signedUrlData?.signedUrl) {
        throw new Error("Failed to generate download URL");
      }

      // Fetch the file using the signed URL
      const response = await fetch(signedUrlData.signedUrl);
      if (!response.ok) throw new Error("Failed to download file");
      
      const fileBlob = await response.blob();
      const url = URL.createObjectURL(fileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.form_name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download started",
        description: `${formName} is being downloaded.`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Unable to download the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderMessageContent = (content: string) => {
    // Parse [DOWNLOAD:Form Name:form_number] format
    const downloadRegex = /\[DOWNLOAD:(.*?):(.*?)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = downloadRegex.exec(content)) !== null) {
      // Add text before the download link
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add download button
      const formName = match[1];
      const formNumber = match[2];
      parts.push(
        <Button
          key={`download-${match.index}`}
          onClick={() => handleDownload(formName, formNumber)}
          className="inline-flex items-center gap-2 my-2 mx-1"
          size="sm"
        >
          <Download className="w-4 h-4" />
          Download {formName}
        </Button>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>
      );
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <section className="bg-background py-8 h-screen flex flex-col">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col overflow-hidden">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="w-8 h-8" />
              Briefcase
            </h1>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              BETA - HK Only
            </span>
          </div>
          <p className="text-muted-foreground text-lg mb-6">
            Your AI-powered legal assistant for quick form discovery in Hong Kong. Describe the form you need or your legal 
            situation, and I'll help you find the right documents. Voice input supported for convenience.
          </p>
          
          <div className="space-y-3 mb-6">
            <h2 className="font-semibold text-lg">Key Features:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>AI powered voice recognition captures a user's story & automatically fills out required court forms</li>
              <li>Outcome prediction & financial analysis</li>
              <li>Bilingual interface (starting in Hong Kong)</li>
              <li>Localised workflows for common law jurisdictions</li>
              <li>Court-ready PDFs for filing</li>
              <li>Transparent subscription model - no mid-journey charges or paywall traps</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 bg-card border border-border rounded-lg flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="border-t border-border p-4 bg-card"
          >
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleVoiceRecording}
                disabled={isLoading || isProcessing}
                className="px-4"
              >
                {isRecording ? (
                  <Square className="w-4 h-4 text-destructive" />
                ) : isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your legal situation or click mic to record..."
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isLoading || isRecording}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim() || isRecording || isProcessing}
                className="px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Briefcase;
