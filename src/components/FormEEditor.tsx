import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, IText } from "fabric";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { Download, X, Plus, ZoomIn, ZoomOut, Type, ChevronLeft, ChevronRight, Loader2, Save, LogIn } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { validateAndSanitizeFormData, sanitizeLoadedFormData } from "@/lib/formDataValidation";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface FormEEditorProps {
  onClose: () => void;
}

const FIXED_WIDTH = 800;
const FIXED_HEIGHT = 1100;
const FORM_E_NAME = "Form E: Financial Statement";

// Multiple PDFs to load as part of Form E
const PDF_URLS = [
  "/forms/form-e.pdf",
  "/forms/form-e-additional.pdf"
];

const FormEEditor = ({ onClose }: FormEEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageCanvasData, setPageCanvasData] = useState<Record<number, any>>({});
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [savedFormId, setSavedFormId] = useState<string | null>(null);
  const [legalFormId, setLegalFormId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check authentication
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load legal form ID and existing saved form
  useEffect(() => {
    const loadSavedForm = async () => {
      if (!user) return;

      try {
        // Get the legal form ID for Form E
        const { data: legalForm, error: legalFormError } = await supabase
          .from("legal_forms")
          .select("id")
          .eq("form_name", FORM_E_NAME)
          .single();

        if (legalFormError || !legalForm) {
          console.error("Error fetching legal form:", legalFormError);
          return;
        }

        setLegalFormId(legalForm.id);

        // Check if user has a saved form
        const { data: savedForm, error: savedFormError } = await supabase
          .from("saved_forms")
          .select("id, form_data")
          .eq("user_id", user.id)
          .eq("legal_form_id", legalForm.id)
          .maybeSingle();

        if (savedFormError) {
          console.error("Error fetching saved form:", savedFormError);
          return;
        }

        if (savedForm) {
          setSavedFormId(savedForm.id);
          if (savedForm.form_data && typeof savedForm.form_data === "object") {
            // Sanitize loaded form data
            const sanitizedData = sanitizeLoadedFormData(savedForm.form_data);
            if (sanitizedData && typeof sanitizedData === "object") {
              const formData = sanitizedData as Record<string, unknown>;
              if (formData.pageCanvasData) {
                setPageCanvasData(formData.pageCanvasData as Record<number, unknown>);
                toast.success("Loaded your saved progress");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading saved form:", error);
      }
    };

    loadSavedForm();
  }, [user]);

  // Load all PDFs and convert pages to images
  useEffect(() => {
    const loadAllPDFs = async () => {
      try {
        setIsLoading(true);
        const allImages: string[] = [];
        let totalPageCount = 0;
        
        for (const pdfUrl of PDF_URLS) {
          const response = await fetch(pdfUrl);
          if (!response.ok) throw new Error(`Failed to fetch PDF: ${pdfUrl}`);
          
          const arrayBuffer = await response.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          
          const loadingTask = pdfjsLib.getDocument({ data: bytes });
          const pdfDoc = await loadingTask.promise;
          totalPageCount += pdfDoc.numPages;
          
          for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            if (context) {
              await page.render({ canvasContext: context, viewport }).promise;
              allImages.push(canvas.toDataURL("image/png"));
            }
          }
        }
        
        setTotalPages(totalPageCount);
        setPageImages(allImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading PDFs:", error);
        toast.error("Failed to load PDF");
        setIsLoading(false);
      }
    };
    
    loadAllPDFs();
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || pageImages.length === 0) return;

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
    }

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [pageImages]);

  // Load page image when currentPage or fabricCanvas changes
  useEffect(() => {
    if (!fabricCanvas || pageImages.length === 0) return;

    const imageUrl = pageImages[currentPage - 1];
    if (!imageUrl) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
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
        
        if (pageCanvasData[currentPage]) {
          fabricCanvas.loadFromJSON(pageCanvasData[currentPage], () => {
            fabricCanvas.renderAll();
          });
        } else {
          fabricCanvas.clear();
          fabricCanvas.backgroundImage = fabricImg;
          fabricCanvas.renderAll();
        }
      } catch (err) {
        console.error("Error setting up fabric image", err);
        toast.error("Failed to load page");
      }
    };
    
    img.onerror = () => {
      toast.error("Failed to load page image");
    };
    
    img.src = imageUrl;
  }, [fabricCanvas, currentPage, pageImages, pageCanvasData]);

  // Track changes
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleObjectModified = () => {
      setHasUnsavedChanges(true);
    };

    fabricCanvas.on("object:modified", handleObjectModified);
    fabricCanvas.on("object:added", handleObjectModified);

    return () => {
      fabricCanvas.off("object:modified", handleObjectModified);
      fabricCanvas.off("object:added", handleObjectModified);
    };
  }, [fabricCanvas]);

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

  // Save progress to database
  const handleSaveProgress = async () => {
    if (!user) {
      toast.error("Please log in to save your progress");
      return;
    }

    if (!legalFormId) {
      toast.error("Form configuration not found");
      return;
    }

    setIsSaving(true);
    saveCurrentPageData();

    try {
      // Wait a bit for state to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const rawFormData = {
        pageCanvasData: { ...pageCanvasData, [currentPage]: fabricCanvas?.toJSON() }
      };

      // Validate and sanitize form data before saving
      const { isValid, data: sanitizedFormData, error: validationError } = validateAndSanitizeFormData(rawFormData);
      
      if (!isValid || !sanitizedFormData) {
        toast.error(validationError || "Invalid form data");
        return;
      }

      if (savedFormId) {
        // Update existing saved form
        const { error } = await supabase
          .from("saved_forms")
          .update({ 
            form_data: JSON.parse(JSON.stringify(sanitizedFormData)),
            updated_at: new Date().toISOString()
          })
          .eq("id", savedFormId);

        if (error) throw error;
      } else {
        // Create new saved form
        const { data, error } = await supabase
          .from("saved_forms")
          .insert([{
            user_id: user.id,
            legal_form_id: legalFormId,
            form_data: JSON.parse(JSON.stringify(sanitizedFormData)),
            is_completed: false
          }])
          .select("id")
          .single();

        if (error) throw error;
        setSavedFormId(data.id);
      }

      setHasUnsavedChanges(false);
      toast.success("Progress saved successfully");
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
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
    if (!fabricCanvas || pageImages.length === 0) return;

    saveCurrentPageData();

    toast.info("Preparing download... This may take a moment for all pages.");

    for (let page = 1; page <= totalPages; page++) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve) => {
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
          
          if (pageCanvasData[page]) {
            await new Promise<void>((res) => {
              fabricCanvas.loadFromJSON(pageCanvasData[page], () => {
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
          link.download = `Form-E-Page-${page}.png`;
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          resolve();
        };
        
        img.src = pageImages[page - 1];
      });
    }

    toast.success("All pages downloaded!");
  }, [fabricCanvas, pageImages, pageCanvasData, saveCurrentPageData, totalPages]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Form E...</p>
          <p className="text-sm text-muted-foreground mt-2">Converting PDF pages to editable format</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold">Form E: Financial Statement</h2>
          {hasUnsavedChanges && (
            <span className="text-xs text-muted-foreground">(unsaved changes)</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-24 text-center">
            Page {currentPage} / {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button variant="outline" size="sm" onClick={addTextField}>
            <Plus className="h-4 w-4 mr-1" />
            <Type className="h-4 w-4" />
          </Button>

          {/* Save Progress Button */}
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleSaveProgress} 
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Progress
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Log in to Save
            </Button>
          )}
          
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 p-2 text-center text-sm text-muted-foreground">
        Click anywhere on the form to add text. Click on text to edit. Drag to reposition.
        {user && " Your progress is saved to your account."}
      </div>

      {/* Canvas container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex justify-center items-start"
      >
        <div className="shadow-lg border border-border bg-white">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default FormEEditor;
