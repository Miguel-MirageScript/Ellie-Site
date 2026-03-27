import { useState, useEffect } from "react";
import { Milestone, Save, Loader2, MessageSquareWarning, ShieldAlert, BookOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const SERVER_ID = "servidor_teste_999";

const ReceptionTab = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [recepcaoAtiva, setRecepcaoAtiva] = useState(false);
  const [canalRecepcao, setCanalRecepcao] = useState("");
  const [canalRegras, setCanalRegras] = useState("");
  const [tutorialTela1, setTutorialTela1] = useState("");
  const [tutorialTela2, setTutorialTela2] = useState("");

  // Busca os dados independentemente quando a aba é aberta
  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase.from("configuracoes_servidor").select("*").eq("id_servidor", SERVER_ID).maybeSingle();
      if (data && !error) {
        setRecepcaoAtiva(data.recepcao_ativa || false);
        setCanalRecepcao(data.canal_recepcao || "");
        setCanalRegras(data.canal_regras || "");
        setTutorialTela1(data.tutorial_tela1 || "");
        setTutorialTela2(data.tutorial_tela2 || "");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("configuracoes_servidor").update({
        recepcao_ativa: recepcaoAtiva,
        canal_recepcao: canalRecepcao,
        canal_regras: canalRegras,
        tutorial_tela1: tutorialTela1,
        tutorial_tela2: tutorialTela2,
      }).eq("id_servidor", SERVER_ID);

      if (error) throw error;
      toast({ title: "✅ Sistema de Integração Atualizado!" });
    } catch (err) {
      toast({ title: "❌ Erro ao salvar", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSetupDiscord = async () => {
    if (!canalRecepcao) {
      toast({ title: "❌ ID do Canal vazio", description: "Preencha o ID do Canal de Recepção antes de instalar.", variant: "destructive" });
      return;
    }
    try {
      await supabase.from("configuracoes_servidor").update({ trigger_setup_recepcao: true }).eq("id_servidor", SERVER_ID);
      toast({ title: "🚀 COMANDO ENVIADO!", description: "A Ellie vai montar a Guarita de Recepção no Discord em instantes." });
    } catch (err) {
      toast({ title: "Erro ao enviar comando", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex items-center justify-center p-10"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Milestone className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-bold tracking-wider text-foreground">
          INTEGRAÇÃO <span className="text-gradient-ember">& RECEPÇÃO</span>
        </h2>
      </div>

      <div className="text-[11px] text-muted-foreground bg-primary/5 border border-primary/20 rounded p-3 mb-4">
        <strong className="text-primary font-display tracking-widest block mb-1">BRIEFING TÁTICO:</strong>
        Este sistema criará um canal blindado onde novatos e veteranos serão filtrados. A Ellie dará o tutorial interativo para os novatos antes de liberar o acesso à Base.
      </div>

      {/* CHAVE GERAL E CANAIS */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6 border-l-4 border-l-primary/50">
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-primary" />
          CONTROLE DA GUARITA
        </h3>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/10 px-4 py-3">
            <div>
              <span className="font-display text-xs font-semibold tracking-wider text-foreground block">SISTEMA DE RECEPÇÃO INTERATIVA</span>
              <span className="text-[11px] text-muted-foreground block mt-1">Liga ou desliga o tutorial para novos membros.</span>
            </div>
            <Switch checked={recepcaoAtiva} onCheckedChange={setRecepcaoAtiva} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[10px] text-primary/80 font-display tracking-widest mb-1.5 flex items-center gap-1.5 uppercase">
                <MessageSquareWarning className="h-3 w-3" /> ID Canal de Recepção (Obrigatório)
              </Label>
              <Input placeholder="Ex: 123456789" value={canalRecepcao} onChange={(e) => setCanalRecepcao(e.target.value)} className="bg-background/40 border-border/40 text-xs h-8" />
            </div>
            <div>
              <Label className="text-[10px] text-primary/80 font-display tracking-widest mb-1.5 flex items-center gap-1.5 uppercase">
                <BookOpen className="h-3 w-3" /> ID Canal de Regras (Mencionado na Tela 2)
              </Label>
              <Input placeholder="Ex: 987654321" value={canalRegras} onChange={(e) => setCanalRegras(e.target.value)} className="bg-background/40 border-border/40 text-xs h-8" />
            </div>
          </div>

          <Button onClick={handleSetupDiscord} variant="outline" className="w-full font-display tracking-widest gap-2 border-primary/50 text-primary hover:bg-primary/10">
            <Send className="h-4 w-4" /> MONTAR MENSAGEM FIXA DE RECEPÇÃO NO DISCORD
          </Button>
        </div>
      </div>

      {/* TEXTOS DO TUTORIAL */}
      <div className="card-apocalyptic relative bg-background/60 backdrop-blur-md p-6">
        <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          ROTEIRO DO TUTORIAL (NOVATOS)
        </h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block text-primary">TELA 1: POR QUE USAMOS O DISCORD?</Label>
            <p className="text-[10px] text-muted-foreground mb-2">A Ellie já saudará o recruta pelo nome. Descreva abaixo por que a aliança exige o Discord.</p>
            <textarea 
              value={tutorialTela1} 
              onChange={(e) => setTutorialTela1(e.target.value)} 
              placeholder="Ex: O chat do jogo é fraco e apaga coordenadas. Usamos o Discord para nos organizar militarmente..." 
              className="flex min-h-[100px] w-full rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground focus-visible:ring-primary/50" 
            />
          </div>

          <div>
            <Label className="text-xs text-foreground font-display tracking-wider mb-2 block text-primary">TELA 2: SOBREVIVÊNCIA E NAP</Label>
            <p className="text-[10px] text-muted-foreground mb-2">Instrua o novato sobre as regras de não-agressão do seu estado.</p>
            <textarea 
              value={tutorialTela2} 
              onChange={(e) => setTutorialTela2(e.target.value)} 
              placeholder="Ex: Respeite o NAP. Não ataque alianças aliadas! Leia o Quadro de Guerra antes de agir..." 
              className="flex min-h-[100px] w-full rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm text-foreground focus-visible:ring-primary/50" 
            />
          </div>

          <div className="text-[11px] text-muted-foreground/60 border-t border-border/20 pt-4 mt-2">
            * Nota: A Tela 3 (Sobre a Ellie/Tradução) e a Tela 4 (Acesso à Academia LSS) são geradas automaticamente pelo sistema, pois descrevem as funções vitais da inteligência artificial.
          </div>
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="glow-button bg-primary text-primary-foreground font-display tracking-wider gap-2 w-full sm:w-auto">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? "SALVANDO MÓDULO..." : "SALVAR ROTEIRO"}
      </Button>
    </div>
  );
};

export default ReceptionTab;
        
