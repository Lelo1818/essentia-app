import { inspirationalTexts, type InspirationalText } from "./inspirational-texts";

// Organização estratégica dos textos por seções do app
export interface ContentSection {
  id: string;
  title: string;
  description: string;
  textIds: string[];
  purpose: string;
  placement: "journey-opener" | "core-content" | "vivencias" | "phase-specific";
}

export const contentSections: ContentSection[] = [
  {
    id: "presence-and-purpose-journey",
    title: "Presença e Propósito",
    description: "Trilha introdutória sobre foco, intenção, presença no agora e construção consciente do futuro",
    textIds: [
      "economy-of-intention",
      "intelligent-posture", 
      "time-and-presence",
      "ma-japanese-void",
      "now-is-innovation",
      "hidden-assets"
    ],
    purpose: "Abertura de jornada - estabelece fundamentos de presença consciente",
    placement: "journey-opener"
  },
  
  {
    id: "core-wisdom-texts",
    title: "Textos-Núcleo",
    description: "Conteúdos centrais com autoria definida, base filosófica do aplicativo",
    textIds: [
      "letter-from-impossible-practitioner",
      "five-truths-that-anchor-us",
      "manifesto-the-time-is-now",
      "karma-dharma-transformation"
    ],
    purpose: "Pilares conceituais do app - textos que definem a identidade da plataforma",
    placement: "core-content"
  },
  
  {
    id: "vivencias-practical-wisdom",
    title: "Vivências",
    description: "Sabedoria prática conectada com desenvolvimento pessoal e espiritual sem dogmas",
    textIds: [
      "living-spirituality",
      "fall-in-love",
      "power-of-giving",
      "power-of-partnerships",
      "this-too-shall-pass"
    ],
    purpose: "Conexão entre sabedoria e vida prática - aplicação real dos conceitos",
    placement: "vivencias"
  },
  
  {
    id: "transformation-journey",
    title: "Jornada de Transformação", 
    description: "Textos específicos para momentos de mudança e crescimento pessoal",
    textIds: [
      "recovery-after-fall",
      "fall-as-portal",
      "challenging-moments",
      "preparing-for-the-leap",
      "three-doors-story"
    ],
    purpose: "Suporte durante processos de transformação - textos para momentos específicos",
    placement: "phase-specific"
  },
  
  {
    id: "authentic-self",
    title: "Ser Autêntico",
    description: "Reflexões sobre autenticidade, autoconhecimento e descoberta pessoal",
    textIds: [
      "who-are-you-really",
      "live-dont-perform", 
      "determine-your-value",
      "what-you-dont-understand",
      "confidence-and-doubt"
    ],
    purpose: "Desenvolvimento da autenticidade - ser verdadeiro consigo mesmo",
    placement: "vivencias"
  },
  
  {
    id: "inner-wisdom",
    title: "Sabedoria Interior",
    description: "Textos contemplativos para momentos de reflexão e interiorização",
    textIds: [
      "inner-forest",
      "breath-of-transformation",
      "fire-of-purpose",
      "wisdom-of-seasons",
      "sacred-pause"
    ],
    purpose: "Cultivo da sabedoria interna - conexão com a essência pessoal",
    placement: "phase-specific"
  },
  
  {
    id: "resilience-and-growth",
    title: "Resiliência e Crescimento",
    description: "Textos focados em superação, aprendizado através da dor e crescimento pessoal",
    textIds: [
      "pain-and-path-reflection",
      "courage-to-begin",
      "rhythm-and-strategy"
    ],
    purpose: "Fortalecimento da resiliência - transformar desafios em crescimento",
    placement: "vivencias"
  }
];

// Funções para organização de conteúdo
export const getTextsBySection = (sectionId: string): InspirationalText[] => {
  const section = contentSections.find(s => s.id === sectionId);
  if (!section) return [];
  
  return section.textIds
    .map(id => inspirationalTexts.find(text => text.id === id))
    .filter(text => text !== undefined) as InspirationalText[];
};

export const getJourneyOpeners = (): InspirationalText[] => {
  return contentSections
    .filter(section => section.placement === "journey-opener")
    .flatMap(section => getTextsBySection(section.id));
};

export const getCoreTexts = (): InspirationalText[] => {
  return contentSections
    .filter(section => section.placement === "core-content")
    .flatMap(section => getTextsBySection(section.id));
};

export const getVivenciasTexts = (): InspirationalText[] => {
  return contentSections
    .filter(section => section.placement === "vivencias")
    .flatMap(section => getTextsBySection(section.id));
};

export const getPhaseSpecificTexts = (): InspirationalText[] => {
  return contentSections
    .filter(section => section.placement === "phase-specific")
    .flatMap(section => getTextsBySection(section.id));
};

export const getSectionByTextId = (textId: string): ContentSection | undefined => {
  return contentSections.find(section => 
    section.textIds.includes(textId)
  );
};

// Recomendações de textos baseadas no contexto
export const getRecommendedTexts = (
  currentTextId: string, 
  userContext?: "morning" | "evening" | "reflection" | "motivation"
): InspirationalText[] => {
  const currentSection = getSectionByTextId(currentTextId);
  if (!currentSection) return [];
  
  // Textos da mesma seção (exceto o atual)
  const sectionTexts = getTextsBySection(currentSection.id)
    .filter(text => text.id !== currentTextId);
  
  // Textos por contexto de uso
  const contextTexts = inspirationalTexts.filter(text => {
    switch (userContext) {
      case "morning":
        return text.mood === "motivational" || text.mood === "empowering";
      case "evening":
        return text.mood === "reflective" || text.mood === "peaceful";
      case "reflection":
        return text.theme === "wisdom" || text.theme === "purpose";
      case "motivation":
        return text.theme === "courage" || text.mood === "motivational";
      default:
        return true;
    }
  });
  
  // Combina e limita a 4 recomendações
  const recommended = [...sectionTexts, ...contextTexts]
    .filter((text, index, arr) => arr.findIndex(t => t.id === text.id) === index)
    .slice(0, 4);
  
  return recommended;
};