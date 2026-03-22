import {
  Crosshair, Swords, AlertTriangle, Clock,
  Skull, Target, Timer, Save, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const cozDays = [
  { day: "Dia 1 — Build", points: "500K", active: true },
  { day: "Dia 2 — Research", points: "400K", active: false },
  { day: "Dia 3 — Train", points: "600K", active: true },
  { day: "Dia 4 — Kill Event", points: "1M", active: true },
];

const gameTimers = [
  { event: "Ataque Zumbi", time: "02:45:12", icon: <Skull className="h-4 w-4" /> },
  { event: "Bunker", time: "08:15:30", icon: <Target className="h-4 w-4" /> },
  { event: "Doomsday Reset", time: "1d 04:22:00", icon: <Timer className="h-4 w-4" /> },
  { event: "Próximo CoZ", time: "3d 12:00:00", icon: <Swords className="h-4 w-4" /> },
];

const ToggleRow = ({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/10 px-4 py-3">
    <div>
      <span className="font-display text-xs font-semibold tracking-wider text-foreground block">{label.toUpperCase()}</span>
      <span className="text-[11px] text-muted-foreground">{desc}</span>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

interface LssTabProps {
  cozChestReminder: boolean;
  setCozChestReminder: (v: boolean) => void;
  killEventAlert: boolean;
  setKillEventAlert: (v: boolean) => void;
  doomsdayTargets: string;
  setDoomsdayTargets: (v: string) => void;
  safeZone: string;
  setSafeZone: (v: string) => void;
  saving: boolean;
  handleSave: () => void;
}

const LssTab = ({
  cozChestReminder, setCozChestReminder,
  killEventAlert, setKillEventAlert,
  doomsdayTargets, setDoomsdayTargets,
  safeZone, setSafeZone,
  saving, handleSave,
}: LssTabProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-2">
      <Crosshair className="h-5 w-5 text-primary" />
      <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
        LAST SHELTER <span className="text-gradient-ember">INTELLIGENCE</span>
      </h2>
    </div>

    {/* CoZ Configuration */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Swords className="h-3.5 w-3.5 text-primary" />
        CLASH OF ZONES (COZ) — CONFIGURAÇÃO
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {cozDays.map((d) => (
          <div key={d.day} className={`rounded-lg border px-4 py-3 ${d.active ? "border-primary/30 bg-primary/5" : "border-border/40 bg-muted/10"}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-display tracking-wider text-foreground">{d.day.toUpperCase()}</span>
              <span className="text-xs font-mono text-primary">{d.points}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="section-divider my-5" />
      <div className="space-y-4">
        <ToggleRow label="Lembrete de Baú" desc="Envia alerta quando baús CoZ estiverem disponíveis." checked={cozChestReminder} onChange={setCozChestReminder} />
        <ToggleRow label="Alerta Kill Event" desc="Notifica membros antes do dia de Kill Event." checked={killEventAlert} onChange={setKillEventAlert} />
      </div>
    </div>

    {/* Doomsday / Eden */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-primary" />
        DOOMSDAY / EDEN — CONFIGURAÇÃO
      </h3>
      <div className="space-y-4">
        <div>
          <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">ALVOS PRIORITÁRIOS</Label>
          <Input
            value={doomsdayTargets}
            onChange={(e) => setDoomsdayTargets(e.target.value)}
            className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm"
          />
        </div>
        <div>
          <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">ZONA SEGURA</Label>
          <Input
            value={safeZone}
            onChange={(e) => setSafeZone(e.target.value)}
            className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>

    {/* Game Event Timers */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-primary" />
        TEMPORIZADORES DE EVENTOS
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {gameTimers.map((t) => (
          <div key={t.event} className="rounded-lg border border-border/40 bg-muted/10 px-4 py-4 flex items-center gap-4">
            <div className="text-primary">{t.icon}</div>
            <div className="flex-1">
              <span className="text-xs font-display tracking-wider text-foreground block">{t.event.toUpperCase()}</span>
              <span className="text-lg font-mono text-primary font-bold">{t.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Save Button */}
    <Button
      onClick={handleSave}
      disabled={saving}
      className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2"
    >
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
    </Button>
  </div>
);

export default LssTab;
