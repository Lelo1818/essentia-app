import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sun, Moon, Clock, Star, Calendar } from 'lucide-react';
import { dailyPractices } from '../../data/essentia-pro-data';

interface DailyRitualsProProps {
  onComplete: () => void;
}

export const DailyRitualsPro = ({ onComplete }: DailyRitualsProProps) => {
  const [selectedRitual, setSelectedRitual] = useState<'morning' | 'evening'>('morning');
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  const ritual = dailyPractices.find(p => p.id === selectedRitual);
  if (!ritual) return null;

  const startRitual = () => {
    setIsActive(true);
    setCurrentStep(0);
    setCompletedSteps(new Array(ritual.steps.length).fill(false));
    setIsCompleted(false);
    setReflection('');
  };

  const completeStep = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);

    if (currentStep < ritual.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All steps completed, show reflection
      setCurrentStep(ritual.steps.length);
    }
  };

  const completeRitual = () => {
    if (reflection.trim().length > 0) {
      setIsCompleted(true);
      onComplete();
      setTimeout(() => {
        setIsActive(false);
        setCurrentStep(0);
        setReflection('');
        setIsCompleted(false);
      }, 3000);
    }
  };

  const progress = isActive ? ((completedSteps.filter(Boolean).length + (currentStep === ritual.steps.length ? 1 : 0)) / (ritual.steps.length + 1)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Ritual Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Rituais Diários</CardTitle>
          <p className="text-center text-gray-600">
            Práticas intencionais para começar e encerrar seu dia com propósito
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {dailyPractices.map((practice) => (
              <Card 
                key={practice.id}
                className={`cursor-pointer transition-all border-2 ${
                  selectedRitual === practice.id ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRitual(practice.id as 'morning' | 'evening')}
              >
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    {practice.id === 'morning' ? (
                      <Sun className="w-12 h-12 mx-auto text-yellow-600" />
                    ) : (
                      <Moon className="w-12 h-12 mx-auto text-indigo-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{practice.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{practice.description}</p>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {practice.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {!isActive && (
            <div className="text-center">
              <Button 
                onClick={startRitual}
                size="lg"
                className={`${selectedRitual === 'morning' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {selectedRitual === 'morning' ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                Iniciar {ritual.name}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Ritual */}
      {isActive && !isCompleted && (
        <Card className={`border-2 ${selectedRitual === 'morning' ? 'border-yellow-300 bg-yellow-50' : 'border-indigo-300 bg-indigo-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                {selectedRitual === 'morning' ? <Sun className="w-6 h-6 mr-2 text-yellow-600" /> : <Moon className="w-6 h-6 mr-2 text-indigo-600" />}
                {ritual.name} em Andamento
              </span>
              <Badge className={`${selectedRitual === 'morning' ? 'bg-yellow-600' : 'bg-indigo-600'} text-white`}>
                {Math.round(progress)}% Completo
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso do Ritual</span>
                  <span>{completedSteps.filter(Boolean).length + (currentStep === ritual.steps.length ? 1 : 0)} de {ritual.steps.length + 1}</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Steps */}
              {currentStep < ritual.steps.length && (
                <div>
                  <h4 className="font-semibold text-lg mb-4">
                    Passo {currentStep + 1}: {ritual.steps[currentStep]}
                  </h4>
                  
                  <div className="grid gap-3 mb-6">
                    {ritual.steps.map((step, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border flex items-center ${
                          index < currentStep || completedSteps[index] ? 'bg-green-50 border-green-200' :
                          index === currentStep ? `${selectedRitual === 'morning' ? 'bg-yellow-100 border-yellow-200' : 'bg-indigo-100 border-indigo-200'}` :
                          'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          completedSteps[index] ? 'bg-green-500' :
                          index === currentStep ? `${selectedRitual === 'morning' ? 'bg-yellow-500' : 'bg-indigo-500'}` :
                          'bg-gray-300'
                        }`}>
                          {completedSteps[index] ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <span className={`${index === currentStep ? 'font-semibold' : ''}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      onClick={completeStep}
                      className={`${selectedRitual === 'morning' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      Concluir Passo
                    </Button>
                  </div>
                </div>
              )}

              {/* Reflection */}
              {currentStep === ritual.steps.length && (
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Reflexão Final
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Como você se sente após completar este ritual? Que intenções ou gratidões gostaria de registrar?
                  </p>
                  <Textarea 
                    placeholder="Compartilhe suas reflexões sobre este momento..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="mb-4"
                    rows={4}
                  />
                  <Button 
                    onClick={completeRitual}
                    disabled={reflection.trim().length === 0}
                    className={`w-full ${selectedRitual === 'morning' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    Concluir Ritual
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion */}
      {isCompleted && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Ritual Concluído!</h3>
            <p className="text-green-700 mb-4">
              Você completou seu {ritual.name} com intenção e presença
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <p className="text-gray-700 italic">"{reflection}"</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-600" />
            Histórico de Práticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <div className="text-sm text-yellow-600">Rituais Matinais</div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">8</div>
              <div className="text-sm text-indigo-600">Rituais Noturnos</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-green-600">Sequência Atual</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-purple-600">Consistência</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};