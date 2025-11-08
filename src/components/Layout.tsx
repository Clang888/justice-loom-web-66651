import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ChevronRight, LogOut, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <Scale className="w-6 h-6" aria-hidden="true" />
            <span>Just Law</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/mission" className="hover:text-foreground">Mission</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <Link to="/briefcase" className="hover:text-foreground">Briefcase</Link>
            <Link to="/books" className="hover:text-foreground">Books</Link>
            <Link to="/speaking" className="hover:text-foreground">Speaking</Link>
            <Link to="/testimonials" className="hover:text-foreground">Testimonials</Link>
            <Link to="/community" className="hover:text-foreground">Community</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-foreground flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="inline-flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Link to="/auth" className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 hover:bg-secondary">
                Login <ChevronRight className="w-4 h-4" />
              </Link>
            )}
            <Link to="/contact" className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 hover:bg-secondary">
              Contact <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-semibold mb-3">
                <Scale className="w-5 h-5" />
                <span>Just Law</span>
              </div>
              <p className="text-sm text-muted-foreground">Making justice easy to find, easy to understand, and easy to use.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/mission" className="hover:underline">Mission</Link></li>
                <li><Link to="/about" className="hover:underline">About</Link></li>
                <li><Link to="/speaking" className="hover:underline">Speaking</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/services" className="hover:underline">Services</Link></li>
                <li><Link to="/briefcase" className="hover:underline">Briefcase</Link></li>
                <li><Link to="/books" className="hover:underline">Books</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/community" className="hover:underline">Community</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Just Law. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
