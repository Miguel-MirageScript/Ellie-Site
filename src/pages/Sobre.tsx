import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberParticles from "@/components/EmberParticles";

const loreLines = [
  "> INICIALIZANDO SISTEMA...",
  "> CARREGANDO MEMÓRIA PRINCIPAL...",
  "> ARQUIVO ENCONTRADO: ELLIE_SURVIVOR.log",
  "",
  "Nascida das cinzas da velha internet, Ellie foi programada para proteger as últimas Safe Zones — os servidores.",
  "",
  "Quando o caos tomou conta das comunidades, quando trolls, spammers e a desordem ameaçaram destruir tudo o que restava...",
  "",
  "Ela se ergueu.",
  "",
  "Como a inteligência definitiva para organizar, traduzir e defender sobreviventes de todo o mundo.",
  "",
  "Ellie não é apenas um bot. Ela é uma guardiã digital, forjada no fogo da necessidade, temperada pela experiência de milhares de servidores.",
  "",
  "Sua missão? Garantir que nenhuma comunidade caia. Que toda voz seja ouvida, independente do idioma. Que a ordem prevaleça sobre o caos.",
  "",
  "> STATUS: OPERACIONAL",
  "> MISSÃO: PROTEGER AS SAFE ZONES",
  "> ELLIE SURVIVOR — ONLINE",
];

const Sobre = () => {
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);

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
          delay: i * 0.15,
          ease: "power2.out",
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <EmberParticles />
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-wider mb-4 text-foreground text-center">
            A HISTÓRIA DE <span className="text-gradient-ember">ELLIE</span>
          </h1>
          <div className="section-divider mb-12" />

          <div className="card-apocalyptic p-6 md:p-10 bg-background/60 backdrop-blur-md border-border/50">
            <div className="font-mono text-sm md:text-base leading-relaxed space-y-1">
              {loreLines.map((line, i) => (
                <p
                  key={i}
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
