import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import ellieProfile from "@/assets/ellie-profile.jpg";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(badgeRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(buttonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Cenário pós-apocalíptico"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-display tracking-widest text-primary uppercase">
            Bot de Gerenciamento para Servidores de Jogos
          </span>
        </div>

        <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
          <span className="text-foreground">ELLIE</span>
          <br />
          <span className="text-gradient-ember">SURVIVOR</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          A solução definitiva para <span className="text-foreground font-semibold">moderação</span>,{" "}
          <span className="text-foreground font-semibold">tradução</span> e{" "}
          <span className="text-foreground font-semibold">anúncios</span> nos seus servidores de jogos.
          Last Shelter Survival, FPS, Estratégia e Sobrevivência.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 px-8 py-6 text-sm animate-pulse-glow">
              <Zap className="h-5 w-5" />
              COMEÇAR AGORA
            </Button>
          </Link>
          <a href="#recursos">
            <Button size="lg" variant="outline" className="font-display tracking-wider gap-2 px-8 py-6 text-sm border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5">
              VER RECURSOS
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
