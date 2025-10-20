import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ValuesAssessmentProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CORE_VALUES_LIST = [
  'Autonomia', 'Família', 'Saúde', 'Aprendizado', 'Criatividade',
  'Honestidade', 'Liberdade', 'Segurança', 'Amor', 'Respeito',
  'Justiça', 'Aventura', 'Paz', 'Sabedoria', 'Coragem',
  'Gratidão', 'Compaixão', 'Excelência', 'Autenticidade', 'Propósito',
  'Generosidade', 'Crescimento', 'Equilíbrio', 'Conexão', 'Contribuição'
];

export default function ValuesAssessment({ open, onClose, onComplete }: ValuesAssessmentProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [reflections, setReflections] = useState('');
  const [step, setStep] = useState<'select' | 'reflect' | 'complete'>('select');

  const handleToggleValue = (value: string) => {
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      if (prev.length < 5) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleContinueToReflection = () => {
    if (selectedValues.length === 5) {
      setStep('reflect');
    }
  };

  const handleComplete = () => {
    setStep('complete');
  };

  const handleFinish = () => {
    onComplete();
    onClose();
    setSelectedValues([]);
    setReflections('');
    setStep('select');
  };

  const handleClose = () => {
    onClose();
    setSelectedValues([]);
    setReflections('');
    setStep('select');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-values-assessment">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-500" />
            Autoavaliação de Valores
          </DialogTitle>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-6 py-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100">
              <h3 className="font-semibold mb-2 text-gray-800">
                Identifique seus 5 valores fundamentais
              </h3>
              <p className="text-sm text-gray-600">
                Valores são princípios que guiam suas decisões e definem quem você é. 
                Escolha os 5 que mais ressoam com sua essência.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">
                  Valores selecionados: {selectedValues.length}/5
                </h4>
                {selectedValues.length === 5 && (
                  <Badge className="bg-green-500">Completo!</Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {CORE_VALUES_LIST.map((value) => {
                  const isSelected = selectedValues.includes(value);
                  const canSelect = selectedValues.length < 5 || isSelected;
                  
                  return (
                    <Button
                      key={value}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleValue(value)}
                      disabled={!canSelect}
                      className={`${isSelected ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                      data-testid={`button-value-${value.toLowerCase()}`}
                    >
                      {value}
                    </Button>
                  );
                })}
              </div>

              {selectedValues.length > 0 && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-medium mb-2">Seus valores escolhidos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedValues.map((value, idx) => (
                        <Badge key={value} variant="secondary" className="text-sm">
                          {idx + 1}. {value}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleClose}
                variant="outline"
                className="flex-1"
                data-testid="button-assessment-cancel"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleContinueToReflection}
                disabled={selectedValues.length !== 5}
                className="flex-1"
                data-testid="button-assessment-continue"
              >
                {selectedValues.length === 5 
                  ? 'Continuar para Reflexão'
                  : `Selecione mais ${5 - selectedValues.length} valor(es)`
                }
              </Button>
            </div>
          </div>
        )}

        {step === 'reflect' && (
          <div className="space-y-6 py-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-semibold mb-3 text-gray-800">
                Reflita sobre seus valores
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Você escolheu: <strong>{selectedValues.join(', ')}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Agora reflita: como esses valores se manifestam (ou poderiam se manifestar) 
                na sua vida diária? Como eles influenciam suas decisões?
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Suas reflexões sobre estes valores:
              </label>
              <Textarea
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                placeholder="Escreva sobre como esses valores se conectam com sua vida, seus sonhos e suas escolhas..."
                className="min-h-[200px] resize-none"
                data-testid="textarea-assessment-reflection"
              />
              <p className="text-xs text-gray-500">
                {reflections.length} caracteres
              </p>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => setStep('select')}
                variant="outline"
                className="flex-1"
                data-testid="button-assessment-back"
              >
                Voltar
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={reflections.length < 50}
                className="flex-1"
                data-testid="button-assessment-finish"
              >
                {reflections.length < 50
                  ? 'Escreva um pouco mais...'
                  : 'Finalizar Avaliação'
                }
              </Button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-6 py-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Avaliação Completa!</h3>
              <p className="text-gray-600 mb-4">
                Você identificou seus 5 valores fundamentais:
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {selectedValues.map((value) => (
                  <Badge key={value} className="text-base px-3 py-1 bg-purple-600">
                    {value}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-600">
                Esses valores são sua bússola interna.
                <br />
                <span className="text-green-600 font-medium">+30 pontos ganhos</span>
              </p>
            </div>
            <Button onClick={handleFinish} size="lg" className="w-full" data-testid="button-complete-assessment">
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
