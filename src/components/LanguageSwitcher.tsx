import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLang, Lang } from "@/i18n/LanguageContext";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "twemoji:flag-brazil" },
  { code: "en", label: "English", flag: "twemoji:flag-united-states" },
  { code: "es", label: "Español", flag: "twemoji:flag-spain" },
  { code: "fr", label: "Français", flag: "twemoji:flag-france" },
  { code: "de", label: "Deutsch", flag: "twemoji:flag-germany" },
];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border/60 bg-background/40 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
        aria-label="Selecionar idioma"
      >
        <Icon icon={current.flag} className="h-4 w-5" />
        <span className="hidden sm:inline text-[10px] font-display tracking-widest text-muted-foreground uppercase">
          {current.code}
        </span>
        <Icon icon="mdi:chevron-down" className={`h-3 w-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[170px] rounded-md border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-colors ${
                l.code === lang
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <Icon icon={l.flag} className="h-4 w-5 flex-shrink-0" />
              <span className="font-medium tracking-wide">{l.label}</span>
              {l.code === lang && (
                <Icon icon="mdi:check" className="ml-auto h-3.5 w-3.5" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
