import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { t } = useLang();

  const features = [
    {
      icon: "mdi:radio-tower",
      titleKey: "features.translate.title",
      descKey: "features.translate.desc",
    },
    {
      icon: "mdi:bullhorn-variant",
      titleKey: "features.ann.title",
      descKey: "features.ann.desc",
    },
    {
      icon: "mdi:shield-sword",
      titleKey: "features.mod.title",
      descKey: "features.mod.desc",
    },
    {
      icon: "mdi:crosshairs-gps",
      titleKey: "features.multi.title",
      descKey: "features.multi.desc",
    },
  ];

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
            {t("features.heading1")} <span className="text-gradient-ember">{t("features.heading2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("features.subtitle")}
          </p>
          <div className="section-divider mt-8 mx-auto max-w-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.titleKey}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="card-apocalyptic p-8 group hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Icon icon={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-wide mb-2 text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(feature.descKey)}
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
