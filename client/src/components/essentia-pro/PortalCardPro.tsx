import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Unlock, CheckCircle, ArrowRight } from 'lucide-react';
import { Portal } from '../../types/essentia';

interface PortalCardProProps {
  portal: Portal;
  onComplete: () => void;
}

export const PortalCardPro = ({ portal, onComplete }: PortalCardProProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isReflecting, setIsReflecting] = useState(false);

  const Icon = portal.icon;

  const handleEnterPortal = () => {
    if (!portal.unlocked) return;
    setIsOpen(true);
  };

  const handleCompletePractice = () => {
    setIsReflecting(true);
  };

  const handleSubmitReflection = () => {
    if (reflection.trim().length > 0) {
      setIsCompleted(true);
      setIsReflecting(false);
      onComplete();
      setTimeout(() => {
        setIsOpen(false);
        setIsCompleted(false);
        setReflection('');
      }, 2000);
    }
  };

  return (
    <>
      <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        portal.unlocked ? 'border-2 hover:border-purple-300' : 'border-gray-200 opacity-60'
      }`}>
        <CardContent className="p-6 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center relative ${
            portal.unlocked ? 'shadow-lg' : 'grayscale'
          }`}>
            <Icon className="w-10 h-10 text-white" />
            {!portal.unlocked && (
              <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          <h3 className={`text-xl font-bold mb-3 ${
            portal.unlocked ? 'text-slate-900' : 'text-gray-500'
          }`}>
            {portal.name}
          </h3>
          
          <p className={`text-sm italic mb-4 ${
            portal.unlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            "{portal.phrase}"
          </p>

          <div className="mb-4">
            {portal.unlocked ? (
              <Badge className="bg-green-100 text-green-700">
                <Unlock className="w-3 h-3 mr-1" />
                Desbloqueado
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-500">
                <Lock className="w-3 h-3 mr-1" />
                Bloqueado
              </Badge>
            )}
          </div>

          <Button 
            className={`w-full ${portal.unlocked ? `bg-gradient-to-r ${portal.color}` : 'bg-gray-300'} text-white`}
            onClick={handleEnterPortal}
            disabled={!portal.unlocked}
          >
            {portal.unlocked ? 'Entrar no Portal' : 'Requer Desbloqueio'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className={`w-8 h-8 mr-3 bg-gradient-to-r ${portal.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {portal.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Portal phrase */}
            <div className={`p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 ${portal.color.replace('from-', 'border-').split(' ')[0]}`}>
              <p className="text-gray-700 italic text-center">"{portal.phrase}"</p>
            </div>

            {!isReflecting && !isCompleted && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Prática Guiada</h4>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">{portal.practice}</p>
                </div>
                <Button 
                  onClick={handleCompletePractice}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white`}
                >
                  Realizar Prática
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {isReflecting && !isCompleted && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Reflexão Pessoal</h4>
                <p className="text-gray-600 mb-3 text-sm">
                  Como essa prática impactou você? Compartilhe suas percepções:
                </p>
                <Textarea 
                  placeholder="Escreva suas reflexões sobre a experiência..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <Button 
                  onClick={handleSubmitReflection}
                  disabled={reflection.trim().length === 0}
                  className={`w-full bg-gradient-to-r ${portal.color} text-white`}
                >
                  Concluir Portal
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {isCompleted && (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Portal Concluído!</h3>
                <p className="text-green-700">Você integrou a energia deste portal</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};