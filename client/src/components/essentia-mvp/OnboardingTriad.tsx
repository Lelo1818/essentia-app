import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Heart, ArrowRight, User, Mail } from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface OnboardingTriadProps {
  onComplete: (name: string, email: string, triadScores: TriadScores) => void;
}

interface TriadQuestion {
  id: string;
  category: 'consciencia' | 'energia' | 'coerencia';
  question: string;
  options: { value: number; label: string; description: string }[];
}

const triadQuestions: TriadQuestion[] = [
  // Consciência
  {
    id: 'c1',
    category: 'consciencia',
    question: 'Como você se sente em relação ao seu propósito de vida?',
    options: [
      { value: 20, label: 'Perdido', description: 'Não tenho clareza sobre meu propósito' },
      { value: 40, label: 'Confuso', description: 'Tenho algumas ideias mas não tenho certeza' },
      { value: 60, label: 'Direcionado', description: 'Tenho uma ideia geral do que quero' },
      { value: 80, label: 'Focado', description: 'Sei meu propósito e estou trabalhando nele' },
      { value: 100, label: 'Realizado', description: 'Vivo plenamente meu propósito' }
    ]
  },
  {
    id: 'c2',
    category: 'consciencia',
    question: 'Qual é seu nível de autoconhecimento?',
    options: [
      { value: 20, label: 'Básico', description: 'Raramente reflito sobre mim mesmo' },
      { value: 40, label: 'Superficial', description: 'Às vezes penso sobre quem sou' },
      { value: 60, label: 'Moderado', description: 'Conheço bem meus pontos fortes e fracos' },
      { value: 80, label: 'Profundo', description: 'Entendo bem meus padrões e motivações' },
      { value: 100, label: 'Integral', description: 'Tenho clareza total sobre meu ser' }
    ]
  },
  // Energia
  {
    id: 'e1',
    category: 'energia',
    question: 'Como está seu nível de energia física no dia a dia?',
    options: [
      { value: 20, label: 'Exausto', description: 'Sempre cansado, sem disposição' },
      { value: 40, label: 'Baixo', description: 'Frequentemente sem energia' },
      { value: 60, label: 'Moderado', description: 'Energia suficiente para as tarefas' },
      { value: 80, label: 'Alto', description: 'Sinto-me energizado na maior parte do tempo' },
      { value: 100, label: 'Vibrante', description: 'Energia abundante e constante' }
    ]
  },
  {
    id: 'e2',
    category: 'energia',
    question: 'Como você cuida da sua vitalidade?',
    options: [
      { value: 20, label: 'Negligente', description: 'Não cuido da minha saúde' },
      { value: 40, label: 'Irregular', description: 'Cuido quando lembro ou tenho tempo' },
      { value: 60, label: 'Consistente', description: 'Tenho rotinas básicas de cuidado' },
      { value: 80, label: 'Dedicado', description: 'Priorizo minha saúde e bem-estar' },
      { value: 100, label: 'Integral', description: 'Vitalidade é prioridade em todas as áreas' }
    ]
  },
  // Coerência
  {
    id: 'h1',
    category: 'coerencia',
    question: 'Como está o alinhamento entre seus valores e suas ações?',
    options: [
      { value: 20, label: 'Conflitante', description: 'Frequentemente ago contra meus valores' },
      { value: 40, label: 'Inconsistente', description: 'Às vezes me traio, mas reconheço' },
      { value: 60, label: 'Alinhado', description: 'Geralmente ajo conforme meus valores' },
      { value: 80, label: 'Íntegro', description: 'Raramente comprometo meus princípios' },
      { value: 100, label: 'Coerente', description: 'Total alinhamento entre ser e fazer' }
    ]
  },
  {
    id: 'h2',
    category: 'coerencia',
    question: 'Como você lida com conflitos e desafios?',
    options: [
      { value: 20, label: 'Reativo', description: 'Perco o controle facilmente' },
      { value: 40, label: 'Instável', description: 'Oscilo entre calma e descontrole' },
      { value: 60, label: 'Equilibrado', description: 'Mantenho a compostura na maioria das vezes' },
      { value: 80, label: 'Centrado', description: 'Raramente perco meu centro' },
      { value: 100, label: 'Inabalável', description: 'Permaneço sereno mesmo em crises' }
    ]
  }
];

export const OnboardingTriad = ({ onComplete }: OnboardingTriadProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const isInfoStep = currentStep === 0;
  const currentQuestion = triadQuestions[currentStep - 1];
  const totalSteps = triadQuestions.length + 1;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setCurrentStep(prev => prev + 1);
  };

  const calculateTriadScores = (): TriadScores => {
    const conscienciaQuestions = triadQuestions.filter(q => q.category === 'consciencia');
    const energiaQuestions = triadQuestions.filter(q => q.category === 'energia');
    const coerenciaQuestions = triadQuestions.filter(q => q.category === 'coerencia');

    const consciencia = Math.round(
      conscienciaQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0) / conscienciaQuestions.length
    );
    
    const energia = Math.round(
      energiaQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0) / energiaQuestions.length
    );
    
    const coerencia = Math.round(
      coerenciaQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0) / coerenciaQuestions.length
    );

    return { consciencia, energia, coerencia };
  };

  const handleComplete = () => {
    if (name.trim() && email.trim()) {
      const triadScores = calculateTriadScores();
      onComplete(name.trim(), email.trim(), triadScores);
    }
  };

  const canProceed = () => {
    if (isInfoStep) {
      return name.trim().length > 0 && email.trim().length > 0 && email.includes('@');
    }
    return false;
  };

  const getTriadIcon = (category: string) => {
    switch (category) {
      case 'consciencia': return Brain;
      case 'energia': return Zap;
      case 'coerencia': return Heart;
      default: return Brain;
    }
  };

  const getTriadColor = (category: string) => {
    switch (category) {
      case 'consciencia': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'energia': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'coerencia': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-purple-600 bg-purple-50 border-purple-200';
    }
  };

  if (currentStep >= totalSteps) {
    const scores = calculateTriadScores();
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sua Tríade Essencial</CardTitle>
          <p className="text-gray-600 mt-2">
            Baseado em suas respostas, aqui estão seus níveis atuais
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Brain className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Consciência</h3>
              <div className="text-3xl font-bold text-purple-600 mt-2">{scores.consciencia}%</div>
              <Progress value={scores.consciencia} className="mt-2" />
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Energia</h3>
              <div className="text-3xl font-bold text-yellow-600 mt-2">{scores.energia}%</div>
              <Progress value={scores.energia} className="mt-2" />
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <Heart className="w-12 h-12 mx-auto mb-3 text-red-600" />
              <h3 className="font-semibold text-red-800">Coerência</h3>
              <div className="text-3xl font-bold text-red-600 mt-2">{scores.coerencia}%</div>
              <Progress value={scores.coerencia} className="mt-2" />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-800 mb-2">Seu próximo passo:</h4>
            <p className="text-indigo-700 text-sm">
              O sistema recomendará portais personalizados baseados em seus pontos que precisam de mais atenção.
              Vamos começar sua jornada de crescimento!
            </p>
          </div>

          <Button 
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="lg"
          >
            Iniciar Jornada Essentia
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Passo {currentStep + 1} de {totalSteps}
          </div>
          <Progress value={((currentStep + 1) / totalSteps) * 100} className="w-32" />
        </div>
        
        {isInfoStep ? (
          <CardTitle className="text-2xl text-center">
            Bem-vindo ao Essentia
          </CardTitle>
        ) : (
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTriadColor(currentQuestion.category)}`}>
              {(() => {
                const IconComponent = getTriadIcon(currentQuestion.category);
                return <IconComponent className="w-4 h-4 mr-2" />;
              })()}
              {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
            </div>
            <CardTitle className="text-xl mt-3">
              {currentQuestion.question}
            </CardTitle>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {isInfoStep ? (
          <div className="space-y-6">
            <p className="text-gray-600 text-center">
              Vamos conhecer você e entender seus níveis atuais na Tríade Essencial: 
              Consciência, Energia e Coerência
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nome
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como você gostaria de ser chamado?"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="mt-1"
                />
              </div>
            </div>
            
            <Button 
              onClick={() => setCurrentStep(1)}
              disabled={!canProceed()}
              className="w-full"
              size="lg"
            >
              Continuar para Avaliação da Tríade
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-purple-700">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 ml-4">
                    {option.value}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};