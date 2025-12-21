import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, IText } from "fabric";
import { Button } from "@/components/ui/button";
import { Download, X, Plus, ZoomIn, ZoomOut, Type, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { toast } from "sonner";

interface Form2CEditorProps {
  onClose: () => void;
}

const TOTAL_PAGES = 3;
const FIXED_WIDTH = 800;
const FIXED_HEIGHT = 1100;

const Form2CEditor = ({ onClose }: Form2CEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [pageCanvasData, setPageCanvasData] = useState<Record<number, any>>({});
  const [needsUpload, setNeedsUpload] = useState(true);

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
      setIsLoading(false);
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

  // Load page image when currentPage or pageImages changes
  useEffect(() => {
    if (!fabricCanvas || pageImages.length === 0) return;

    const pageIndex = currentPage - 1;
    const imageUrl = pageImages[pageIndex];
    
    if (!imageUrl) return;

    setIsLoading(true);
    
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
        
        fabricCanvas.backgroundImage = fabricImg;
        
        // Restore any saved text objects for this page
        if (pageCanvasData[currentPage]) {
          fabricCanvas.loadFromJSON(pageCanvasData[currentPage], () => {
            fabricCanvas.renderAll();
          });
        } else {
          fabricCanvas.clear();
          fabricCanvas.backgroundImage = fabricImg;
          fabricCanvas.renderAll();
        }
        
        setIsLoading(false);
        setNeedsUpload(false);
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
    
    img.src = imageUrl;
  }, [fabricCanvas, currentPage, pageImages]);

  // Save current page data before switching
  const saveCurrentPageData = useCallback(() => {
    if (!fabricCanvas) return;
    
    const json = fabricCanvas.toJSON();
    setPageCanvasData(prev => ({
      ...prev,
      [currentPage]: json
    }));
  }, [fabricCanvas, currentPage]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    if (fileArray.length !== 3) {
      toast.error("Please upload exactly 3 PNG images for the 3 pages");
      return;
    }

    // Sort files by name to ensure correct order
    fileArray.sort((a, b) => a.name.localeCompare(b.name));

    const imageUrls: string[] = [];
    fileArray.forEach((file) => {
      const url = URL.createObjectURL(file);
      imageUrls.push(url);
    });

    setPageImages(imageUrls);
    setCurrentPage(1);
    toast.success("Form pages loaded! Click anywhere to add text.");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > TOTAL_PAGES || newPage === currentPage) return;
    saveCurrentPageData();
    setCurrentPage(newPage);
  };

  // Handle click to add text
  useEffect(() => {
    if (!fabricCanvas || needsUpload) return;

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
  }, [fabricCanvas, needsUpload]);

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

    // Save current page first
    saveCurrentPageData();

    toast.info("Preparing download...");

    // Download each page
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      // Load page image
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
          
          // Load saved data for this page
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
          link.download = `Form-2C-Page-${page}.png`;
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          resolve();
        };
        
        img.src = pageImages[page - 1];
      });
    }

    // Reload current page
    const currentImg = new window.Image();
    currentImg.src = pageImages[currentPage - 1];

    toast.success("All pages downloaded!");
  }, [fabricCanvas, pageImages, pageCanvasData, currentPage, saveCurrentPageData]);

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold">Form 2C - Joint Application for Divorce</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {!needsUpload && (
            <>
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
                Page {currentPage} / {TOTAL_PAGES}
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === TOTAL_PAGES || isLoading}
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
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 p-2 text-center text-sm text-muted-foreground">
        {needsUpload 
          ? "Upload the 3 form pages (PNG images) to get started"
          : isLoading 
            ? "Loading page..." 
            : "Click anywhere on the form to add text. Click on text to edit. Drag to reposition."
        }
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Canvas container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex justify-center items-start"
      >
        {needsUpload ? (
          <div 
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Form 2C Pages</h3>
            <p className="text-muted-foreground mb-4">
              Select all 3 page images at once (hold Ctrl/Cmd to select multiple)
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Form2CEditor;