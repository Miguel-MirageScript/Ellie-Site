import {
  Globe, Flag, Megaphone, Hash, Send, Save, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const channels = [
  { id: "general", name: "#geral" },
  { id: "announcements", name: "#anúncios" },
  { id: "alliance", name: "#aliança" },
  { id: "war-room", name: "#sala-de-guerra" },
];

interface ReactionFlag {
  emoji: string;
  lang: string;
  active: boolean;
}

interface CommunicationTabProps {
  reactionTranslations: ReactionFlag[];
  toggleReactionFlag: (emoji: string) => void;
  announcementText: string;
  setAnnouncementText: (v: string) => void;
  announcementChannel: string;
  setAnnouncementChannel: (v: string) => void;
  saving: boolean;
  handleSave: () => void;
}

const CommunicationTab = ({
  reactionTranslations, toggleReactionFlag,
  announcementText, setAnnouncementText,
  announcementChannel, setAnnouncementChannel,
  saving, handleSave,
}: CommunicationTabProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-2">
      <Globe className="h-5 w-5 text-primary" />
      <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
        COMUNICAÇÃO <span className="text-gradient-ember">GLOBAL</span>
      </h2>
    </div>

    {/* Reaction Translation */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
        <Flag className="h-3.5 w-3.5 text-primary" />
        TRADUÇÃO POR REAÇÃO
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        A tradução <strong className="text-foreground">NÃO</strong> é automática. Ela é ativada quando alguém reage a uma mensagem com o emoji de bandeira correspondente.
      </p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {reactionTranslations.map((flag) => (
          <button
            key={flag.emoji}
            onClick={() => toggleReactionFlag(flag.emoji)}
            className={`rounded-lg border px-4 py-3 text-center transition-all duration-200 ${
              flag.active
                ? "border-primary/40 bg-primary/10 shadow-[0_0_15px_hsl(30_95%_50%_/_0.15)]"
                : "border-border/40 bg-muted/10 opacity-50 hover:opacity-75"
            }`}
          >
            <span className="text-2xl block mb-1">{flag.emoji}</span>
            <span className="text-[10px] font-display tracking-wider text-foreground">{flag.lang.toUpperCase()}</span>
            <span className={`block text-[9px] font-mono mt-1 ${flag.active ? "text-green-500" : "text-muted-foreground"}`}>
              {flag.active ? "ATIVO" : "INATIVO"}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Official Announcements */}
    <div className="card-apocalyptic bg-background/60 backdrop-blur-md p-6">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Megaphone className="h-3.5 w-3.5 text-primary" />
        ANÚNCIOS OFICIAIS
      </h3>
      <div className="space-y-4">
        <div>
          <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">MENSAGEM</Label>
          <Textarea
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder="Escreva o anúncio para a aliança..."
            rows={4}
            className="bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/50 backdrop-blur-sm resize-none"
          />
        </div>
        <div>
          <Label className="text-xs text-foreground font-display tracking-wider mb-2 block">CANAL DE DESTINO</Label>
          <Select value={announcementChannel} onValueChange={setAnnouncementChannel}>
            <SelectTrigger className="sm:w-64 bg-muted/50 border-border/60 text-foreground backdrop-blur-sm">
              <SelectValue placeholder="Selecionar canal" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {channels.map((ch) => (
                <SelectItem key={ch.id} value={ch.id}>
                  <span className="flex items-center gap-2">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    {ch.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={!announcementText || !announcementChannel}
          className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2"
        >
          <Send className="h-4 w-4" />
          ENVIAR ANÚNCIO
        </Button>
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

export default CommunicationTab;
