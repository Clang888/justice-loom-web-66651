import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Shield, Menu, X, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border no-print">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center font-semibold text-lg">
            <img src="/just-law-logo.jpg" alt="Just Law" className="h-16 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-6 text-sm flex-1">
            <Link to="/services" className="hover:text-foreground text-center">{t('nav.divorceWills').split(' & ').join('\n& ').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</Link>
            <Link to="/egg-freezing-surrogacy" className="hover:text-foreground text-center">{t('nav.surrogacyEggFreezing').split(' & ').join('\n& ').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</Link>
            
            <Link to="/books" className="hover:text-foreground text-center">{t('nav.booksPublicSpeaking').split(' & ').join('\n& ').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}</Link>
            <Link to="/testimonials" className="hover:text-foreground">{t('nav.testimonials')}</Link>
            <Link to="/surrogacy-faq" className="hover:text-foreground">{t('nav.faqs')}</Link>
            <Link to="/community" className="hover:text-foreground">{t('nav.community')}</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-foreground flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {t('nav.admin')}
              </Link>
            )}
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="inline-flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                {t('nav.logout')}
              </Button>
            )}
            <LanguageSwitcher />
            <Link to="/contact" className="rounded-full bg-[#1e3a5f] text-white px-4 py-1.5 hover:bg-[#152a45] transition-colors">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-3">
              <Link to="/services" onClick={closeMobileMenu} className="block py-2 hover:text-primary">
                {t('nav.divorceWills')}
              </Link>
              <Link to="/egg-freezing-surrogacy" onClick={closeMobileMenu} className="block py-2 hover:text-primary">
                {t('nav.surrogacyEggFreezing')}
              </Link>
              <Link to="/books" onClick={closeMobileMenu} className="block py-2 hover:text-primary">
                {t('nav.booksPublicSpeaking')}
              </Link>
              <Link to="/testimonials" onClick={closeMobileMenu} className="block py-2 hover:text-primary">
                {t('nav.testimonials')}
              </Link>
              <Link to="/surrogacy-faq" onClick={closeMobileMenu} className="block py-2 hover:text-primary">
                {t('nav.faqs')}
              </Link>
              <Link to="/community" onClick={closeMobileMenu} className="block py-2 hover:text-primary">
                {t('nav.community')}
              </Link>
              <Link to="/install" onClick={closeMobileMenu} className="block py-2 hover:text-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t('nav.installApp')}
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={closeMobileMenu} className="block py-2 hover:text-primary flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  {t('nav.admin')}
                </Link>
              )}
              <div className="pt-3 border-t border-border space-y-3">
                <LanguageSwitcher />
                {user && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full inline-flex items-center justify-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.logout')}
                  </Button>
                )}
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block text-center rounded-full bg-[#1e3a5f] text-white px-4 py-2 hover:bg-[#152a45] transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-8 no-print">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-semibold mb-3">
                <img src="/just-law-logo.jpg" alt="Just Law" className="h-8 w-auto" />
                <span>Just Law</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t('footer.company')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/mission" className="hover:underline">{t('footer.mission')}</Link></li>
                <li><Link to="/about" className="hover:underline">{t('footer.about')}</Link></li>
                <li><Link to="/books" className="hover:underline">{t('nav.booksPublicSpeaking')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/services" className="hover:underline">{t('nav.divorceWills')}</Link></li>
                <li><Link to="/egg-freezing-surrogacy" className="hover:underline">{t('nav.surrogacyEggFreezing')}</Link></li>
                <li><Link to="/books" className="hover:underline">{t('nav.booksPublicSpeaking')}</Link></li>
                <li><Link to="/testimonials" className="hover:underline">{t('nav.testimonials')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t('footer.connect')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/community" className="hover:underline">{t('nav.community')}</Link></li>
                <li><Link to="/contact" className="hover:underline">{t('nav.contact')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
