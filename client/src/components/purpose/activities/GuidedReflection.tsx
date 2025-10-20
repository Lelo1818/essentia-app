import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, CheckCircle, ChevronRight } from 'lucide-react';

interface GuidedReflectionProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  phase: string;
}

export default function GuidedReflection({ open, onClose, onComplete, phase }: GuidedReflectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [completed, setCompleted] = useState(false);

  const reflectionQuestions = {
    awakening: [
      "O que te faz sentir verdadeiramente vivo(a)?",
      "Quais momentos da sua vida você se sentiu mais autêntico(a)?",
      "O que você faria se não tivesse medo?"
    ],
    exploration: [
      "Quais são os 3 valores mais importantes para você?",
      "O que você quer que as pessoas lembrem de você?",
      "Que legado você gostaria de deixar no mundo?"
    ],
    clarity: [
      "Qual é a sua contribuição única para o mundo?",
      "Como você pode servir aos outros com seus talentos?",
      "Que problema você se sente chamado(a) a resolver?"
    ],
    integration: [
      "Como você está vivendo seu propósito hoje?",
      "Que ações concretas você pode tomar esta semana?",
      "O que precisa mudar para você viver mais alinhado?"
    ],
    mastery: [
      "Como você pode inspirar outros em sua jornada?",
      "Que sabedoria você aprendeu que pode compartilhar?",
      "Como você pode expandir seu impacto positivo?"
    ]
  };

  const questions = reflectionQuestions[phase as keyof typeof reflectionQuestions] || reflectionQuestions.awakening;

  const handleNext = () => {
    if (currentAnswer.trim()) {
      const newAnswers = [...answers, currentAnswer];
      setAnswers(newAnswers);
      setCurrentAnswer('');
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCompleted(true);
      }
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentAnswer('');
    setCompleted(false);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(answers[currentQuestion - 1] || '');
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-guided-reflection">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
            Reflexão Guiada
          </DialogTitle>
        </DialogHeader>

        {!completed ? (
          <div className="space-y-6 py-4">
            {/* Progresso */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span className="text-blue-600 font-medium">+20 pontos</span>
            </div>

            {/* Barra de Progresso */}
            <div className="flex space-x-1">
              {questions.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1 flex-1 rounded-full ${
                    idx <= currentQuestion ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Pergunta */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
              <p className="text-lg font-medium text-gray-800" data-testid="reflection-question">
                {questions[currentQuestion]}
              </p>
            </div>

            {/* Área de Resposta */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">
                Reserve um momento para refletir profundamente...
              </label>
              <Textarea 
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Digite sua reflexão aqui..."
                className="min-h-[150px] resize-none"
                data-testid="textarea-reflection-answer"
              />
              <p className="text-xs text-gray-500">
                {currentAnswer.length} caracteres
              </p>
            </div>

            {/* Botões */}
            <div className="flex justify-between space-x-3">
              <Button 
                onClick={handleBack}
                variant="outline"
                disabled={currentQuestion === 0}
                data-testid="button-reflection-back"
              >
                Voltar
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!currentAnswer.trim()}
                className="flex-1"
                data-testid="button-reflection-next"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Próxima
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  'Finalizar Reflexão'
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Reflexão Concluída!</h3>
              <p className="text-gray-600">
                Você completou {questions.length} perguntas profundas.
                <br />
                Suas respostas foram salvas no seu diário de jornada.
                <br />
                <span className="text-green-600 font-medium">+20 pontos ganhos</span>
              </p>
            </div>
            <Button onClick={handleComplete} size="lg" className="w-full" data-testid="button-complete-reflection">
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
