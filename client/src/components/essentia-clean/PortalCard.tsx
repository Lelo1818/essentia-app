import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Lock, CheckCircle, Sparkles } from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  icon: any;
  color: string;
  phrase: string;
  practice: string;
  unlocked: boolean;
  completed?: boolean;
}

interface PortalCardProps {
  portal: Portal;
  onComplete: (portalId: string, reflection: string) => void;
}

export const PortalCard = ({ portal, onComplete }: PortalCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(portal.completed || false);
  const [reflection, setReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  const Icon = portal.icon;

  const handleEnterPortal = () => {
    if (!portal.unlocked) return;
    setIsOpen(true);
  };

  const handleStartPractice = () => {
    setShowReflection(true);
  };

  const handleSubmitReflection = () => {
    if (reflection.trim().length > 0) {
      setIsCompleted(true);
      setShowReflection(false);
      onComplete(portal.id, reflection);
      
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Card Principal */}
      <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
        portal.unlocked 
          ? 'border-2 hover:border-purple-300' 
          : 'border-gray-200 opacity-60'
      }`}>
        
        {/* Completed Badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-green-600 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Concluído
            </Badge>
          </div>
        )}

        <CardContent className="p-6 text-center relative">
          
          {/* Ícone do Portal */}
          <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center shadow-lg ${
            portal.unlocked ? '' : 'grayscale'
          }`}>
            <Icon className="w-10 h-10 text-white" />
            {!portal.unlocked && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          {/* Nome */}
          <h3 className={`text-lg font-bold mb-2 ${
            portal.unlocked ? 'text-slate-900' : 'text-gray-500'
          }`}>
            {portal.name}
          </h3>
          
          {/* Frase Inspiracional */}
          <p className={`text-sm italic mb-4 ${
            portal.unlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            "{portal.phrase}"
          </p>

          {/* Botão */}
          <Button 
            className={`w-full ${
              portal.unlocked 
                ? `bg-gradient-to-r ${portal.color} hover:opacity-90` 
                : 'bg-gray-300'
            } text-white`}
            onClick={handleEnterPortal}
            disabled={!portal.unlocked}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Revisar
              </>
            ) : portal.unlocked ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Entrar
              </>
            ) : (
              'Bloqueado'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Modal da Experiência */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className={`w-8 h-8 mr-2 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {portal.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            
            {/* Frase */}
            <div className={`p-4 bg-gray-50 rounded-lg border-l-4 ${
              portal.color.replace('from-', 'border-').split(' ')[0]
            }`}>
              <p className="text-gray-700 italic">"{portal.phrase}"</p>
            </div>

            {/* Prática ou Reflexão */}
            {!showReflection && !isCompleted ? (
              <div className="space-y-4">
                <h4 className="font-semibold">Prática:</h4>
                <p className="text-gray-700">{portal.practice}</p>
                <Button 
                  onClick={handleStartPractice}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white`}
                >
                  Iniciar Prática
                </Button>
              </div>
            ) : showReflection && !isCompleted ? (
              <div className="space-y-4">
                <h4 className="font-semibold">Reflexão:</h4>
                <p className="text-sm text-gray-600">Como essa prática impactou você?</p>
                <Textarea 
                  placeholder="Compartilhe seus insights..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button 
                  onClick={handleSubmitReflection}
                  disabled={reflection.trim().length === 0}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white`}
                >
                  Concluir Portal
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Portal Concluído!</h3>
                <p className="text-green-700">Sua jornada continua.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};