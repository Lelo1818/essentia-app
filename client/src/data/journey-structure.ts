export interface JourneyPhase {
  id: string;
  title: string;
  description: string;
  symbolText: string;
  htmlFile: string;
  phase: number;
  subPhase?: number;
  category: "entrada" | "chamado" | "travessia" | "desprendimento" | "reconexao" | "expressao" | "comunhao" | "retorno";
}

export const journeyStructure: JourneyPhase[] = [
  // Pacote 01 - Entrada
  {
    id: "entrada-inicial",
    title: "Entrada da Jornada", 
    description: "Tela de abertura com áudio e chamada simbólica",
    symbolText: "Transição não é queda. É renascimento. Você chegou. Respire. Aqui começa a travessia - não rumo ao que falta, mas ao que já pulsa em você. Feche os olhos, ouça. A presença é o primeiro passo.",
    htmlFile: "index.html",
    phase: 0,
    category: "entrada"
  },
  {
    id: "primeiro-passo",
    title: "Primeiro Passo",
    description: "Primeiro passo, leve e introdutório", 
    symbolText: "Cada jornada começa com um único passo. Este é o seu.",
    htmlFile: "tela2.html",
    phase: 0,
    subPhase: 5,
    category: "entrada"
  },

  // Pacote 02 - Fase 1: Chamado Interior
  {
    id: "portal-silencio",
    title: "Portal do Silêncio",
    description: "Portal de entrada para a escuta interior",
    symbolText: "O mundo te ensinou a responder rápido, agir, correr. Mas o despertar não grita - ele sussurra. Aproxime-se do Portal do Silêncio. Ali mora sua escuta. Permaneça. Só o silêncio revela o que é verdadeiro.",
    htmlFile: "tela3_portal.html", 
    phase: 1,
    subPhase: 1,
    category: "chamado"
  },
  {
    id: "espelho-eu",
    title: "Espelho do Eu",
    description: "Momento de auto-reconhecimento",
    symbolText: "Não há propósito sem espelho. Olhar para si não é vaidade - é coragem. Veja sua luz. Mas não negue sua sombra. Toda jornada começa com o reconhecimento.",
    htmlFile: "tela4_espelho.html",
    phase: 1,
    subPhase: 2, 
    category: "chamado"
  },
  {
    id: "chamado-interior",
    title: "Chamado Interior",
    description: "Reconhecimento do chamado interno",
    symbolText: "Você sentiu. Não sabe explicar, mas pulsa aí dentro. O chamado não vem de fora. Ele não depende de likes, cargos ou diplomas. O chamado é aquele incômodo sagrado - o convite pra viver com verdade.",
    htmlFile: "tela5_chamado.html",
    phase: 1,
    subPhase: 3,
    category: "chamado"
  },
  {
    id: "ritual-transicao", 
    title: "Ritual de Transição",
    description: "Ritual simbólico de passagem",
    symbolText: "Todo ritual é uma ponte. Entre quem você era e quem está se tornando.",
    htmlFile: "tela6_ritual.html",
    phase: 1,
    subPhase: 4,
    category: "travessia"
  },
  {
    id: "primeiro-movimento",
    title: "O Primeiro Movimento", 
    description: "Primeiro movimento consciente na jornada",
    symbolText: "Movimento não é apenas físico. É a coragem de se mover internamente em direção ao seu verdadeiro eu.",
    htmlFile: "tela7_movimento.html",
    phase: 1,
    subPhase: 5,
    category: "travessia"
  },

  // Pacote 03 - Fase 2/2.5: Desprendimento e Reconexão
  {
    id: "abrigo-interior",
    title: "Abrigo Interior",
    description: "Espaço seguro interno de refugio",
    symbolText: "A vida às vezes desmorona do lado de fora para que você reencontre o centro por dentro. Este é seu abrigo. Não há Wi-Fi, não há pressa. Só um espaço seguro onde você pode apenas ser.",
    htmlFile: "tela8_abrigo_interior.html",
    phase: 2,
    subPhase: 1,
    category: "desprendimento"
  },
  {
    id: "chama-sutil",
    title: "A Chama Sutil",
    description: "Reconexão com a chama interior",
    symbolText: "Mesmo nos dias mais escuros, há uma chama que nunca se apaga dentro de você. Pequena, sutil, mas eterna.",
    htmlFile: "tela9_chama_sutil.html", 
    phase: 2,
    subPhase: 2,
    category: "reconexao"
  },
  {
    id: "espirito-terra",
    title: "Espírito da Terra",
    description: "Reconexão com a natureza e origem",
    symbolText: "Você é natureza em forma de gente. Tudo o que pulsa em você já foi floresta, fogo, tempestade. Voltar-se à Terra é lembrar-se da sua origem - e da sua potência silenciosa.",
    htmlFile: "tela10_espirito_terra.html",
    phase: 2,
    subPhase: 3, 
    category: "reconexao"
  },
  {
    id: "ritual-agua",
    title: "Ritual da Água",
    description: "Ritual de purificação e renovação",
    symbolText: "Água que limpa, água que leva, água que abençoa. Deixe a água levar o que não serve mais.",
    htmlFile: "tela11_ritual_agua.html",
    phase: 2,
    subPhase: 4,
    category: "desprendimento"
  },
  {
    id: "sopro-ancestral",
    title: "Sopro Ancestral", 
    description: "Conexão com a sabedoria ancestral",
    symbolText: "A respiração carrega a sabedoria de todos que vieram antes. Inspire. Você não está sozinho.",
    htmlFile: "tela12_sopro_ancestral.html",
    phase: 2,
    subPhase: 5,
    category: "reconexao"
  },

  // Pacote 04 - Expressão
  {
    id: "bem-estar",
    title: "Painel de Bem-Estar",
    description: "Acompanhamento holístico do bem-estar",
    symbolText: "Você não é uma máquina. E mesmo que fosse, até as máquinas precisam de pausa. Como está seu corpo? Sua mente? Sua alma? Este painel não te julga. Ele te acolhe.",
    htmlFile: "tela13_bem_estar.html",
    phase: 3,
    subPhase: 0,
    category: "expressao"
  },
  {
    id: "avatar-jornada",
    title: "Avatar em Jornada",
    description: "Representação simbólica da evolução pessoal",
    symbolText: "Cada gesto interno se reflete no mundo. Este avatar é a dança do seu despertar. A cada texto escrito, passo dado, emoção reconhecida - ele se move, respira, sente. Como você.",
    htmlFile: "tela14_avatar_jornada.html", 
    phase: 3,
    subPhase: 1,
    category: "expressao"
  },
  {
    id: "diario-vivo",
    title: "Diário Vivo",
    description: "Espaço de registro e reflexão pessoal",
    symbolText: "Suas palavras têm poder. Este diário não é apenas registro - é transformação em movimento.",
    htmlFile: "tela15_diario_vivo.html",
    phase: 3,
    subPhase: 2,
    category: "expressao"
  },

  // Pacote 05 - Comunhão
  {
    id: "comunidade",
    title: "Círculo de Propósito",
    description: "Comunidade de pessoas em jornada similar",
    symbolText: "Sozinho, você desperta. Mas junto... você floresce. Esse é o Círculo do Propósito. Ninguém é guru. Ninguém é discípulo. Apenas seres humanos, inteiros, partilhando sua busca com verdade.",
    htmlFile: "tela16_comunidade.html",
    phase: 4,
    subPhase: 0,
    category: "comunhao"
  },
  {
    id: "encontros",
    title: "Encontros que Transformam",
    description: "Encontros guiados com propósito",
    symbolText: "Alguns encontros mudam tudo. Este é um espaço para conexões que importam.",
    htmlFile: "tela17_encontros.html",
    phase: 4,
    subPhase: 1,
    category: "comunhao"
  },
  {
    id: "partilha",
    title: "Partilha Autêntica",
    description: "Espaço seguro para partilha genuína",
    symbolText: "Vulnerabilidade é força. Aqui você pode ser verdadeiro.",
    htmlFile: "tela18_partilha.html",
    phase: 4,
    subPhase: 2,
    category: "comunhao"
  }
];

export const getPhasesByCategory = (category: string): JourneyPhase[] => {
  return journeyStructure.filter(phase => phase.category === category);
};

export const getPhaseByPhaseNumber = (phaseNum: number, subPhase?: number): JourneyPhase[] => {
  return journeyStructure.filter(phase => 
    phase.phase === phaseNum && (subPhase === undefined || phase.subPhase === subPhase)
  );
};

export const getPhaseById = (id: string): JourneyPhase | undefined => {
  return journeyStructure.find(phase => phase.id === id);
};

export const getNextPhase = (currentId: string): JourneyPhase | undefined => {
  const currentIndex = journeyStructure.findIndex(phase => phase.id === currentId);
  return currentIndex >= 0 && currentIndex < journeyStructure.length - 1 
    ? journeyStructure[currentIndex + 1] 
    : undefined;
};

export const getPreviousPhase = (currentId: string): JourneyPhase | undefined => {
  const currentIndex = journeyStructure.findIndex(phase => phase.id === currentId);
  return currentIndex > 0 ? journeyStructure[currentIndex - 1] : undefined;
};