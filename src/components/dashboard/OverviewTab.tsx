import { Users, Eye, Globe, Shield, Save, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import AllianceTimeZones from "./AllianceTimeZones";

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
  tzAmericas: number;
  tzEuropa: number;
  tzAsia: number;
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
  tzAmericas,
  tzEuropa,
  tzAsia,
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

      {/* Alliance Time Zones Chart (NOVO MÓDULO IMPORTADO) */}
      <AllianceTimeZones 
        tzAmericas={tzAmericas} 
        tzEuropa={tzEuropa} 
        tzAsia={tzAsia} 
      />

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
                          
