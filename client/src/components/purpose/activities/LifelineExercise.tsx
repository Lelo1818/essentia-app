import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookOpen, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LifelineExerciseProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface LifeMoment {
  id: number;
  age: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export default function LifelineExercise({ open, onClose, onComplete }: LifelineExerciseProps) {
  const [moments, setMoments] = useState<LifeMoment[]>([]);
  const [currentMoment, setCurrentMoment] = useState<Partial<LifeMoment>>({
    age: '',
    title: '',
    description: '',
    impact: 'neutral'
  });
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState<'intro' | 'adding' | 'review'>('intro');

  const handleAddMoment = () => {
    if (currentMoment.age && currentMoment.title) {
      const newMoment: LifeMoment = {
        id: Date.now(),
        age: currentMoment.age || '',
        title: currentMoment.title || '',
        description: currentMoment.description || '',
        impact: currentMoment.impact || 'neutral'
      };
      
      setMoments([...moments, newMoment].sort((a, b) => 
        parseInt(a.age) - parseInt(b.age)
      ));
      
      setCurrentMoment({
        age: '',
        title: '',
        description: '',
        impact: 'neutral'
      });
    }
  };

  const handleRemoveMoment = (id: number) => {
    setMoments(moments.filter(m => m.id !== id));
  };

  const handleFinish = () => {
    if (moments.length >= 3) {
      setCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    setMoments([]);
    setCurrentMoment({ age: '', title: '', description: '', impact: 'neutral' });
    setCompleted(false);
    setStep('intro');
  };

  const handleClose = () => {
    onClose();
    setMoments([]);
    setCurrentMoment({ age: '', title: '', description: '', impact: 'neutral' });
    setCompleted(false);
    setStep('intro');
  };

  const impactColors = {
    positive: 'bg-green-100 border-green-300 text-green-800',
    negative: 'bg-red-100 border-red-300 text-red-800',
    neutral: 'bg-blue-100 border-blue-300 text-blue-800'
  };

  const impactLabels = {
    positive: 'Momento Transformador Positivo',
    negative: 'Desafio Superado',
    neutral: 'Momento de Aprendizado'
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-lifeline-exercise">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
            Exercício da Linha da Vida
          </DialogTitle>
        </DialogHeader>

        {!completed ? (
          <div className="space-y-6 py-4">
            {step === 'intro' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-semibold mb-3 text-gray-800">
                    Mapeie os momentos que moldaram quem você é
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Este exercício te ajuda a identificar os momentos-chave da sua vida que influenciaram sua jornada. 
                    Podem ser conquistas, desafios superados, perdas, descobertas ou transformações.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ Pense em pelo menos 5 momentos significativos</li>
                    <li>✓ Inclua tanto experiências positivas quanto desafios</li>
                    <li>✓ Reflita sobre o que cada momento te ensinou</li>
                    <li>✓ Organize-os cronologicamente por idade</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => setStep('adding')} 
                  size="lg" 
                  className="w-full"
                  data-testid="button-start-lifeline"
                >
                  Começar Mapeamento
                </Button>
              </div>
            )}

            {step === 'adding' && (
              <div className="space-y-6">
                {/* Linha do Tempo Visual */}
                {moments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">
                      Sua Linha da Vida ({moments.length} momentos)
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {moments.map((moment) => (
                        <Card key={moment.id} className={`${impactColors[moment.impact]} border-2`}>
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-xs font-bold">
                                    {moment.age} anos
                                  </span>
                                  <span className="text-sm font-medium">
                                    {moment.title}
                                  </span>
                                </div>
                                {moment.description && (
                                  <p className="text-xs opacity-80">
                                    {moment.description}
                                  </p>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveMoment(moment.id)}
                                data-testid={`button-remove-moment-${moment.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulário de Novo Momento */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-700">
                    Adicionar Momento Transformador
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="moment-age">Idade</Label>
                      <Input
                        id="moment-age"
                        type="number"
                        value={currentMoment.age}
                        onChange={(e) => setCurrentMoment({ ...currentMoment, age: e.target.value })}
                        placeholder="Ex: 25"
                        data-testid="input-moment-age"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="moment-impact">Tipo</Label>
                      <select
                        id="moment-impact"
                        value={currentMoment.impact}
                        onChange={(e) => setCurrentMoment({ ...currentMoment, impact: e.target.value as any })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        data-testid="select-moment-impact"
                      >
                        <option value="positive">Positivo</option>
                        <option value="negative">Desafio</option>
                        <option value="neutral">Aprendizado</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="moment-title">Título do Momento</Label>
                    <Input
                      id="moment-title"
                      value={currentMoment.title}
                      onChange={(e) => setCurrentMoment({ ...currentMoment, title: e.target.value })}
                      placeholder="Ex: Mudança de carreira"
                      data-testid="input-moment-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="moment-description">O que aconteceu e o que aprendi</Label>
                    <Textarea
                      id="moment-description"
                      value={currentMoment.description}
                      onChange={(e) => setCurrentMoment({ ...currentMoment, description: e.target.value })}
                      placeholder="Descreva brevemente o que aconteceu e como isso te transformou..."
                      className="min-h-[80px] resize-none"
                      data-testid="textarea-moment-description"
                    />
                  </div>

                  <Button
                    onClick={handleAddMoment}
                    disabled={!currentMoment.age || !currentMoment.title}
                    className="w-full"
                    data-testid="button-add-moment"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar à Linha do Tempo
                  </Button>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1"
                    data-testid="button-lifeline-cancel"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleFinish}
                    disabled={moments.length < 3}
                    className="flex-1"
                    data-testid="button-lifeline-finish"
                  >
                    {moments.length < 3 
                      ? `Adicione pelo menos ${3 - moments.length} momento(s)`
                      : 'Finalizar Exercício'
                    }
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 py-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Linha da Vida Completa!</h3>
              <p className="text-gray-600">
                Você mapeou {moments.length} momentos transformadores.
                <br />
                Esta visão panorâmica da sua vida revela padrões e aprendizados valiosos.
                <br />
                <span className="text-green-600 font-medium">+40 pontos ganhos</span>
              </p>
            </div>
            <Button onClick={handleComplete} size="lg" className="w-full" data-testid="button-complete-lifeline">
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
