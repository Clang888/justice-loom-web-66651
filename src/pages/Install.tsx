import { useState, useEffect } from "react";
import { Download, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-4">App Installed!</h1>
        <p className="text-muted-foreground max-w-md">
          Just Law is now installed on your device. You can access it from your home screen.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <Smartphone className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-3xl font-serif font-bold mb-4">Install Just Law</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Install our app on your device for quick access, offline support, and a better experience.
      </p>

      {isIOS ? (
        <div className="bg-muted p-6 rounded-lg max-w-md">
          <h3 className="font-semibold mb-3">To install on iPhone/iPad:</h3>
          <ol className="text-left text-sm text-muted-foreground space-y-2">
            <li>1. Tap the <strong>Share</strong> button in Safari</li>
            <li>2. Scroll down and tap <strong>"Add to Home Screen"</strong></li>
            <li>3. Tap <strong>Add</strong> in the top right</li>
          </ol>
        </div>
      ) : deferredPrompt ? (
        <Button onClick={handleInstall} size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Install App
        </Button>
      ) : (
        <div className="bg-muted p-6 rounded-lg max-w-md">
          <h3 className="font-semibold mb-3">To install:</h3>
          <p className="text-sm text-muted-foreground">
            Open this page in Chrome or Edge, then click the install icon in the address bar, 
            or use the browser menu and select "Install app" or "Add to Home Screen".
          </p>
        </div>
      )}
    </div>
  );
};

export default Install;
