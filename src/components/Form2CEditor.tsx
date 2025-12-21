import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, IText } from "fabric";
import { Button } from "@/components/ui/button";
import { Download, X, Plus, ZoomIn, ZoomOut, Type } from "lucide-react";
import { toast } from "sonner";

interface Form2CEditorProps {
  onClose: () => void;
}

const Form2CEditor = ({ onClose }: Form2CEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Initialize canvas after component mounts
  useEffect(() => {
    console.log("Form2CEditor: useEffect running", { 
      canvasRef: canvasRef.current, 
      containerRef: containerRef.current 
    });
    
    if (!canvasRef.current) {
      console.error("Form2CEditor: canvasRef is null");
      return;
    }

    let canvas: FabricCanvas | null = null;
    
    try {
      canvas = new FabricCanvas(canvasRef.current, {
        backgroundColor: "#f5f5f5",
        width: 800,
        height: 1000,
      });
      console.log("Form2CEditor: Canvas created successfully");
      setFabricCanvas(canvas);
    } catch (err) {
      console.error("Form2CEditor: Error creating canvas", err);
      toast.error("Failed to initialize canvas");
      setIsLoading(false);
      return;
    }

    // Load the form image as background using HTMLImageElement
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      console.log("Form2CEditor: Image loaded successfully", img.width, img.height);
      try {
        const fabricImg = new FabricImage(img);
        const containerWidth = containerRef.current?.clientWidth || 800;
        const imgWidth = img.width || 800;
        const imgHeight = img.height || 1000;
        
        // Scale to fit container width
        const scaleFactor = Math.min((containerWidth - 32) / imgWidth, 1);
        
        canvas!.setWidth(imgWidth * scaleFactor);
        canvas!.setHeight(imgHeight * scaleFactor);
        
        fabricImg.scaleToWidth(imgWidth * scaleFactor);
        
        // Set as background
        canvas!.backgroundImage = fabricImg;
        canvas!.renderAll();
        
        setScale(scaleFactor);
        setIsLoading(false);
        setImageLoaded(true);
        toast.success("Form loaded! Click anywhere to add text.");
      } catch (err) {
        console.error("Form2CEditor: Error setting up fabric image", err);
        toast.error("Failed to set up form");
        setIsLoading(false);
      }
    };
    
    img.onerror = (err) => {
      console.error("Form2CEditor: Error loading form image:", err);
      toast.error("Failed to load form image");
      setIsLoading(false);
    };
    
    console.log("Form2CEditor: Starting image load from /forms/form-2c.png");
    img.src = "/forms/form-2c.png";

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  // Handle click to add text
  useEffect(() => {
    if (!fabricCanvas || !imageLoaded) return;

    const handleMouseDown = (e: any) => {
      // Only add text if clicking on empty area
      if (!e.target) {
        const pointer = fabricCanvas.getPointer(e.e);
        addTextAtPosition(pointer.x, pointer.y);
      }
    };

    fabricCanvas.on("mouse:down", handleMouseDown);

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
    };
  }, [fabricCanvas, imageLoaded]);

  const addTextAtPosition = useCallback((x: number, y: number) => {
    if (!fabricCanvas) return;

    const text = new IText("", {
      left: x,
      top: y - 14, // Position text above the click point so it sits on the line
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
    
    const canvasWidth = fabricCanvas.getWidth();
    const canvasHeight = fabricCanvas.getHeight();
    
    addTextAtPosition(canvasWidth / 4, canvasHeight / 4);
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

  const handleDownload = useCallback(() => {
    if (!fabricCanvas) return;

    // Deselect all objects before export
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();

    // Export as PNG
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2, // Higher resolution for print
    });

    // Create download link
    const link = document.createElement("a");
    link.download = "Form-2C-Joint-Application-Completed.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Form downloaded successfully!");
  }, [fabricCanvas]);

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold">Form 2C: Joint Application for Divorce</h2>
        </div>
        
        <div className="flex items-center gap-2">
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
            Download
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 p-2 text-center text-sm text-muted-foreground">
        {isLoading ? "Loading form..." : "Click anywhere on the form to add text. Click on text to edit. Drag to reposition."}
      </div>

      {/* Canvas container - always rendered so ref is available */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex justify-center items-start"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading form editor...</p>
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
