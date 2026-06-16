import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberParticles from "@/components/EmberParticles";
import { useLang } from "@/i18n/LanguageContext";

const Sobre = () => {
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const { t, tArray, lang } = useLang();
  const loreLines = tArray("sobre.lore");

  useEffect(() => {
    linesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: i * 0.1,
          ease: "power2.out",
        }
      );
    });
  }, [lang]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EmberParticles />
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-wider mb-4 text-foreground text-center">
            {t("sobre.title1")} <span className="text-gradient-ember">{t("sobre.title2")}</span>
          </h1>
          <div className="section-divider mb-12" />

          <div className="card-apocalyptic p-6 md:p-10 bg-background/60 backdrop-blur-md border-border/50">
            <div className="font-mono text-sm md:text-base leading-relaxed space-y-1">
              {loreLines.map((line, i) => (
                <p
                  key={`${lang}-${i}`}
                  ref={(el) => { linesRef.current[i] = el; }}
                  className={`opacity-0 ${
                    line.startsWith(">")
                      ? "text-primary font-semibold"
                      : line === ""
                      ? "h-4"
                      : "text-foreground/80"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-10 h-5 flex items-center gap-1">
              <span className="inline-block w-2.5 h-5 bg-primary animate-[flicker_1s_steps(2)_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sobre;
