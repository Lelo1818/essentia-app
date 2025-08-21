import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Zap, 
  Target, 
  Star, 
  ArrowRight, 
  CheckCircle,
  User,
  Sparkles
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  interests: string[];
  lifeGoals: string[];
  currentChallenges: string[];
  triadScores: {
    consciencia: number;
    energia: number;
    coerencia: number;
  };
  personalityType: 'reflexivo' | 'ativo' | 'equilibrado';
  preferredPortal: 'proposito' | 'vitalidade' | 'harmonia';
  motivation: string;
  streak: number;
  totalRitualsCompleted: number;
  lastPortalId?: string;
  lastCompletedAt?: Date;
}

interface SmartOnboardingProps {
  onComplete: (userProfile: UserProfile) => void;
}

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: string[];
  category: 'basic' | 'consciousness' | 'energy' | 'coherence' | 'goals';
}

const questions: Question[] = [
  // Básicas
  {
    id: 'name',
    question: 'Como você gostaria de ser chamado(a)?',
    type: 'text',
    category: 'basic'
  },
  {
    id: 'age',
    question: 'Qual sua faixa etária?',
    type: 'single',
    options: ['18-25', '26-35', '36-45', '46-55', '55+'],
    category: 'basic'
  },
  
  // Consciência
  {
    id: 'self_awareness',
    question: 'O quanto você se conhece profundamente?',
    type: 'scale',
    category: 'consciousness'
  },
  {
    id: 'life_purpose',
    question: 'Você tem clareza sobre seu propósito de vida?',
    type: 'scale',
    category: 'consciousness'
  },
  {
    id: 'reflection_habit',
    question: 'Com que frequência você reflete sobre suas experiências?',
    type: 'single',
    options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente', 'Nunca'],
    category: 'consciousness'
  },
  
  // Energia
  {
    id: 'energy_level',
    question: 'Como está seu nível de energia atualmente?',
    type: 'scale',
    category: 'energy'
  },
  {
    id: 'motivation',
    question: 'O que mais te motiva na vida?',
    type: 'multiple',
    options: ['Crescimento pessoal', 'Relacionamentos', 'Carreira', 'Saúde', 'Criatividade', 'Espiritualidade'],
    category: 'energy'
  },
  {
    id: 'vitality_practices',
    question: 'Quais práticas te dão mais energia?',
    type: 'multiple',
    options: ['Exercícios físicos', 'Meditação', 'Natureza', 'Música', 'Leitura', 'Conexão social'],
    category: 'energy'
  },
  
  // Coerência
  {
    id: 'emotional_balance',
    question: 'Como você avalia seu equilíbrio emocional?',
    type: 'scale',
    category: 'coherence'
  },
  {
    id: 'values_alignment',
    question: 'Suas ações estão alinhadas com seus valores?',
    type: 'scale',
    category: 'coherence'
  },
  {
    id: 'current_challenges',
    question: 'Quais são seus principais desafios atuais?',
    type: 'multiple',
    options: ['Ansiedade/Estresse', 'Falta de direção', 'Baixa energia', 'Relacionamentos', 'Autoestima', 'Equilíbrio vida-trabalho'],
    category: 'coherence'
  },
  
  // Objetivos
  {
    id: 'growth_priority',
    question: 'Qual área você mais quer desenvolver?',
    type: 'single',
    options: ['Autoconhecimento', 'Energia e vitalidade', 'Equilíbrio emocional', 'Propósito de vida'],
    category: 'goals'
  }
];

export const SmartOnboarding = ({ onComplete }: SmartOnboardingProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [userName, setUserName] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Som de botão
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Fallback silencioso se Web Audio não estiver disponível
    }
  };

  const handleAnswer = (answer: any) => {
    playClickSound();
    
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion.id === 'name') {
      setUserName(answer);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Processar respostas e criar perfil
      const profile = processAnswersToProfile(newAnswers);
      onComplete(profile);
    }
  };

  const processAnswersToProfile = (answers: Record<string, any>): UserProfile => {
    // Calcular scores da tríade baseado nas respostas
    const conscienciaScore = calculateConsciousnessScore(answers);
    const energiaScore = calculateEnergyScore(answers);
    const coerenciaScore = calculateCoherenceScore(answers);
    
    // Determinar tipo de personalidade
    const personalityType = determinePersonalityType(answers);
    
    // Recomendar portal inicial
    const preferredPortal = recommendInitialPortal(conscienciaScore, energiaScore, coerenciaScore, answers);
    
    return {
      id: `user_${Date.now()}`,
      name: answers.name || 'Usuário',
      age: convertAgeRange(answers.age),
      interests: answers.motivation || [],
      lifeGoals: [answers.growth_priority],
      currentChallenges: answers.current_challenges || [],
      triadScores: {
        consciencia: conscienciaScore,
        energia: energiaScore,
        coerencia: coerenciaScore
      },
      personalityType,
      preferredPortal,
      motivation: Array.isArray(answers.motivation) ? answers.motivation.join(', ') : answers.motivation || 'Crescimento pessoal',
      streak: 0,
      totalRitualsCompleted: 0
    };
  };

  const calculateConsciousnessScore = (answers: Record<string, any>): number => {
    let score = 50; // Base
    
    if (answers.self_awareness) score += (answers.self_awareness - 5) * 10;
    if (answers.life_purpose) score += (answers.life_purpose - 5) * 10;
    if (answers.reflection_habit === 'Diariamente') score += 20;
    else if (answers.reflection_habit === 'Semanalmente') score += 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateEnergyScore = (answers: Record<string, any>): number => {
    let score = 50; // Base
    
    if (answers.energy_level) score += (answers.energy_level - 5) * 10;
    if (answers.motivation && answers.motivation.length > 3) score += 15;
    if (answers.vitality_practices && answers.vitality_practices.length > 2) score += 15;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateCoherenceScore = (answers: Record<string, any>): number => {
    let score = 50; // Base
    
    if (answers.emotional_balance) score += (answers.emotional_balance - 5) * 10;
    if (answers.values_alignment) score += (answers.values_alignment - 5) * 10;
    if (answers.current_challenges && answers.current_challenges.length < 3) score += 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const determinePersonalityType = (answers: Record<string, any>): 'reflexivo' | 'ativo' | 'equilibrado' => {
    if (answers.reflection_habit === 'Diariamente' && answers.growth_priority === 'Autoconhecimento') {
      return 'reflexivo';
    }
    if (answers.vitality_practices?.includes('Exercícios físicos') && answers.growth_priority === 'Energia e vitalidade') {
      return 'ativo';
    }
    return 'equilibrado';
  };

  const recommendInitialPortal = (consciencia: number, energia: number, coerencia: number, answers: Record<string, any>): 'proposito' | 'vitalidade' | 'harmonia' => {
    const scores = [
      { portal: 'proposito' as const, score: consciencia },
      { portal: 'vitalidade' as const, score: energia },
      { portal: 'harmonia' as const, score: coerencia }
    ];
    
    // Recomendar o portal com menor score (precisa mais atenção)
    scores.sort((a, b) => a.score - b.score);
    return scores[0].portal;
  };

  const convertAgeRange = (range: string): number => {
    const ageMap: Record<string, number> = {
      '18-25': 22,
      '26-35': 30,
      '36-45': 40,
      '46-55': 50,
      '55+': 60
    };
    return ageMap[range] || 30;
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Digite sua resposta..."
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleAnswer(e.currentTarget.value.trim());
                }
              }}
              autoFocus
            />
            <p className="text-sm text-gray-500 text-center">Pressione Enter para continuar</p>
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Muito baixo</span>
              <span>Muito alto</span>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <Button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  variant="outline"
                  className="h-12 hover:bg-purple-100 hover:border-purple-300"
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'single':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                variant="outline"
                className="w-full p-4 text-left justify-start hover:bg-purple-50 hover:border-purple-300"
              >
                {option}
              </Button>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options?.map((option) => (
                <Button
                  key={option}
                  onClick={() => {
                    const current = answers[currentQuestion.id] || [];
                    const updated = current.includes(option) 
                      ? current.filter((item: string) => item !== option)
                      : [...current, option];
                    setAnswers({ ...answers, [currentQuestion.id]: updated });
                  }}
                  variant={answers[currentQuestion.id]?.includes(option) ? "default" : "outline"}
                  className="p-3 text-sm"
                >
                  {option}
                </Button>
              ))}
            </div>
            {answers[currentQuestion.id]?.length > 0 && (
              <Button
                onClick={() => handleAnswer(answers[currentQuestion.id])}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Continuar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-purple-600 border-purple-300">
              Questão {currentQuestionIndex + 1} de {questions.length}
            </Badge>
            <div className="text-sm text-gray-500">
              {userName && `Olá, ${userName}!`}
            </div>
          </div>
          
          <Progress value={progress} className="mb-6" />
          
          <CardTitle className="text-2xl text-center text-gray-800">
            {currentQuestion.question}
          </CardTitle>
          
          {currentQuestion.category === 'consciousness' && (
            <div className="flex items-center justify-center mt-2">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              <span className="text-sm text-purple-600">Consciência</span>
            </div>
          )}
          {currentQuestion.category === 'energy' && (
            <div className="flex items-center justify-center mt-2">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              <span className="text-sm text-yellow-600">Energia</span>
            </div>
          )}
          {currentQuestion.category === 'coherence' && (
            <div className="flex items-center justify-center mt-2">
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              <span className="text-sm text-red-600">Coerência</span>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderQuestion()}
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🧠 Suas respostas ajudam nossa IA a personalizar sua experiência
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};