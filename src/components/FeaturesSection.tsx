import { useEffect, useRef } from "react";
import { Languages, Megaphone, ShieldCheck, Gamepad2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Languages,
    title: "Tradução por Reação",
    description:
      "Traduza mensagens automaticamente reagindo com a bandeira do idioma desejado. Suporte para Português, Inglês, Espanhol, Russo e muito mais.",
  },
  {
    icon: Megaphone,
    title: "Anúncios Dinâmicos",
    description:
      "Crie e envie embeds de anúncios personalizados diretamente nos canais configurados. Mantenha seu servidor sempre atualizado.",
  },
  {
    icon: ShieldCheck,
    title: "Moderação Avançada",
    description:
      "Sistema completo de moderação com filtros automáticos, avisos, banimentos e logs detalhados para manter a ordem no servidor.",
  },
  {
    icon: Gamepad2,
    title: "Multi-Jogo",
    description:
      "Projetado para gerenciar servidores de Last Shelter Survival, FPS, Estratégia e Sobrevivência. Um bot para todos os seus jogos.",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id="recursos" ref={sectionRef} className="relative py-32 z-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
            RECURSOS <span className="text-gradient-ember">PODEROSOS</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Tudo que você precisa para gerenciar seus servidores de jogos em um único bot.
          </p>
          <div className="section-divider mt-8 mx-auto max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="card-apocalyptic p-8 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-wide mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
