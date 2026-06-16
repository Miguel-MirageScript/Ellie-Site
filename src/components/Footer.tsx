import { Icon } from "@iconify/react";
import { useLang } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="relative z-20 border-t border-border/50 py-12 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Icon icon="mdi:duck" className="h-5 w-5 text-primary" />
          <span className="font-display text-sm font-bold tracking-wider text-foreground">
            DUCK SURVIVAL
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Duck Survival Bot. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
