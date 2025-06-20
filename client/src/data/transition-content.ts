export interface TransitionContent {
  id: string;
  title: string;
  content: string;
  practiceType: "cerebral" | "conceptual" | "presence";
  duration: string;
  creditTo: string;
}

export const transitionTexts: TransitionContent[] = [
  {
    id: "transition-awakening",
    title: "Entre Mundos",
    content: `Talvez você esteja vivendo um momento de transição. Objetivos de vida, de carreira, de cidade, de negócio.

Talvez um desses exemplos seja exatamente o seu momento de transição, onde você já não é o que foi, mas também não é o que vai ser.

Nesse momento, desaprender é tão importante quanto aprender.

Três dimensões são importantes agora:

**Plasticidade do cérebro:** Fazer coisas diferentes ou de forma diferente. Fazer com que seu cérebro encontre novos modelos mentais.

**Liberdade conceitual:** O conhecimento não é apenas acumulativo, onde uma coisa vai se somando à outra, mas especulativo, quando as perguntas são mais valiosas do que as respostas. Seja curioso e pergunte. Não se preocupe em definir, mas em desenvolver.

**Interpretação do presente:** Você não é os seus pensamentos. Você é quem os ouve. Você não é o futuro e nem o passado. É o seu presente. Meditar, treinar a presença, agora é um superpoder e pode ser praticado para lidar com essas mudanças.

Essas três técnicas de transição, aliadas a uma boa estratégia - onde você foca em valores claros (o seu porquê está mudando), objetivos consistentes (o seu o quê), processos coerentes (o seu como) e planejamento fluido (o seu quando) - farão com que, além de produtiva e evolutiva, a sua transição também seja divertida.

Pense nisso.`,
    practiceType: "presence",
    duration: "3-5 minutos",
    creditTo: "Rômulo Nomad"
  }
];

export interface TransitionPractice {
  id: string;
  day: number;
  title: string;
  description: string;
  practiceType: "cerebral" | "conceptual" | "presence";
  instruction: string;
  reflection: string;
}

export const threeDayTransitionJourney: TransitionPractice[] = [
  {
    id: "day-1-plasticity",
    day: 1,
    title: "Plasticidade: Quebrar Padrões",
    description: "Fazer algo comum de uma forma totalmente nova",
    practiceType: "cerebral",
    instruction: "Hoje, escolha uma atividade que você faz no piloto automático (escovar dentes, caminhar, comer) e faça de forma completamente diferente. Use a mão não dominante, mude o trajeto, coma em silêncio absoluto.",
    reflection: "Como foi quebrar esse padrão? O que seu cérebro notou de diferente?"
  },
  {
    id: "day-2-questions",
    day: 2,
    title: "Liberdade: O Poder das Perguntas",
    description: "Quando as perguntas são mais valiosas que as respostas",
    practiceType: "conceptual",
    instruction: "Escreva três perguntas sobre sua vida atual que você não sabe responder. Não tente respondê-las. Apenas sinta o que elas provocam em você.",
    reflection: "Que liberdade existe em não precisar ter todas as respostas?"
  },
  {
    id: "day-3-presence",
    day: 3,
    title: "Presente: Você É Quem Ouve",
    description: "Treinar a presença como superpoder",
    practiceType: "presence",
    instruction: "Dedique 5 minutos para apenas observar seus pensamentos, sem julgá-los. Você não é os pensamentos - você é quem os observa.",
    reflection: "Como se sente sabendo que você não é seus pensamentos, mas quem os escuta?"
  }
];

export const transitionPhrases = [
  "Você já não é o que foi. Mas também não precisa saber o que vai ser. O agora é seu ponto de poder.",
  "Transição não é queda. É renascimento.",
  "Desaprender é tão importante quanto aprender.",
  "As perguntas são mais valiosas que as respostas.",
  "Você não é seus pensamentos. Você é quem os ouve.",
  "Meditar é treinar a presença. E presença é superpoder."
];

export const getTransitionPhraseByDay = (day: number): string => {
  const phrases = [
    "Fazer coisas diferentes faz o cérebro encontrar novos caminhos.",
    "Seja curioso e pergunte. Não se preocupe em definir, mas em desenvolver.",
    "Você não é o futuro e nem o passado. É o seu presente."
  ];
  return phrases[day - 1] || transitionPhrases[0];
};