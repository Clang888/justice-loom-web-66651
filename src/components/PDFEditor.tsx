import { useState, useEffect, useRef, useCallback } from "react";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface FormField {
  name: string;
  type: "text" | "checkbox" | "dropdown" | "radio";
  value: string | boolean;
  options?: string[];
  rect?: { x: number; y: number; width: number; height: number };
  pageIndex: number;
}

interface PDFEditorProps {
  pdfUrl: string;
  formName: string;
  onClose: () => void;
}

const PDFEditor = ({ pdfUrl, formName, onClose }: PDFEditorProps) => {
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, string | boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(true);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load and parse PDF
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the PDF
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error("Failed to fetch PDF");
        
        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        setPdfBytes(bytes);

        // Load with pdf-lib to get form fields
        const pdfLibDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        setTotalPages(pdfLibDoc.getPageCount());

        // Extract form fields
        const form = pdfLibDoc.getForm();
        const fields = form.getFields();
        const extractedFields: FormField[] = [];
        const initialValues: Record<string, string | boolean> = {};

        fields.forEach((field) => {
          const name = field.getName();
          let fieldData: FormField | null = null;

          if (field instanceof PDFTextField) {
            const text = field.getText() || "";
            fieldData = {
              name,
              type: "text",
              value: text,
              pageIndex: 0,
            };
            initialValues[name] = text;
          } else if (field instanceof PDFCheckBox) {
            const isChecked = field.isChecked();
            fieldData = {
              name,
              type: "checkbox",
              value: isChecked,
              pageIndex: 0,
            };
            initialValues[name] = isChecked;
          } else if (field instanceof PDFDropdown) {
            const selected = field.getSelected();
            const options = field.getOptions();
            fieldData = {
              name,
              type: "dropdown",
              value: selected[0] || "",
              options,
              pageIndex: 0,
            };
            initialValues[name] = selected[0] || "";
          } else if (field instanceof PDFRadioGroup) {
            const selected = field.getSelected() || "";
            const options = field.getOptions();
            fieldData = {
              name,
              type: "radio",
              value: selected,
              options,
              pageIndex: 0,
            };
            initialValues[name] = selected;
          }

          if (fieldData) {
            extractedFields.push(fieldData);
          }
        });

        setFormFields(extractedFields);
        setFieldValues(initialValues);

        // Render pages using pdf.js
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdfJsDoc = await loadingTask.promise;
        const images: string[] = [];

        for (let i = 1; i <= pdfJsDoc.numPages; i++) {
          const page = await pdfJsDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2 }); // Higher resolution for quality
          
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
            images.push(canvas.toDataURL("image/png"));
          }
        }

        setPageImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading PDF:", error);
        toast({
          title: "Error loading PDF",
          description: "The PDF could not be loaded. It may not have fillable form fields.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl, toast]);

  // Update field value
  const handleFieldChange = useCallback((name: string, value: string | boolean) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Download filled PDF
  const handleDownload = async () => {
    if (!pdfBytes) return;

    try {
      const pdfLibDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      const form = pdfLibDoc.getForm();

      // Apply field values
      Object.entries(fieldValues).forEach(([name, value]) => {
        try {
          const field = form.getField(name);
          
          if (field instanceof PDFTextField && typeof value === "string") {
            field.setText(value);
          } else if (field instanceof PDFCheckBox && typeof value === "boolean") {
            if (value) {
              field.check();
            } else {
              field.uncheck();
            }
          } else if (field instanceof PDFDropdown && typeof value === "string") {
            field.select(value);
          } else if (field instanceof PDFRadioGroup && typeof value === "string") {
            field.select(value);
          }
        } catch (e) {
          console.warn(`Could not set field ${name}:`, e);
        }
      });

      // Flatten form to make it non-editable (optional)
      // form.flatten();

      const filledPdfBytes = await pdfLibDoc.save();
      const blob = new Blob([new Uint8Array(filledPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formName.replace(/\s+/g, "_")}_filled.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Downloaded",
        description: "Your filled form has been downloaded.",
      });
    } catch (error) {
      console.error("Error saving PDF:", error);
      toast({
        title: "Error",
        description: "Failed to save the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading PDF editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
          <h2 className="font-semibold truncate max-w-[300px]">{formName}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale((s) => Math.min(2, s + 0.2))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          {/* Page navigation */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={handleDownload} className="ml-4">
            <Download className="w-4 h-4 mr-2" />
            Download Filled PDF
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* PDF Preview */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto bg-muted/30 p-4"
        >
          <div className="flex justify-center">
            {pageImages[currentPage - 1] && (
              <img
                src={pageImages[currentPage - 1]}
                alt={`Page ${currentPage}`}
                style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
                className="shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Form Fields Panel */}
        <div className="w-96 border-l border-border bg-card overflow-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Form Fields ({formFields.length})</h3>
            
            {formFields.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No fillable fields detected in this PDF.</p>
                <p className="text-xs mt-2">
                  This PDF may be a flat document without interactive form fields.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground block">
                      {field.name.replace(/[_-]/g, " ")}
                    </label>
                    
                    {field.type === "text" && (
                      <input
                        type="text"
                        value={(fieldValues[field.name] as string) || ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder={`Enter ${field.name.replace(/[_-]/g, " ").toLowerCase()}`}
                      />
                    )}
                    
                    {field.type === "checkbox" && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(fieldValues[field.name] as boolean) || false}
                          onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm">Checked</span>
                      </label>
                    )}
                    
                    {field.type === "dropdown" && field.options && (
                      <select
                        value={(fieldValues[field.name] as string) || ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {field.type === "radio" && field.options && (
                      <div className="space-y-1">
                        {field.options.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={field.name}
                              value={option}
                              checked={fieldValues[field.name] === option}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFEditor;
