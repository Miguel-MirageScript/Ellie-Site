import { Users, Eye, Globe, Shield, Save, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const timeZoneData = [
  { zone: "Américas", pct: 55, color: "hsl(30 95% 50%)" },
  { zone: "Europa", pct: 28, color: "hsl(25 100% 55%)" },
  { zone: "Ásia", pct: 17, color: "hsl(0 0% 50%)" },
];

const StatCard = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-5">
    <div className="flex items-center gap-3 mb-2 text-primary">{icon}</div>
    <p className={`font-display text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
    <p className="text-[10px] text-muted-foreground font-display tracking-widest mt-1">{label.toUpperCase()}</p>
  </div>
);

interface OverviewTabProps {
  serverName: string;
  serverIcon: string;
  memberCount: number;
  onlineCount: number;
  idiomasAtivos: number;
  ameacasBloqueadas: number;
  modTraducao: boolean;
  setModTraducao: (v: boolean) => void;
  modIntelligence: boolean;
  setModIntelligence: (v: boolean) => void;
  modComunicacao: boolean;
  setModComunicacao: (v: boolean) => void;
  modModeracao: boolean;
  setModModeracao: (v: boolean) => void;
  modAlertas: boolean;
  setModAlertas: (v: boolean) => void;
  handleSave: () => void;
  saving: boolean;
}

const OverviewTab = ({
  serverName,
  serverIcon,
  memberCount,
  onlineCount,
  idiomasAtivos,
  ameacasBloqueadas,
  modTraducao,
  setModTraducao,
  modIntelligence,
  setModIntelligence,
  modComunicacao,
  setModComunicacao,
  modModeracao,
  setModModeracao,
  modAlertas,
  setModAlertas,
  handleSave,
  saving,
}: OverviewTabProps) => {
  const modules = [
    { name: "Sistema de Tradução", checked: modTraducao, onChange: setModTraducao },
    { name: "Last Shelter Intelligence", checked: modIntelligence, onChange: setModIntelligence },
    { name: "Comunicação Global", checked: modComunicacao, onChange: setModComunicacao },
    { name: "Moderação Tática", checked: modModeracao, onChange: setModModeracao },
    { name: "Alertas de Eventos", checked: modAlertas, onChange: setModAlertas },
  ];

  return (
    <div className="space-y-6">
      {/* Server Header */}
      <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
        <div className="flex items-center gap-4">
          {serverIcon.startsWith("http") ? (
            <img src={serverIcon} alt="Server Icon" className="h-12 w-12 rounded-lg object-cover shadow-[0_0_15px_rgba(255,100,0,0.3)]" />
          ) : (
            <span className="text-4xl">{serverIcon}</span>
          )}
          <div>
            <h2 className="font-display text-lg font-bold tracking-wider text-foreground">
              {serverName}
            </h2>
            <p className="text-xs text-muted-foreground font-display tracking-wider mt-1">
              SERVIDOR GERENCIADO POR ELLIE SURVIVOR
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Membros" value={memberCount.toLocaleString("pt-BR")} accent />
        <StatCard icon={<Eye className="h-5 w-5" />} label="Online Agora" value={onlineCount.toLocaleString("pt-BR")} />
        <StatCard icon={<Globe className="h-5 w-5" />} label="Idiomas Ativos" value={idiomasAtivos.toString()} />
        <StatCard icon={<Shield className="h-5 w-5" />} label="Ameaças Bloqueadas" value={ameacasBloqueadas.toLocaleString("pt-BR")} />
      </div>

      {/* Alliance Time Zones Chart */}
      <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5">
          FUSOS HORÁRIOS DA ALIANÇA
        </h3>
        <div className="space-y-4">
          {timeZoneData.map((tz) => (
            <div key={tz.zone}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-foreground font-display tracking-wider">{tz.zone.toUpperCase()}</span>
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
        {/* Donut visual */}
        <div className="flex items-center justify-center mt-6">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 14%)" strokeWidth="3" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(30 95% 50%)" strokeWidth="3"
                strokeDasharray="55 45" strokeDashoffset="0" className="drop-shadow-[0_0_6px_hsl(30_95%_50%_/_0.6)]" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(25 100% 55%)" strokeWidth="3"
                strokeDasharray="28 72" strokeDashoffset="-55" className="drop-shadow-[0_0_6px_hsl(25_100%_55%_/_0.6)]" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 50%)" strokeWidth="3"
                strokeDasharray="17 83" strokeDashoffset="-83" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-xs text-primary font-bold">3 ZONAS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Status */}
      <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5">
          STATUS DOS MÓDULOS
        </h3>
        <div className="space-y-3">
          {modules.map((mod) => (
            <div key={mod.name} className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${mod.checked ? "bg-green-500 shadow-[0_0_8px_hsl(120_60%_50%_/_0.5)]" : "bg-muted-foreground/40"}`} />
                <span className="text-xs font-display tracking-wider text-foreground">{mod.name.toUpperCase()}</span>
              </div>
              <Switch checked={mod.checked} onCheckedChange={mod.onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={saving}
        className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 w-full sm:w-auto"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
      </Button>
    </div>
  );
};

export default OverviewTab;
          
