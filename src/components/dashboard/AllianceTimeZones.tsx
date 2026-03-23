import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface AllianceTimeZonesProps {
  tzAmericas: number;
  tzEuropa: number;
  tzAsia: number;
}

const AllianceTimeZones = ({ tzAmericas, tzEuropa, tzAsia }: AllianceTimeZonesProps) => {
  // Motor do Relógio
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Atualiza o relógio a cada 1 segundo (1000ms)
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formata a hora para a zona desejada
  const getTime = (timeZone: string) => {
    return new Intl.DateTimeFormat('pt-BR', { timeZone, hour: '2-digit', minute: '2-digit' }).format(time);
  };

  // Cálculos matemáticos para desenhar o gráfico SVG
  const circ = 88;
  const amDash = (tzAmericas / 100) * circ;
  const euDash = (tzEuropa / 100) * circ;
  const asDash = (tzAsia / 100) * circ;

  const timeZones = [
    { zone: "Américas", tz: "America/Sao_Paulo", pct: tzAmericas, color: "hsl(30 95% 50%)" },
    { zone: "Europa", tz: "Europe/Paris", pct: tzEuropa, color: "hsl(25 100% 55%)" },
    { zone: "Ásia", tz: "Asia/Tokyo", pct: tzAsia, color: "hsl(0 0% 50%)" },
  ];

  return (
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-xs tracking-widest text-muted-foreground">
          FUSOS HORÁRIOS DA ALIANÇA
        </h3>
        {/* Relógio Global UTC */}
        <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded border border-border/50">
          <Clock className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-mono text-foreground font-bold tracking-wider">
            UTC {getTime('UTC')}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {timeZones.map((tz) => (
          <div key={tz.zone}>
            <div className="flex justify-between text-xs mb-1.5 items-end">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-display tracking-wider">{tz.zone.toUpperCase()}</span>
                {/* Relógio Local de cada Região */}
                <span className="text-[10px] font-mono text-muted-foreground bg-background/50 px-1.5 rounded border border-border/30">
                  {getTime(tz.tz)}
                </span>
              </div>
              <span className="text-primary font-mono">{tz.pct}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${tz.pct}%`,
                  background: `linear-gradient(90deg, ${tz.color}, ${tz.color}88)`,
                  boxShadow: `0 0 12px ${tz.color}66`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Gráfico Donut Dinâmico */}
      <div className="flex items-center justify-center mt-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 14%)" strokeWidth="3" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(30 95% 50%)" strokeWidth="3"
              strokeDasharray={`${amDash} ${circ}`} strokeDashoffset="0" className="drop-shadow-[0_0_6px_hsl(30_95%_50%_/_0.6)] transition-all duration-1000" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(25 100% 55%)" strokeWidth="3"
              strokeDasharray={`${euDash} ${circ}`} strokeDashoffset={-amDash} className="drop-shadow-[0_0_6px_hsl(25_100%_55%_/_0.6)] transition-all duration-1000" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 50%)" strokeWidth="3"
              strokeDasharray={`${asDash} ${circ}`} strokeDashoffset={-(amDash + euDash)} className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xs text-primary font-bold">3 ZONAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceTimeZones;
        
