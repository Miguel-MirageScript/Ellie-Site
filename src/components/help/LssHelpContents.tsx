// 📁 Textos de Ajuda da Aba LSS Intelligence

export const CanalAnunciosHelp = () => (
  <>
    <p>
      O <strong className="text-primary">Canal de Anúncios</strong> é o local do seu Discord onde a Ellie vai reportar todas as missões automáticas.
    </p>
    <p>
      Para pegar este ID: Vá no Discord, clique com o botão direito no canal de texto que você deseja (ex: <em>#avisos-alianca</em>) e selecione <strong>"Copiar ID do Canal"</strong>. 
    </p>
    <p className="text-muted-foreground text-xs mt-2">
      * Lembre-se de dar permissão para a Ellie escrever neste canal!
    </p>
  </>
);

export const CozHelp = () => (
  <>
    <p>
      <strong className="text-primary">Dicas Automáticas do CoZ:</strong> Quando ativado, a Ellie enviará um relatório tático todos os dias no exato momento do Reset do Jogo (00:00 LSS Time). Ele inclui o evento do dia e dicas de pontuação (como a manobra das Medalhas de Sabedoria).
    </p>
    <p>
      <strong className="text-primary">Radar de Hora em Hora:</strong> Ative isso apenas quando o seu Estado já estiver com os desafios de hora sequenciais fixos. A Ellie avisará 20 minutos antes de um evento chave.
    </p>
  </>
);

export const WarBoardHelp = () => (
  <>
    <p>
      O <strong className="text-primary">Quadro de Guerra (War Board)</strong> é a sua central de ordens para o Doomsday ou Eden.
    </p>
    <p>
      Escreva aqui as diretrizes atuais, como alvos de ataque (Ex: <em>Atacar AC3 inimigo às 20:00 UTC</em>), regras de ladrilhos (Tiles) e políticas de NAP. 
    </p>
    <p>
      Sempre que o texto for alterado e salvo, a Ellie enviará as novas ordens marcando a aliança.
    </p>
  </>
);

export const AlarmesHelp = () => (
  <>
    <p>
      <strong className="text-primary">Sirene Kill Event (KE):</strong> A Ellie avisará os membros horas antes do reinício de sexta-feira, alertando todos a ativarem escudos para não virarem fazendas.
    </p>
    <p>
      <strong className="text-primary">Cerco Zumbi (Zombie Siege):</strong> Notificará a aliança para retornarem suas tropas e defenderem a base (AC) e a colmeia.
    </p>
    <p>
      <strong className="text-primary">Balrog:</strong> Digite o dia e a hora agendada. A Ellie começará a alertar a aliança 30 minutos antes do Balrog nascer.
    </p>
  </>
);

export const AcademiaHelp = () => (
  <>
    <p>
      O <strong className="text-primary">Manual de Novatos</strong> é o que a Ellie usará para educar novos membros assim que entrarem no servidor.
    </p>
    <p>
      Coloque as coordenadas da sua Base (Colmeia / Hive) para que eles saibam para onde usar o teletransporte de aliança, e liste as regras básicas e pactos de não agressão (NAP).
    </p>
  </>
);

