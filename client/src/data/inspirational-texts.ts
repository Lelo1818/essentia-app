export interface InspirationalText {
  id: string;
  title: string;
  content: string;
  theme: "recovery" | "growth" | "purpose" | "courage" | "transformation" | "wisdom";
  mood: "reflective" | "uplifting" | "motivational" | "peaceful" | "empowering";
  phase: string[];
  audioNarration?: string;
  backgroundMusic?: string;
  estimatedReadTime: number; // in minutes
  keyQuotes: string[];
}

export const inspirationalTexts: InspirationalText[] = [
  {
    id: "recovery-after-fall",
    title: "Recovery: What Comes After the Fall",
    content: `Recovery. What comes after the fall. Nobody likes to fall, but everyone falls at some point. What differentiates those who move forward is not to avoid the fall, but to learn to get up in a different way. 

Recovery is not going back to what it was before. Recovery is not erasing what happened. Recovery is transforming what broke you into something that strengthens you. Because deep down, no one is the same again after rebuilding. That's not good news.

What does the fall teach that success cannot? That vulnerability is not weakness, but courage in its purest form. That getting up is not about strength, but about choice. The choice to believe that tomorrow can be different from today.

Recovery is an art. The art of rebuilding yourself with the same pieces, but with a different design. It's understanding that scars are not signs of failure, but proof that you fought. And that you're still here.

So when you fall - and you will fall - remember: the fall is not the end of your story. It's just the beginning of a new chapter. A chapter where you discover that your greatest strength was never not falling. It was always getting up.`,
    theme: "recovery",
    mood: "empowering",
    phase: ["transicao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_RECOVERY_SUAVE]",
    backgroundMusic: "[MÚSICA_INSTRUMENTAL_ESPERANÇA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Recovery is transforming what broke you into something that strengthens you",
      "Vulnerability is not weakness, but courage in its purest form",
      "Scars are proof that you fought. And that you're still here"
    ]
  },
  {
    id: "inner-forest",
    title: "A Floresta Interior",
    content: `Existe uma floresta dentro de você. Uma floresta antiga, onde crescem árvores que você nem sabia que plantou. Algumas nasceram de lágrimas, outras de sorrisos. Algumas de palavras não ditas, outras de silêncios profundos.

Nesta floresta interior, cada árvore tem uma história. A árvore da coragem cresceu naquele dia em que você enfrentou o medo. A árvore da compaixão brotou quando você escolheu entender ao invés de julgar. A árvore da sabedoria se fortaleceu a cada erro que se tornou aprendizado.

Há trilhas nesta floresta que só você conhece. Caminhos que levam aos seus sonhos mais profundos, às suas verdades mais íntimas. E há clareiras - espaços de paz onde você pode simplesmente ser quem você é, sem máscaras, sem pretensões.

Quando o mundo exterior parecer caótico, lembre-se: você sempre pode voltar para sua floresta interior. Lá, entre as árvores da sua própria criação, você encontrará tudo o que precisa para continuar crescendo.`,
    theme: "purpose",
    mood: "peaceful",
    phase: ["clareira", "chamado", "respiracao"],
    audioNarration: "[NARRAÇÃO_FLORESTA_CONTEMPLATIVA]",
    backgroundMusic: "[SOM_FLORESTA_VENTO_FOLHAS]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Existe uma floresta dentro de você",
      "Cada árvore tem uma história",
      "Você sempre pode voltar para sua floresta interior"
    ]
  },
  {
    id: "breath-of-transformation",
    title: "O Sopro da Transformação",
    content: `Respire. Não apenas o ar que entra e sai dos seus pulmões, mas a vida que pulsa em cada célula do seu ser. Cada respiração é uma oportunidade de renovação, uma chance de deixar ir o que não serve mais e acolher o que está por vir.

A respiração consciente é a ponte entre quem você era e quem você está se tornando. É o primeiro passo em direção à sua transformação. Porque quando você aprende a respirar com intenção, você aprende a viver com propósito.

Inspire confiança. Expire medo. Inspire amor. Expire julgamento. Inspire possibilidades. Expire limitações. Cada ciclo respiratório é um microritual de transformação.

Há uma sabedoria antiga que diz: "A vida está na respiração." Não apenas na manutenção da vida biológica, mas na criação consciente da vida que você deseja viver. Então respire profundo, respire com intenção, respire sua nova existência.`,
    theme: "transformation",
    mood: "peaceful",
    phase: ["respiracao", "rituais", "bem-estar"],
    audioNarration: "[NARRAÇÃO_RESPIRAÇÃO_GUIADA]",
    backgroundMusic: "[SOM_RESPIRAÇÃO_HARMÔNICA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Cada respiração é uma oportunidade de renovação",
      "A respiração consciente é a ponte entre quem você era e quem está se tornando",
      "Respire sua nova existência"
    ]
  },
  {
    id: "fire-of-purpose",
    title: "O Fogo do Propósito",
    content: `Dentro de você queima um fogo. Não o fogo da destruição, mas o fogo da criação. O fogo que ilumina caminhos escuros, que aquece corações frios, que transforma cru em cozido, desconhecido em familiar.

Este fogo é seu propósito. Ele sempre esteve lá, mesmo quando você não conseguia vê-lo. Talvez tenha sido reduzido a brasas pelas tempestades da vida, mas nunca se extinguiu completamente. Porque o fogo do propósito é eterno.

Alguns tentaram apagar seu fogo. Disseram que era perigoso, que era irreal, que era tempo perdido. Mas você sabe a verdade: um mundo sem o seu fogo é um mundo mais frio, mais escuro, menos vivo.

Agora é hora de reavivar as chamas. De soprar suavemente nas brasas até que se tornem labaredas novamente. De alimentar seu fogo com combustível da coragem, do amor, da determinação.

Deixe seu fogo queimar forte. Deixe-o iluminar não apenas seu caminho, mas também o caminho daqueles que caminham nas sombras. Porque quando você vive seu propósito, você não apenas se salva - você salva o mundo ao seu redor.`,
    theme: "purpose",
    mood: "empowering",
    phase: ["rituais", "portais", "chamado"],
    audioNarration: "[NARRAÇÃO_FOGO_PROPÓSITO]",
    backgroundMusic: "[SOM_FOGUEIRA_CREPITANDO]",
    estimatedReadTime: 3,
    keyQuotes: [
      "Dentro de você queima um fogo",
      "O fogo do propósito é eterno",
      "Quando você vive seu propósito, você salva o mundo ao seu redor"
    ]
  },
  {
    id: "wisdom-of-seasons",
    title: "A Sabedoria das Estações",
    content: `A natureza não tem pressa, mas tudo é realizado. As estações ensinam o que a sociedade esqueceu: que há tempo para tudo. Tempo para plantar e tempo para colher. Tempo para crescer e tempo para descansar. Tempo para soltar e tempo para segurar.

Você também tem suas estações interiores. Momentos de primavera, quando novas ideias brotam e a esperança floresce. Verões de abundância, quando você está em plena energia e criatividade. Outonos de reflexão, quando você colhe os frutos de seu crescimento. Invernos de recolhimento, quando você se prepara para o próximo ciclo.

A sabedoria está em honrar cada estação da sua jornada. Em não forçar flores no inverno nem exigir frutos na primavera. Em entender que cada fase tem seu propósito, sua beleza, suas lições.

Onde você está agora na sua jornada interior? Que estação sua alma está vivendo? Honre este momento. Abrace sua estação atual. Confie no tempo natural das coisas.

Porque assim como a natureza, você também está sempre no tempo certo.`,
    theme: "wisdom",
    mood: "reflective",
    phase: ["transicao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_ESTAÇÕES_SABEDORIA]",
    backgroundMusic: "[SOM_NATUREZA_CICLOS]",
    estimatedReadTime: 2,
    keyQuotes: [
      "A natureza não tem pressa, mas tudo é realizado",
      "Você também tem suas estações interiores",
      "Você também está sempre no tempo certo"
    ]
  },
  {
    id: "courage-to-begin",
    title: "A Coragem de Começar",
    content: `O começo é sempre o mais difícil. Não porque seja impossível, mas porque é desconhecido. O começo exige que você deixe a segurança do familiar e se aventure no território do "ainda não sei".

Mas aqui está o segredo que poucos te contam: você não precisa saber tudo antes de começar. Você não precisa ter todas as respostas, todos os recursos, toda a confiança. Você só precisa de uma coisa: a coragem de dar o primeiro passo.

A coragem não é a ausência do medo. É sentir o medo e agir mesmo assim. É olhar para o desconhecido e dizer: "Não sei o que vai acontecer, mas vou descobrir." É confiar que você tem dentro de si tudo o que precisa para lidar com o que vier.

Cada grande jornada começou com um único passo. Cada obra-prima começou com uma única pincelada. Cada transformação começou com uma única decisão. A sua também pode começar agora.

Então respire fundo. Sinta seus pés no chão. E dê o primeiro passo em direção ao que seu coração está chamando. O caminho se fará ao caminhar.`,
    theme: "courage",
    mood: "motivational",
    phase: ["clareira", "chamado", "portais"],
    audioNarration: "[NARRAÇÃO_CORAGEM_COMEÇAR]",
    backgroundMusic: "[MÚSICA_INSTRUMENTAL_INSPIRADORA]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Você só precisa da coragem de dar o primeiro passo",
      "A coragem é sentir o medo e agir mesmo assim",
      "O caminho se fará ao caminhar"
    ]
  },
  {
    id: "sacred-pause",
    title: "A Pausa Sagrada",
    content: `Entre o estímulo e a resposta, há um espaço. Nesse espaço está nosso poder de escolher nossa resposta. Em nossa resposta está nosso crescimento e nossa liberdade.

Esta é a pausa sagrada. O momento de respirar antes de reagir. O instante de sentir antes de pensar. O espaço de ser antes de fazer.

Em um mundo que glorifica a velocidade, a pausa é um ato revolucionário. É dizer: "Eu escolho responder conscientemente ao invés de reagir automaticamente." É criar espaço para a sabedoria emergir.

Na pausa sagrada, você se reconecta com sua essência. Com seus valores. Com suas intenções mais profundas. Você lembra quem você realmente é, além das pressões e expectativas externas.

Pratique a pausa sagrada. Entre cada respiração. Entre cada pensamento. Entre cada palavra. Entre cada ação. Nestes pequenos espaços de consciência, você encontrará sua liberdade.

Porque a verdadeira força não está na velocidade da reação, mas na qualidade da resposta.`,
    theme: "wisdom",
    mood: "peaceful",
    phase: ["respiracao", "bem-estar", "encerramento"],
    audioNarration: "[NARRAÇÃO_PAUSA_SAGRADA]",
    backgroundMusic: "[SOM_SILÊNCIO_CONTEMPLATIVO]",
    estimatedReadTime: 2,
    keyQuotes: [
      "Entre o estímulo e a resposta, há um espaço",
      "A pausa é um ato revolucionário",
      "A verdadeira força está na qualidade da resposta"
    ]
  }
];

export const getTextsByTheme = (theme: string): InspirationalText[] => {
  return inspirationalTexts.filter(text => text.theme === theme);
};

export const getTextsByPhase = (phase: string): InspirationalText[] => {
  return inspirationalTexts.filter(text => text.phase.includes(phase));
};

export const getTextsByMood = (mood: string): InspirationalText[] => {
  return inspirationalTexts.filter(text => text.mood === mood);
};

export const getRandomText = (): InspirationalText => {
  return inspirationalTexts[Math.floor(Math.random() * inspirationalTexts.length)];
};

export const getTextById = (id: string): InspirationalText | undefined => {
  return inspirationalTexts.find(text => text.id === id);
};