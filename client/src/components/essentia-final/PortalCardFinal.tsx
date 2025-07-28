import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Lock, Unlock, CheckCircle, ArrowRight, Sparkles, Clock } from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  icon: any;
  color: string;
  phrase: string;
  practice: string;
  timeEstimate: string;
  category: string;
  unlocked: boolean;
  completed?: boolean;
}

interface PortalCardFinalProps {
  portal: Portal;
  onComplete: (portalId: string, reflection: string) => void;
  onProgress?: (portalId: string, progress: number) => void;
}

export const PortalCardFinal = ({ portal, onComplete, onProgress }: PortalCardFinalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(portal.completed || false);
  const [reflection, setReflection] = useState('');
  const [isReflecting, setIsReflecting] = useState(false);
  const [practiceProgress, setPracticeProgress] = useState(0);
  const [isPlayingPractice, setIsPlayingPractice] = useState(false);

  const Icon = portal.icon;

  const handleEnterPortal = () => {
    if (!portal.unlocked) return;
    setIsOpen(true);
    onProgress?.(portal.id, 10);
  };

  const handleStartPractice = () => {
    setIsPlayingPractice(true);
    onProgress?.(portal.id, 30);
    
    // Simular progresso da prática
    const interval = setInterval(() => {
      setPracticeProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsPlayingPractice(false);
          setIsReflecting(true);
          onProgress?.(portal.id, 70);
        }
        return newProgress;
      });
    }, 800);
  };

  const handleSubmitReflection = () => {
    if (reflection.trim().length > 0) {
      setIsCompleted(true);
      setIsReflecting(false);
      onComplete(portal.id, reflection);
      onProgress?.(portal.id, 100);
      
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }
  };

  const resetPortal = () => {
    setIsCompleted(false);
    setReflection('');
    setIsReflecting(false);
    setPracticeProgress(0);
    setIsPlayingPractice(false);
  };

  return (
    <>
      {/* Card Principal */}
      <Card className={`group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 relative overflow-hidden ${
        portal.unlocked 
          ? 'border-2 hover:border-purple-400 shadow-lg' 
          : 'border-gray-200 opacity-60'
      }`}>
        
        {/* Background Pattern */}
        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${portal.color}`} />
        
        {/* Completed Badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-green-600 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Concluído
            </Badge>
          </div>
        )}

        <CardContent className="p-6 text-center relative z-10">
          
          {/* Ícone do Portal */}
          <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center relative shadow-xl transform group-hover:scale-110 transition-transform duration-300 ${
            portal.unlocked ? '' : 'grayscale'
          }`}>
            <Icon className="w-12 h-12 text-white" />
            {!portal.unlocked && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            )}
            {isCompleted && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          
          {/* Categoria */}
          <Badge variant="secondary" className="mb-2 text-xs">
            {portal.category}
          </Badge>
          
          {/* Nome */}
          <h3 className={`text-xl font-bold mb-2 ${
            portal.unlocked ? 'text-slate-900' : 'text-gray-500'
          }`}>
            {portal.name}
          </h3>
          
          {/* Frase Inspiracional */}
          <p className={`text-sm italic mb-4 leading-relaxed ${
            portal.unlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            "{portal.phrase}"
          </p>

          {/* Tempo Estimado */}
          <div className="flex items-center justify-center mb-4 text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {portal.timeEstimate}
          </div>

          {/* Status e Botão */}
          <div className="space-y-3">
            {portal.unlocked ? (
              <Badge className="bg-green-100 text-green-700">
                <Unlock className="w-3 h-3 mr-1" />
                Disponível
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-500">
                <Lock className="w-3 h-3 mr-1" />
                Bloqueado
              </Badge>
            )}

            <Button 
              className={`w-full transition-all duration-300 ${
                portal.unlocked 
                  ? `bg-gradient-to-r ${portal.color} hover:shadow-lg transform hover:scale-105` 
                  : 'bg-gray-300'
              } text-white`}
              onClick={handleEnterPortal}
              disabled={!portal.unlocked}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Revisar Portal
                </>
              ) : portal.unlocked ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Entrar no Portal
                </>
              ) : (
                'Requer Desbloqueio'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal da Experiência */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <div className={`w-10 h-10 mr-3 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {portal.name}
            </DialogTitle>
            <div className="text-sm text-gray-500">{portal.category} • {portal.timeEstimate}</div>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            
            {/* Frase Inspiracional */}
            <div className={`p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 ${
              portal.color.replace('from-', 'border-').split(' ')[0]
            }`}>
              <p className="text-gray-700 italic text-center text-lg leading-relaxed">
                "{portal.phrase}"
              </p>
            </div>

            {/* Etapa 1: Início da Prática */}
            {!isPlayingPractice && !isReflecting && !isCompleted && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 text-lg">Prática Guiada</h4>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">{portal.practice}</p>
                </div>
                <Button 
                  onClick={handleStartPractice}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white py-3 text-lg`}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Iniciar Prática
                </Button>
              </div>
            )}

            {/* Etapa 2: Prática em Andamento */}
            {isPlayingPractice && (
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-800 text-lg text-center">
                  Praticando...
                </h4>
                
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center animate-pulse`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <Progress value={practiceProgress} className="w-full h-3" />
                  
                  <p className="text-gray-600">
                    Concentre-se na prática... {Math.round(practiceProgress)}%
                  </p>
                </div>
              </div>
            )}

            {/* Etapa 3: Reflexão */}
            {isReflecting && !isCompleted && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 text-lg">Reflexão Pessoal</h4>
                <p className="text-gray-600">
                  Como essa prática impactou você? Compartilhe suas percepções e insights:
                </p>
                <Textarea 
                  placeholder="Escreva suas reflexões sobre a experiência... Seja específico sobre as sensações, insights ou mudanças que percebeu."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[120px]"
                  rows={5}
                />
                <div className="text-sm text-gray-500">
                  Mínimo: 10 caracteres • Atual: {reflection.length}
                </div>
                <Button 
                  onClick={handleSubmitReflection}
                  disabled={reflection.trim().length < 10}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white py-3`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Concluir Portal
                </Button>
              </div>
            )}

            {/* Etapa 4: Conclusão */}
            {isCompleted && (
              <div className="text-center py-8 space-y-4">
                <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-green-800">Portal Concluído!</h3>
                <p className="text-green-700 leading-relaxed">
                  Você integrou com sucesso a energia deste portal. Sua jornada de transformação continua!
                </p>
                
                <div className="flex justify-center space-x-3 mt-6">
                  <Button 
                    onClick={() => setIsOpen(false)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Continuar Jornada
                  </Button>
                  <Button 
                    onClick={resetPortal}
                    variant="outline"
                    className="border-green-600 text-green-600"
                  >
                    Refazer Portal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};