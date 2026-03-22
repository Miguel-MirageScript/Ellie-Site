import {
  Shield, AlertTriangle, Zap, MessageSquare, Users, Save, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const autoRoles = [
  { id: "member", name: "Membro" },
  { id: "recruit", name: "Recruta" },
  { id: "visitor", name: "Visitante" },
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

interface ModerationTabProps {
  blockedWords: string;
  setBlockedWords: (v: string) => void;
  antiSpam: boolean;
  setAntiSpam: (v: boolean) => void;
  antiFlood: boolean;
  setAntiFlood: (v: boolean) => void;
  antiLink: boolean;
  setAntiLink: (v: boolean) => void;
  welcomeMessage: string;
  setWelcomeMessage: (v: string) => void;
  autoRole: string;
  setAutoRole: (v: string) => void;
  saving: boolean;
  handleSave: () => void;
}

const ModerationTab = ({
  blockedWords, setBlockedWords,
  antiSpam, setAntiSpam,
  antiFlood, setAntiFlood,
  antiLink, setAntiLink,
  welcomeMessage, setWelcomeMessage,
  autoRole, setAutoRole,
  saving, handleSave,
}: ModerationTabProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-2">
      <Shield className="h-5 w-5 text-primary" />
      <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
        MODERAÇÃO <span className="text-gradient-ember">TÁTICA</span>
      </h2>
    </div>

    {/* Blocked Words */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-primary" />
        FILTRO DE PALAVRAS
      </h3>
      <div>
        <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">PALAVRAS BLOQUEADAS</Label>
        <Textarea
          value={blockedWords}
          onChange={(e) => setBlockedWords(e.target.value)}
          placeholder="Separe palavras por vírgula..."
          rows={3}
          className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm resize-none"
        />
        <p className="text-[10px] text-muted-foreground mt-1.5 font-mono">
          {blockedWords.split(",").filter(Boolean).length} PALAVRAS CONFIGURADAS
        </p>
      </div>
    </div>

    {/* Anti-Spam Toggles */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-primary" />
        PROTEÇÃO AUTOMÁTICA
      </h3>
      <div className="space-y-3">
        <ToggleRow label="Anti-Spam" desc="Detecta e remove mensagens de spam automaticamente." checked={antiSpam} onChange={setAntiSpam} />
        <ToggleRow label="Anti-Flood" desc="Limita mensagens repetidas em curto intervalo." checked={antiFlood} onChange={setAntiFlood} />
        <ToggleRow label="Anti-Link" desc="Bloqueia links externos não autorizados." checked={antiLink} onChange={setAntiLink} />
      </div>
    </div>

    {/* Welcome Message */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <MessageSquare className="h-3.5 w-3.5 text-primary" />
        MENSAGEM DE BOAS-VINDAS
      </h3>
      <Textarea
        value={welcomeMessage}
        onChange={(e) => setWelcomeMessage(e.target.value)}
        rows={3}
        className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm resize-none mb-3"
      />
      <p className="text-[10px] text-muted-foreground font-mono mb-1">
        USE {"{user}"} PARA MENCIONAR O NOVO MEMBRO
      </p>

      <div className="section-divider my-5" />

      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <Users className="h-3.5 w-3.5 text-primary" />
        CARGO AUTOMÁTICO
      </h3>
      <Select value={autoRole} onValueChange={setAutoRole}>
        <SelectTrigger className="sm:w-64 bg-muted/50 border-border/60 text-foreground backdrop-blur-sm">
          <SelectValue placeholder="Selecionar cargo" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {autoRoles.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

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

export default ModerationTab;
