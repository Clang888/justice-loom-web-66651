import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import FormsLibrary from "@/components/FormsLibrary";

const Forms = () => {
  return (
    <>
      
      <section className="bg-background min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  Hong Kong Family Court Forms
                </h1>
                <p className="text-muted-foreground mt-2">
                  Browse and download official Hong Kong court forms. Click "Edit in Browser" to fill forms directly.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <Link to="/ai-tools">
              <div className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer max-w-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Try Form E Beta</h3>
                    <p className="text-sm text-muted-foreground">Fill out the Financial Statement form in your browser</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Forms Library */}
          <FormsLibrary />

          {/* Source Attribution */}
          <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Forms sourced from the{" "}
              <a 
                href="https://www.judiciary.hk/en/court_services_facilities/fcf.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hong Kong Judiciary
              </a>
              . For the most up-to-date forms, please visit the official website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forms;
