/**
 * FEME Coherence Engine
 * Sistema científico de análise de coerência biológica baseado em princípios de física quântica
 * aplicada ao comportamento humano.
 * 
 * Mede não apenas níveis individuais, mas as RELAÇÕES entre as 4 dimensões:
 * - Físico (F): Corpo, energia vital, saúde
 * - Energético (E): Vitalidade, disposição, fluxo
 * - Mental (M): Clareza, foco, pensamentos
 * - Espiritual (Es): Propósito, conexão, sentido
 */

export interface FEMEDimensions {
  fisico: number;      // 0-100
  energetico: number;  // 0-100
  mental: number;      // 0-100
  espiritual: number;  // 0-100
}

export interface CoherenceAnalysis {
  coherenceIndex: number;           // 0-100: índice geral de coerência
  dimensionalBalance: {
    physical_energy: number;        // Relação F-E
    energy_mental: number;          // Relação E-M
    mental_spiritual: number;       // Relação M-Es
    spiritual_physical: number;     // Relação Es-F (fechando o ciclo)
  };
  patterns: {
    type: 'balanced' | 'ascending' | 'descending' | 'chaotic' | 'polarized';
    description: string;
  };
  insights: string[];
  recommendations: string[];
  resonanceField: number;            // Campo de ressonância total (0-100)
}

/**
 * Calcula o índice de coerência entre duas dimensões
 * Quanto menor a diferença, maior a coerência
 */
function calculateDimensionalCoherence(dim1: number, dim2: number): number {
  const difference = Math.abs(dim1 - dim2);
  const coherence = 100 - difference;
  return Math.max(0, Math.min(100, coherence));
}

/**
 * Detecta padrões nas 4 dimensões
 */
function detectPattern(dims: FEMEDimensions): CoherenceAnalysis['patterns'] {
  const values = [dims.fisico, dims.energetico, dims.mental, dims.espiritual];
  const avg = values.reduce((a, b) => a + b, 0) / 4;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / 4;
  const stdDev = Math.sqrt(variance);

  // Todas muito próximas = balanced
  if (stdDev < 10) {
    return {
      type: 'balanced',
      description: 'Todas as dimensões em harmonia. Estado de coerência plena.'
    };
  }

  // Crescimento progressivo F < E < M < Es
  const isAscending = dims.fisico < dims.energetico && 
                      dims.energetico < dims.mental && 
                      dims.mental < dims.espiritual;
  
  if (isAscending) {
    return {
      type: 'ascending',
      description: 'Energia fluindo do físico para o espiritual. Processo de elevação.'
    };
  }

  // Decrescimento progressivo F > E > M > Es
  const isDescending = dims.fisico > dims.energetico && 
                       dims.energetico > dims.mental && 
                       dims.mental > dims.espiritual;
  
  if (isDescending) {
    return {
      type: 'descending',
      description: 'Energia concentrada no físico. Necessidade de integração superior.'
    };
  }

  // Polarização: algumas altas, outras baixas
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  if (maxVal - minVal > 50) {
    return {
      type: 'polarized',
      description: 'Polarização energética detectada. Dimensões desconectadas.'
    };
  }

  return {
    type: 'chaotic',
    description: 'Padrão não-linear. Momento de reorganização interna.'
  };
}

/**
 * Gera insights científicos baseados no estado das dimensões
 */
function generateInsights(dims: FEMEDimensions, pattern: CoherenceAnalysis['patterns']): string[] {
  const insights: string[] = [];

  // Análise Físico-Energético
  const feGap = dims.fisico - dims.energetico;
  if (Math.abs(feGap) > 20) {
    if (feGap > 0) {
      insights.push('Corpo forte, mas energia vital baixa. Considere práticas de respiração para ativar o fluxo energético.');
    } else {
      insights.push('Alta vitalidade, mas corpo precisando de cuidado. Movimento físico pode estabilizar a energia.');
    }
  }

  // Análise Energético-Mental
  const emGap = dims.energetico - dims.mental;
  if (Math.abs(emGap) > 20) {
    if (emGap > 0) {
      insights.push('Energia disponível, mas mente dispersa. Meditação ou foco intencional podem canalizar essa força.');
    } else {
      insights.push('Clareza mental alta, mas baixa energia. Seu corpo precisa de descanso ou nutrição energética.');
    }
  }

  // Análise Mental-Espiritual
  const mesGap = dims.mental - dims.espiritual;
  if (Math.abs(mesGap) > 20) {
    if (mesGap > 0) {
      insights.push('Mente ativa, mas desconectada do propósito. Rituais de gratidão podem trazer sentido.');
    } else {
      insights.push('Conexão espiritual forte, mas mente confusa. Tente traduzir seus insights em ações práticas.');
    }
  }

  // Análise Espiritual-Físico (fechando o ciclo)
  const esfGap = dims.espiritual - dims.fisico;
  if (Math.abs(esfGap) > 30) {
    if (esfGap > 0) {
      insights.push('Espírito elevado, mas corpo denso. Enraizamento é necessário para manifestar sua visão.');
    } else {
      insights.push('Físico forte, mas falta conexão com algo maior. Busque significado além do corpo.');
    }
  }

  // Insights baseados no padrão
  if (pattern.type === 'balanced') {
    insights.push('🌟 Estado de coerência detectado. Suas dimensões estão em harmonia funcional.');
  } else if (pattern.type === 'chaotic') {
    insights.push('⚡ Momento de transformação. A desordem aparente é reorganização profunda.');
  } else if (pattern.type === 'polarized') {
    insights.push('🎯 Polarização energética. Integre suas dimensões através de práticas que conectem corpo-mente-espírito.');
  }

  return insights;
}

/**
 * Gera recomendações práticas baseadas no estado atual
 */
function generateRecommendations(dims: FEMEDimensions, coherenceIndex: number): string[] {
  const recommendations: string[] = [];

  // Recomendações baseadas no índice de coerência
  if (coherenceIndex < 40) {
    recommendations.push('Portal da Clareza: recalibre sua percepção interna');
    recommendations.push('Respiração 4-4-6: estabilize seu sistema nervoso');
  } else if (coherenceIndex < 70) {
    recommendations.push('Ritual de Gratidão: eleve sua frequência vibracional');
    recommendations.push('Check-in FEME diário: mantenha consciência das suas dimensões');
  } else {
    recommendations.push('Portal do Recomeço: consolide e expanda sua coerência');
    recommendations.push('Sessão com Seu Guru: aprofunde seus insights');
  }

  // Recomendações específicas por dimensão mais baixa
  const lowestDim = Object.entries(dims).reduce((a, b) => a[1] < b[1] ? a : b);
  
  switch (lowestDim[0]) {
    case 'fisico':
      recommendations.push('Movimento físico: caminhe, estique-se, dance');
      break;
    case 'energetico':
      recommendations.push('Respiração consciente: ative seu fluxo vital');
      break;
    case 'mental':
      recommendations.push('Meditação guiada: acalme a mente');
      break;
    case 'espiritual':
      recommendations.push('Portal da Intuição: reconecte-se com sua essência');
      break;
  }

  return recommendations;
}

/**
 * Calcula o campo de ressonância total
 * Baseado na teoria de campos coerentes em sistemas biológicos
 */
function calculateResonanceField(dims: FEMEDimensions, coherenceIndex: number): number {
  const avgLevel = (dims.fisico + dims.energetico + dims.mental + dims.espiritual) / 4;
  // Campo de ressonância = média dos níveis × coerência
  // Se todas dimensões estão altas E coerentes, campo é forte
  const resonance = (avgLevel * coherenceIndex) / 100;
  return Math.round(resonance);
}

/**
 * ENGINE PRINCIPAL: Analisa coerência FEME
 */
export function analyzeFEMECoherence(dimensions: FEMEDimensions): CoherenceAnalysis {
  // 1. Calcula coerência entre pares de dimensões adjacentes
  const physicalEnergy = calculateDimensionalCoherence(dimensions.fisico, dimensions.energetico);
  const energyMental = calculateDimensionalCoherence(dimensions.energetico, dimensions.mental);
  const mentalSpiritual = calculateDimensionalCoherence(dimensions.mental, dimensions.espiritual);
  const spiritualPhysical = calculateDimensionalCoherence(dimensions.espiritual, dimensions.fisico);

  // 2. Índice geral de coerência (média dos 4 pares)
  const coherenceIndex = Math.round(
    (physicalEnergy + energyMental + mentalSpiritual + spiritualPhysical) / 4
  );

  // 3. Detecta padrão
  const pattern = detectPattern(dimensions);

  // 4. Gera insights
  const insights = generateInsights(dimensions, pattern);

  // 5. Gera recomendações
  const recommendations = generateRecommendations(dimensions, coherenceIndex);

  // 6. Calcula campo de ressonância
  const resonanceField = calculateResonanceField(dimensions, coherenceIndex);

  return {
    coherenceIndex,
    dimensionalBalance: {
      physical_energy: physicalEnergy,
      energy_mental: energyMental,
      mental_spiritual: mentalSpiritual,
      spiritual_physical: spiritualPhysical
    },
    patterns: pattern,
    insights,
    recommendations,
    resonanceField
  };
}

/**
 * Versão simplificada para extrair última medição FEME do checkin
 */
export function extractFEMEFromCheckin(checkin: any): FEMEDimensions {
  return {
    fisico: checkin.fisico || 50,
    energetico: checkin.energetico || 50,
    mental: checkin.mental || 50,
    espiritual: checkin.espiritual || 50
  };
}
