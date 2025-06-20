import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mic, Brain, Lightbulb } from "lucide-react";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { useState } from "react";

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Olá! Sou seu coach financeiro pessoal. Notei que você gastou 20% a mais com delivery esta semana. Que tal conversarmos sobre isso?",
      timestamp: "Agora"
    },
    {
      type: "user", 
      text: "Realmente estava trabalhando muito e acabei pedindo mais comida",
      timestamp: "Há 2 min"
    },
    {
      type: "ai",
      text: "Entendo perfeitamente! Trabalho intenso pode afetar nossos hábitos. Vou sugerir algumas refeições rápidas e econômicas para suas próximas semanas intensas. Que tal?",
      timestamp: "Há 1 min"
    }
  ]);

  return (
    <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center text-indigo-800">
          <Brain className="w-5 h-5 mr-2" />
          Coach IA 24/7 (FUTURO)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-xs ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div>{message.text}</div>
                  <div className="text-xs opacity-75 mt-1">{message.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <InteractiveButton className="text-xs" variant="outline" soundType="click">
              <MessageCircle className="w-3 h-3 mr-1" />
              Chat por Texto
            </InteractiveButton>
            <InteractiveButton className="text-xs" variant="outline" soundType="click">
              <Mic className="w-3 h-3 mr-1" />
              Comando de Voz
            </InteractiveButton>
          </div>
          
          <div className="bg-indigo-50 p-2 rounded text-xs">
            <div className="flex items-center text-indigo-700 mb-1">
              <Lightbulb className="w-3 h-3 mr-1" />
              <strong>Insights Personalizados:</strong>
            </div>
            <ul className="text-indigo-600 space-y-1 text-xs">
              <li>• Detecta padrões emocionais de gastos</li>
              <li>• Oferece suporte psicológico financeiro</li>
              <li>• Adapta linguagem ao seu perfil</li>
              <li>• Disponível 24/7 via chat ou voz</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}