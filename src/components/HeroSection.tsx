import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import ellieProfile from "@/assets/ellie-profile.png";
import { useLang } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(avatarRef.current, { scale: 0.85, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.9 })
      .fromTo(badgeRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(buttonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
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

      {/* Subtle tactical grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(30 95% 50% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(30 95% 50% / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
        {/* Duck Portrait - blended with environment, lower body dissolves into smoke */}
        <div ref={avatarRef} className="relative mx-auto mb-8 w-60 md:w-72 lg:w-80">
          {/* Warm ambient glow behind */}
          <div className="absolute -inset-10 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl pointer-events-none" />

          <img
            src={ellieProfile}
            alt="Duck Survival"
            className="relative w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            style={{
              filter: "contrast(1.05) saturate(0.95)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.35) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.35) 88%, transparent 100%)",
            }}
          />

          {/* Smoke / vignette dissolving the lower body into the scenery */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[140%] h-32 bg-gradient-to-t from-background via-background/80 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 rounded-[50%] bg-black/60 blur-2xl" />
        </div>

        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md shadow-[0_0_20px_hsl(30_95%_50%_/_0.15)]">
          <Icon icon="mdi:shield-half-full" className="h-4 w-4 text-primary" />
          <span className="text-xs font-display tracking-widest text-primary uppercase">
            {t("hero.badge")}
          </span>
        </div>

        <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
          <span className="text-foreground">{t("hero.title1")}</span>
          <br />
          <span className="text-gradient-ember">{t("hero.title2")}</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("hero.subtitle.intro")} <span className="text-foreground font-semibold">{t("hero.subtitle.mod")}</span>,{" "}
          <span className="text-foreground font-semibold">{t("hero.subtitle.trans")}</span>{" "}
          {t("hero.subtitle.intro").endsWith("for") || t("hero.subtitle.intro").endsWith("para") ? "&" : "&"}{" "}
          <span className="text-foreground font-semibold">{t("hero.subtitle.ann")}</span>{" "}
          {t("hero.subtitle.outro")}
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://discord.com/oauth2/authorize?client_id=1481478930505666700&permissions=8&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 px-8 py-6 text-sm animate-pulse-glow hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
              <Icon icon="mdi:lightning-bolt" className="h-5 w-5" />
              {t("hero.cta.add")}
            </Button>
          </a>
          <a href="#recursos">
            <Button size="lg" variant="outline" className="font-display tracking-wider gap-2 px-8 py-6 text-sm border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <Icon icon="mdi:radar" className="h-4 w-4" />
              {t("hero.cta.learn")}
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <Icon icon="mdi:chevron-down" className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
