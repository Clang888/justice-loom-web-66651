import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Briefcase = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI legal assistant. I can help you discover the right legal forms for your situation. Tell me what you need help with, such as divorce, small claims, or wills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  return (
    <section className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Briefcase: Your Law Companion
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Get guidance for divorce, small claims and wills, with outcome prediction & financial analysis. 
            Bilingual starting in HK, localised workflows, PDFs ready for Court filing. 
            Expand to all common law jurisdictions.
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

        <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your legal situation..."
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
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
