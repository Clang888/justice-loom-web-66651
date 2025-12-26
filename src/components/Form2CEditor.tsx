import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, IText, Rect } from "fabric";
import { Button } from "@/components/ui/button";
import { Download, X, Plus, ZoomIn, ZoomOut, Type, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Form2CEditorProps {
  onClose: () => void;
}

interface FormField {
  id: string;
  x: number;
  y: number;
  width: number;
  placeholder?: string;
}

const FIXED_WIDTH = 800;
const FIXED_HEIGHT = 1100;
const PDF_URL = "/forms/form-2c.pdf";

// Pre-positioned form fields per page based on actual form layout
const PAGE_FIELDS: Record<number, FormField[]> = {
  1: [
    // Case number at top
    { id: "case_number", x: 480, y: 105, width: 120, placeholder: "Case No." },
    // Paragraph 1 - Marriage details
    { id: "marriage_day", x: 175, y: 195, width: 60, placeholder: "Day" },
    { id: "marriage_month_year", x: 280, y: 195, width: 120, placeholder: "Month/Year" },
    { id: "spouse_name", x: 175, y: 218, width: 400, placeholder: "Spouse Name" },
    { id: "marriage_place", x: 100, y: 258, width: 550, placeholder: "Place of Marriage" },
    // Paragraph 2 - Cohabitation
    { id: "cohabitation_address", x: 100, y: 320, width: 550, placeholder: "Address where parties cohabited" },
    // Paragraph 3 - Petitioner details
    { id: "petitioner_occupation", x: 195, y: 400, width: 250, placeholder: "Petitioner Occupation" },
    { id: "petitioner_address", x: 100, y: 435, width: 550, placeholder: "Petitioner Address" },
    { id: "respondent_occupation", x: 195, y: 475, width: 250, placeholder: "Respondent Occupation" },
    { id: "respondent_address", x: 100, y: 510, width: 550, placeholder: "Respondent Address" },
    // Paragraph 4 - Children
    { id: "children_details", x: 450, y: 555, width: 250, placeholder: "Children names/details" },
  ],
  2: [
    // Paragraph 6 - Previous proceedings
    { id: "previous_proceedings", x: 100, y: 180, width: 550, placeholder: "Previous proceedings details (if any)" },
    // Paragraph 7 - Agreements
    { id: "agreement_details", x: 100, y: 280, width: 550, placeholder: "Agreement/arrangement details" },
    // Paragraph 9 - Separation details
    { id: "separation_day", x: 495, y: 395, width: 60, placeholder: "Day" },
    { id: "separation_month_year", x: 130, y: 420, width: 150, placeholder: "Month/Year" },
  ],
  3: [
    // Prayer section - Children names
    { id: "custody_children", x: 480, y: 95, width: 200, placeholder: "Child(ren) names" },
    // Ancillary relief
    { id: "ancillary_relief", x: 100, y: 180, width: 550, placeholder: "Ancillary relief details" },
    // Signature section
    { id: "signature", x: 150, y: 250, width: 300, placeholder: "Signature" },
    // Persons to be served
    { id: "persons_served", x: 100, y: 330, width: 550, placeholder: "Names and addresses of persons to be served" },
    // Petitioner address for service
    { id: "address_for_service", x: 100, y: 410, width: 550, placeholder: "Petitioner address for service" },
    // Date
    { id: "petition_day", x: 150, y: 465, width: 60, placeholder: "Day" },
    { id: "petition_month_year", x: 250, y: 465, width: 150, placeholder: "Month/Year" },
  ],
  4: [
    // Cover page
    { id: "cover_case_no", x: 480, y: 95, width: 120, placeholder: "Case No." },
    { id: "petitioner_name_cover", x: 300, y: 200, width: 250, placeholder: "Petitioner Name" },
    { id: "respondent_name_cover", x: 300, y: 290, width: 250, placeholder: "Respondent Name" },
    { id: "husband_wife", x: 350, y: 430, width: 100, placeholder: "Husband/Wife" },
    { id: "solicitors_name", x: 280, y: 490, width: 300, placeholder: "Solicitors Name" },
  ],
};

const Form2CEditor = ({ onClose }: Form2CEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageCanvasData, setPageCanvasData] = useState<Record<number, any>>({});
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(PDF_URL).promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
      } catch (err) {
        console.error("Error loading PDF:", err);
        toast.error("Failed to load PDF document");
      }
    };
    loadPdf();
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    let canvas: FabricCanvas | null = null;
    
    try {
      canvas = new FabricCanvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        width: FIXED_WIDTH,
        height: FIXED_HEIGHT,
      });
      setFabricCanvas(canvas);
    } catch (err) {
      console.error("Error creating canvas", err);
      toast.error("Failed to initialize canvas");
      setIsLoading(false);
    }

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  // Add pre-positioned fields to canvas
  const addPrePositionedFields = useCallback((canvas: FabricCanvas, page: number) => {
    const fields = PAGE_FIELDS[page] || [];
    
    fields.forEach((field) => {
      // Create background rectangle for the field
      const rect = new Rect({
        left: field.x,
        top: field.y,
        width: field.width,
        height: 22,
        fill: "rgba(255, 255, 240, 0.9)",
        stroke: "#cbd5e1",
        strokeWidth: 1,
        rx: 2,
        ry: 2,
        selectable: false,
        evented: false,
      });
      
      // Create editable text field
      const text = new IText(field.placeholder || "", {
        left: field.x + 4,
        top: field.y + 3,
        fontSize: 12,
        fontFamily: "Arial",
        fill: "#64748b",
        width: field.width - 8,
        selectable: true,
        editable: true,
      });

      // Clear placeholder on first edit
      text.on("editing:entered", () => {
        if (text.text === field.placeholder) {
          text.set("text", "");
          text.set("fill", "#000000");
          canvas.renderAll();
        }
      });

      // Restore placeholder if empty
      text.on("editing:exited", () => {
        if (text.text === "") {
          text.set("text", field.placeholder || "");
          text.set("fill", "#64748b");
          canvas.renderAll();
        }
      });

      canvas.add(rect);
      canvas.add(text);
    });
    
    canvas.renderAll();
  }, []);

  // Render PDF page to canvas
  useEffect(() => {
    if (!fabricCanvas || !pdfDoc) return;

    const renderPage = async () => {
      setIsLoading(true);
      
      try {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale: 2 });
        
        // Create a temporary canvas for PDF rendering
        const tempCanvas = document.createElement("canvas");
        const context = tempCanvas.getContext("2d");
        if (!context) throw new Error("Could not get canvas context");
        
        tempCanvas.width = viewport.width;
        tempCanvas.height = viewport.height;
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
        
        // Convert to image for Fabric.js
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        
        img.onload = () => {
          try {
            const fabricImg = new FabricImage(img);
            
            // Scale to fit fixed dimensions while maintaining aspect ratio
            const scaleX = FIXED_WIDTH / img.width;
            const scaleY = FIXED_HEIGHT / img.height;
            const imgScale = Math.min(scaleX, scaleY);
            
            fabricImg.scale(imgScale);
            fabricImg.set({
              left: (FIXED_WIDTH - img.width * imgScale) / 2,
              top: 0,
            });
            
            // Clear canvas first
            fabricCanvas.clear();
            fabricCanvas.backgroundImage = fabricImg;
            
            // Restore any saved text objects for this page
            if (pageCanvasData[currentPage]) {
              fabricCanvas.loadFromJSON(pageCanvasData[currentPage], () => {
                // Re-set background after loading JSON
                fabricCanvas.backgroundImage = fabricImg;
                fabricCanvas.renderAll();
                setIsLoading(false);
              });
            } else {
              // Add pre-positioned fields for new pages
              addPrePositionedFields(fabricCanvas, currentPage);
              fabricCanvas.renderAll();
              setIsLoading(false);
            }
          } catch (err) {
            console.error("Error setting up fabric image", err);
            toast.error("Failed to load page");
            setIsLoading(false);
          }
        };
        
        img.onerror = () => {
          toast.error("Failed to load page image");
          setIsLoading(false);
        };
        
        img.src = tempCanvas.toDataURL("image/png");
      } catch (err) {
        console.error("Error rendering PDF page:", err);
        toast.error("Failed to render page");
        setIsLoading(false);
      }
    };
    
    renderPage();
  }, [fabricCanvas, pdfDoc, currentPage, addPrePositionedFields]);

  // Save current page data before switching
  const saveCurrentPageData = useCallback(() => {
    if (!fabricCanvas) return;
    
    const json = fabricCanvas.toJSON();
    setPageCanvasData(prev => ({
      ...prev,
      [currentPage]: json
    }));
  }, [fabricCanvas, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    saveCurrentPageData();
    setCurrentPage(newPage);
  };

  // Handle click to add text
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleMouseDown = (e: any) => {
      if (!e.target) {
        const pointer = fabricCanvas.getPointer(e.e);
        addTextAtPosition(pointer.x, pointer.y);
      }
    };

    fabricCanvas.on("mouse:down", handleMouseDown);

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
    };
  }, [fabricCanvas]);

  const addTextAtPosition = useCallback((x: number, y: number) => {
    if (!fabricCanvas) return;

    const text = new IText("", {
      left: x,
      top: y - 14,
      fontSize: 14,
      fontFamily: "Arial",
      fill: "#000000",
      backgroundColor: "rgba(255,255,255,0.9)",
      padding: 1,
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
    fabricCanvas.renderAll();
  }, [fabricCanvas]);

  const addTextField = useCallback(() => {
    if (!fabricCanvas) return;
    addTextAtPosition(FIXED_WIDTH / 4, FIXED_HEIGHT / 4);
  }, [fabricCanvas, addTextAtPosition]);

  const handleZoomIn = () => {
    if (!fabricCanvas) return;
    const newScale = Math.min(scale * 1.2, 2);
    setScale(newScale);
    fabricCanvas.setZoom(newScale);
    fabricCanvas.renderAll();
  };

  const handleZoomOut = () => {
    if (!fabricCanvas) return;
    const newScale = Math.max(scale / 1.2, 0.5);
    setScale(newScale);
    fabricCanvas.setZoom(newScale);
    fabricCanvas.renderAll();
  };

  const handleDownload = useCallback(async () => {
    if (!fabricCanvas || !pdfDoc) return;

    // Save current page first
    saveCurrentPageData();

    toast.info("Preparing download...");

    // Download each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });
        
        const tempCanvas = document.createElement("canvas");
        const context = tempCanvas.getContext("2d");
        if (!context) continue;
        
        tempCanvas.width = viewport.width;
        tempCanvas.height = viewport.height;
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
        
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          
          img.onload = async () => {
            const fabricImg = new FabricImage(img);
            const scaleX = FIXED_WIDTH / img.width;
            const scaleY = FIXED_HEIGHT / img.height;
            const imgScale = Math.min(scaleX, scaleY);
            
            fabricImg.scale(imgScale);
            fabricImg.set({
              left: (FIXED_WIDTH - img.width * imgScale) / 2,
              top: 0,
            });

            fabricCanvas.backgroundImage = fabricImg;
            
            // Load saved data for this page
            if (pageCanvasData[pageNum]) {
              await new Promise<void>((res) => {
                fabricCanvas.loadFromJSON(pageCanvasData[pageNum], () => {
                  fabricCanvas.renderAll();
                  res();
                });
              });
            } else {
              fabricCanvas.clear();
              fabricCanvas.backgroundImage = fabricImg;
            }

            fabricCanvas.discardActiveObject();
            fabricCanvas.renderAll();

            const dataURL = fabricCanvas.toDataURL({
              format: "png",
              quality: 1,
              multiplier: 2,
            });

            const link = document.createElement("a");
            link.download = `Form-2C-Page-${pageNum}.png`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            resolve();
          };
          
          img.src = tempCanvas.toDataURL("image/png");
        });
      } catch (err) {
        console.error(`Error downloading page ${pageNum}:`, err);
      }
    }

    toast.success("All pages downloaded!");
  }, [fabricCanvas, pdfDoc, pageCanvasData, saveCurrentPageData, totalPages]);

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold">Petition_Form 2C: Joint Application for Divorce based on One Year Separation</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-20 text-center">
            Page {currentPage} / {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={isLoading}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={isLoading}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button variant="outline" size="sm" onClick={addTextField} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-1" />
            <Type className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleDownload} disabled={isLoading}>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 p-2 text-center text-sm text-muted-foreground">
        {isLoading 
          ? "Loading page..." 
          : "Click anywhere on the form to add text. Click on text to edit. Drag to reposition."
        }
      </div>

      {/* Canvas container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex justify-center items-start"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading page...</p>
            </div>
          </div>
        )}
        <div className="shadow-lg border border-border bg-white">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default Form2CEditor;
