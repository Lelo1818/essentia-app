import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smile, Meh, Frown, Zap, ZapOff, Calendar, ArrowRight } from 'lucide-react';

interface DailyMood {
  date: string;
  humor: number;    // 1-5
  energia: number;  // 1-5
  timestamp: Date;
}

interface DailyCheckinProps {
  userName: string;
  onComplete: (mood: DailyMood) => void;
}

const humorOptions = [
  { value: 1, label: 'Muito Baixo', icon: Frown, color: 'text-red-500', bgColor: 'bg-red-50 border-red-200' },
  { value: 2, label: 'Baixo', icon: Frown, color: 'text-orange-500', bgColor: 'bg-orange-50 border-orange-200' },
  { value: 3, label: 'Neutro', icon: Meh, color: 'text-yellow-500', bgColor: 'bg-yellow-50 border-yellow-200' },
  { value: 4, label: 'Bom', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-50 border-green-200' },
  { value: 5, label: 'Muito Bom', icon: Smile, color: 'text-emerald-500', bgColor: 'bg-emerald-50 border-emerald-200' }
];

const energiaOptions = [
  { value: 1, label: 'Exausto', icon: ZapOff, color: 'text-red-500', bgColor: 'bg-red-50 border-red-200' },
  { value: 2, label: 'Cansado', icon: ZapOff, color: 'text-orange-500', bgColor: 'bg-orange-50 border-orange-200' },
  { value: 3, label: 'Moderado', icon: Zap, color: 'text-yellow-500', bgColor: 'bg-yellow-50 border-yellow-200' },
  { value: 4, label: 'Energizado', icon: Zap, color: 'text-green-500', bgColor: 'bg-green-50 border-green-200' },
  { value: 5, label: 'Vibrante', icon: Zap, color: 'text-emerald-500', bgColor: 'bg-emerald-50 border-emerald-200' }
];

export const DailyCheckin = ({ userName, onComplete }: DailyCheckinProps) => {
  const [currentStep, setCurrentStep] = useState<'humor' | 'energia'>('humor');
  const [selectedHumor, setSelectedHumor] = useState<number | null>(null);
  const [selectedEnergia, setSelectedEnergia] = useState<number | null>(null);

  const today = new Date();
  const todayStr = today.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleHumorSelect = (value: number) => {
    setSelectedHumor(value);
    setCurrentStep('energia');
  };

  const handleEnergiaSelect = (value: number) => {
    setSelectedEnergia(value);
  };

  const handleComplete = () => {
    if (selectedHumor && selectedEnergia) {
      const mood: DailyMood = {
        date: new Date().toISOString().split('T')[0],
        humor: selectedHumor,
        energia: selectedEnergia,
        timestamp: new Date()
      };
      onComplete(mood);
    }
  };

  const canComplete = selectedHumor !== null && selectedEnergia !== null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 mr-2 text-blue-600" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {todayStr}
          </Badge>
        </div>
        <CardTitle className="text-2xl">
          Bom dia, {userName}! 
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Como você está se sentindo hoje? Vamos fazer seu check-in diário.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Indicador de Progresso */}
        <div className="flex justify-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            currentStep === 'humor' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : selectedHumor 
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-500'
          }`}>
            <Smile className="w-4 h-4" />
            <span>1. Humor</span>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            currentStep === 'energia' 
              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
              : selectedEnergia 
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-500'
          }`}>
            <Zap className="w-4 h-4" />
            <span>2. Energia</span>
          </div>
        </div>

        {/* Pergunta sobre Humor */}
        {currentStep === 'humor' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-800">
              Como está seu humor hoje?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {humorOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleHumorSelect(option.value)}
                    className={`p-4 border rounded-lg transition-all duration-200 hover:scale-105 ${option.bgColor} hover:shadow-md`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-6 h-6 ${option.color}`} />
                      <span className="font-medium text-gray-800">{option.label}</span>
                      <div className="ml-auto flex space-x-1">
                        {[...Array(option.value)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pergunta sobre Energia */}
        {currentStep === 'energia' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-800">
              Qual é seu nível de energia?
            </h3>
            
            {/* Resumo da seleção anterior */}
            {selectedHumor && (
              <div className="bg-gray-50 p-3 rounded-lg border">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Smile className="w-4 h-4" />
                  <span>Humor: {humorOptions.find(h => h.value === selectedHumor)?.label}</span>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-3">
              {energiaOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleEnergiaSelect(option.value)}
                    className={`p-4 border rounded-lg transition-all duration-200 hover:scale-105 ${
                      selectedEnergia === option.value 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : ''
                    } ${option.bgColor} hover:shadow-md`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-6 h-6 ${option.color}`} />
                      <span className="font-medium text-gray-800">{option.label}</span>
                      <div className="ml-auto flex space-x-1">
                        {[...Array(option.value)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${option.color.replace('text-', 'bg-')}`} />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Resumo e Botão de Confirmação */}
        {canComplete && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Resumo do seu dia:</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <div className="flex items-center space-x-2">
                  <Smile className="w-4 h-4" />
                  <span>Humor: {humorOptions.find(h => h.value === selectedHumor)?.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Energia: {energiaOptions.find(e => e.value === selectedEnergia)?.label}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              Confirmar Check-in
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};