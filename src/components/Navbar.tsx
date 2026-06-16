import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/i18n/LanguageContext";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [session, setSession] = useState<any>(null);
  const { t } = useLang();

  // Sistema de Radar: Verifica continuamente se o Comandante está logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDiscordLogin = async () => {
    if (!session) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) console.error("Erro ao conectar:", error.message);
    }
  };

  const linkClass = (path: string) =>
    `hidden md:inline-block text-sm transition-colors ${
      location.pathname === path
        ? "text-primary font-medium"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Icon icon="mdi:duck" className="h-8 w-8 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(30,95%,50%,0.6)]" />
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-lg font-bold tracking-wider text-foreground">
            DUCK <span className="text-gradient-ember">SURVIVAL</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          {!isDashboard && (
            <>
              <Link to="/" className={linkClass("/")}>{t("nav.home")}</Link>
              <Link to="/sobre" className={linkClass("/sobre")}>{t("nav.history")}</Link>
              <Link to="/comandos" className={linkClass("/comandos")}>{t("nav.commands")}</Link>
            </>
          )}

          <LanguageSwitcher />

          {/* O Botão Inteligente: Muda dependendo se está logado ou não */}
          {!isDashboard && (
            session ? (
              <Link to="/dashboard">
                <Button className="glow-button bg-primary text-primary-foreground font-display text-xs tracking-wider gap-2">
                  <Icon icon="mdi:radar" className="h-4 w-4" />
                  {t("nav.mypanel")}
                </Button>
              </Link>
            ) : (
              <Button onClick={handleDiscordLogin} className="glow-button bg-primary text-primary-foreground font-display text-xs tracking-wider gap-2">
                <Icon icon="mdi:login-variant" className="h-4 w-4" />
                <span className="hidden sm:inline">{t("nav.panel")}</span>
              </Button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
