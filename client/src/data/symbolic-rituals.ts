export interface SymbolicRitual {
  id: string;
  title: string;
  subtitle?: string;
  openingPhrase: string;
  description: string;
  instructions: string[];
  mantra?: string;
  visualDescription: string;
  audioDescription: string;
  duration: number; // in minutes
  phase: string[];
  theme: "purification" | "grounding" | "release" | "energy" | "presence" | "transformation";
  difficulty: "beginner" | "intermediate" | "advanced";
  closingPhrase?: string;
  reflectionPrompts: string[];
  buttonText: string;
  requirements?: string[];
}

export const symbolicRituals: SymbolicRitual[] = [
  {
    id: "water-intention-ritual",
    title: "Ritual da Água com Intenção",
    subtitle: "Água que limpa, água que leva, água que abençoa",
    openingPhrase: "Às vezes, tudo o que precisamos é de um gesto simples. Molhar o rosto. Sentir a água nas mãos. Lembrar que é possível recomeçar.",
    description: "Um ritual de purificação usando a água como elemento transformador, limpando o que não serve mais e abrindo espaço para o novo.",
    instructions: [
      "Escolha entre água do rosto, banho, chuveiro, ou visualização simbólica",
      "Toque a água com presença",
      "Sinta o que você quer purificar",
      "Deixe a intenção escorrer junto com ela"
    ],
    mantra: "Com essa água, limpo o que já não me serve. Abro espaço pro novo.",
    visualDescription: "Imagem de mãos recebendo água (em rio, torneira, ou chuva). Cores claras e tons de azul translúcido, remetendo à limpeza, pureza e fluidez. Microanimação de gotas escorrendo pela tela.",
    audioDescription: "Som de água escorrendo, chuva suave ou fonte de jardim",
    duration: 5,
    phase: ["clareira", "respiracao", "rituais"],
    theme: "purification",
    difficulty: "beginner",
    reflectionPrompts: [
      "Como me sinto após este ritual de limpeza?",
      "O que senti ser levado pela água?",
      "Que espaço se abriu em mim?"
    ],
    buttonText: "Fazer o Ritual com Água",
    requirements: ["Acesso à água ou capacidade de visualização"]
  },
  
  {
    id: "square-breathing-ritual",
    title: "Respiração Quadrada",
    subtitle: "A respiração é a ponte entre corpo e mente. Aqui, ela vira âncora.",
    openingPhrase: "A respiração é a ponte entre corpo e mente. Aqui, ela vira âncora.",
    description: "Técnica de respiração estruturada que traz equilíbrio e presença através do ritmo consciente.",
    instructions: [
      "Encontre um lugar tranquilo",
      "Sente-se ou deite-se com conforto",
      "Inspire por 4 segundos",
      "Segure o ar por 4 segundos",
      "Expire por 4 segundos", 
      "Fique sem ar por 4 segundos",
      "Repita por 4 ciclos ou até sentir o corpo relaxar"
    ],
    mantra: "Eu inspiro clareza, eu expiro tensão.",
    visualDescription: "Visual de um quadrado pulsando suavemente com a respiração. Traço que se move pelos quatro lados, guiando o tempo de cada fase.",
    audioDescription: "Som ambiente leve: vento calmo, sinos tibetanos espaçados, ou um pulsar suave que marca o tempo de cada etapa da respiração",
    duration: 8,
    phase: ["respiracao", "bem-estar", "transicao"],
    theme: "grounding",
    difficulty: "beginner",
    reflectionPrompts: [
      "Como me sinto agora, depois de respirar com presença?",
      "O que minha respiração me revelou sobre o momento?"
    ],
    buttonText: "Iniciar Respiração Quadrada"
  },

  {
    id: "silent-roar-ritual",
    title: "Grito Silencioso da Onça",
    subtitle: "Há forças dentro de você que nunca tiveram voz",
    openingPhrase: "Há forças dentro de você que nunca tiveram voz. Esse é o espaço pra elas rugirem em silêncio.",
    description: "Ritual de liberação energética que permite expressar a força interior de forma simbólica e poderosa.",
    instructions: [
      "Encontre um espaço seguro, onde possa soltar a tensão do corpo",
      "Feche os olhos, inspire fundo… e expire soltando som sem forma",
      "Pode ser um grito abafado. Pode ser um sussurro vibrante. Pode ser só respiração",
      "Se quiser, movimente o corpo como se uma onça dançasse em você"
    ],
    mantra: "Com esse som sem nome, liberto o que me prende. Minha força não precisa de permissão.",
    visualDescription: "Uma onça pintada em silhueta, envolta em folhas densas, com os olhos fechados e a boca semiaberta — como num rugido contido. Fundo: selva à noite com neblina roxa ou tons ocres e verdes-escuros.",
    audioDescription: "Sons graves e tribais. Tambor de batida lenta. Respiração animal no fundo. Rugido abafado. Vibrações internas.",
    duration: 10,
    phase: ["portais", "rituais", "engajamento"],
    theme: "release",
    difficulty: "intermediate",
    reflectionPrompts: [
      "Durante esse ritual, percebi que…",
      "Senti minha força quando…",
      "Que energia se moveu em mim?"
    ],
    buttonText: "Fazer o Grito Silencioso"
  },

  {
    id: "soul-shake-ritual",
    title: "Sacudir da Alma",
    subtitle: "Deixo meu corpo falar. Libero o que não serve. Volto a viver em mim.",
    openingPhrase: "Deixo meu corpo falar. Libero o que não serve. Volto a viver em mim.",
    description: "Ritual de movimento livre para liberar o que pesa e permitir que a energia volte a circular pelo corpo com leveza.",
    instructions: [
      "Fique em pé, com os pés bem apoiados no chão",
      "Feche os olhos por um instante. Respire fundo",
      "Comece a sacudir os braços, ombros, pernas. Deixe o corpo guiar",
      "Não pense, apenas sinta. Sacuda para soltar, para abrir espaço, para se reencontrar",
      "Pode sacudir com música, com silêncio, com intenção"
    ],
    mantra: "Com esse movimento, solto o peso que não é meu e deixo minha alma respirar.",
    visualDescription: "Imagem de uma pessoa em meio à natureza, com os braços em movimento e expressão de liberdade. Pó simbólico voando em volta, como se a alma estivesse se desprendendo do que não pertence mais.",
    audioDescription: "Batidas rítmicas, tambores ou sons tribais suaves",
    duration: 7,
    phase: ["rituais", "bem-estar", "engajamento"],
    theme: "energy",
    difficulty: "beginner",
    closingPhrase: "Você pode voltar sempre que precisar. O corpo sabe como te trazer de volta pra casa.",
    reflectionPrompts: [
      "O que meu corpo me disse durante o movimento?",
      "Que energia se liberou?",
      "Como me sinto após sacudir a alma?"
    ],
    buttonText: "Sacudir Agora"
  },

  {
    id: "anchor-breath-ritual",
    title: "Respiração da Âncora Presente",
    subtitle: "Volto pra mim, agora",
    openingPhrase: "Volto pra mim, agora.",
    description: "A respiração é uma âncora. Quando o mundo lá fora acelera, o agora ainda existe - e pode ser sentido no ato de inspirar e expirar com presença.",
    instructions: [
      "Encontre um lugar tranquilo. Sente-se ou fique em pé com os pés firmes no chão",
      "Sinta o contato com o solo",
      "Inspire profundamente contando até 4",
      "Segure por 2",
      "Expire lentamente contando até 6", 
      "Pausa por 2",
      "Traga atenção ao corpo. Solte os ombros, relaxe a mandíbula, depois o peito"
    ],
    mantra: "Estou aqui. Agora. E isso basta.",
    visualDescription: "Um tronco de árvore robusto, raízes visíveis mergulhando na terra. A câmera desce da copa até a base, em câmera lenta, sincronizada com a respiração.",
    audioDescription: "Pulso calmo - Batida suave, com leve som grave semelhante ao de um tambor cardíaco ou som do mar, dando a sensação de ancoragem",
    duration: 6,
    phase: ["respiracao", "bem-estar", "clareira"],
    theme: "grounding",
    difficulty: "beginner",
    reflectionPrompts: [
      "Durante essa respiração, percebi que...",
      "Ao ancorar no agora, senti..."
    ],
    buttonText: "Respirar com Presença"
  },

  {
    id: "cleansing-bath-ritual",
    title: "Banho de Limpeza",
    subtitle: "Água que limpa, renova e prepara",
    openingPhrase: "Água que limpa, renova e prepara.",
    description: "Entre em um banho com intenção. Pode ser um banho real, ou um banho imaginado com presença.",
    instructions: [
      "Entre em um banho com intenção (real ou imaginado)",
      "Ao deixar a água cair, sinta que ela leva embora o que já não precisa mais carregar",
      "Imagine os pensamentos se dissolvendo, a ansiedade escorrendo, as tensões descendo pelo ralo",
      "Não importa se é ducha ou balde, se tem ervas ou não - o que limpa é a intenção",
      "Respire fundo e diga mentalmente o mantra"
    ],
    mantra: "Água que passa, leva o que pesa. Deixo ir, e me preparo pro novo.",
    visualDescription: "Gotas d'água em câmera lenta / alguém de olhos fechados sob água suave / folhas caindo em rio calmo",
    audioDescription: "Sons de água corrente, cachoeira suave ou chuva leve no telhado",
    duration: 15,
    phase: ["rituais", "bem-estar", "transicao"],
    theme: "purification",
    difficulty: "beginner",
    closingPhrase: "Você está limpo. Renovado. Pode seguir mais leve.",
    reflectionPrompts: [
      "O que a água levou embora?",
      "Como me sinto renovado?",
      "Que intenção carrego para o novo?"
    ],
    buttonText: "Fazer meu banho simbólico"
  },

  {
    id: "fire-ritual",
    title: "Ritual do Fogo",
    subtitle: "O fogo queima o que não serve mais e aquece o que ainda vive",
    openingPhrase: "O fogo queima o que não serve mais e aquece o que ainda vive.",
    description: "Ritual de transformação usando o elemento fogo para queimar o que não serve e fortalecer o que deseja nascer.",
    instructions: [
      "Encontre um momento de silêncio",
      "Acenda uma vela ou observe uma chama real ou imaginária",
      "Respire fundo. Olhe para o fogo como quem olha para dentro",
      "Sinta o que precisa ser queimado - medos, dúvidas, velhos padrões",
      "Depois, olhe além da chama, para o que deseja fazer nascer",
      "Fique presente. O fogo é agora"
    ],
    mantra: "Olho pro fogo e lembro da minha força. Do que queima e do que nasce.",
    visualDescription: "Chama dançando suavemente no centro da tela, com animação hipnótica e cores quentes",
    audioDescription: "Sons de fogo crepitando, tambores leves ao fundo",
    duration: 12,
    phase: ["rituais", "portais", "transicao"],
    theme: "transformation",
    difficulty: "intermediate",
    closingPhrase: "Fogo cumpriu seu papel",
    reflectionPrompts: [
      "Hoje, deixo que o fogo leve...",
      "O fogo me mostrou que...",
      "O que nasce das cinzas?"
    ],
    buttonText: "Acender o Ritual",
    requirements: ["Vela ou capacidade de visualização"]
  }
];

export const getRitualsByPhase = (phase: string): SymbolicRitual[] => {
  return symbolicRituals.filter(ritual => ritual.phase.includes(phase));
};

export const getRitualsByTheme = (theme: string): SymbolicRitual[] => {
  return symbolicRituals.filter(ritual => ritual.theme === theme);
};

export const getRitualsByDifficulty = (difficulty: string): SymbolicRitual[] => {
  return symbolicRituals.filter(ritual => ritual.difficulty === difficulty);
};

export const getRandomRitual = (): SymbolicRitual => {
  return symbolicRituals[Math.floor(Math.random() * symbolicRituals.length)];
};

export const getRitualById = (id: string): SymbolicRitual | undefined => {
  return symbolicRituals.find(ritual => ritual.id === id);
};