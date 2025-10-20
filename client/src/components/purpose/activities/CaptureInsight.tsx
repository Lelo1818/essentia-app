import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, CheckCircle, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CaptureInsightProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function CaptureInsight({ open, onClose, onComplete }: CaptureInsightProps) {
  const [title, setTitle] = useState('');
  const [insight, setInsight] = useState('');
  const [category, setCategory] = useState('');
  const [completed, setCompleted] = useState(false);

  const categories = [
    { value: 'fisico', label: 'Físico - Corpo e Saúde' },
    { value: 'energetico', label: 'Energético - Vitalidade e Emoções' },
    { value: 'mental', label: 'Mental - Pensamentos e Clareza' },
    { value: 'espiritual', label: 'Espiritual - Propósito e Conexão' }
  ];

  const insightPrompts = [
    "O que descobri sobre mim hoje?",
    "Que padrão percebi no meu comportamento?",
    "Qual verdade interna surgiu?",
    "O que aprendi nesta experiência?",
    "Que crença limitante identifiquei?"
  ];

  const handleSave = () => {
    if (title.trim() && insight.trim() && category) {
      setCompleted(true);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    setTitle('');
    setInsight('');
    setCategory('');
    setCompleted(false);
  };

  const handleClose = () => {
    onClose();
    setTitle('');
    setInsight('');
    setCategory('');
    setCompleted(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-capture-insight">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Capturar Insight
          </DialogTitle>
        </DialogHeader>

        {!completed ? (
          <div className="space-y-6 py-4">
            {/* Prompts Inspiradores */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Questões para reflexão:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {insightPrompts.slice(0, 3).map((prompt, idx) => (
                      <li key={idx}>• {prompt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Título do Insight */}
            <div className="space-y-2">
              <Label htmlFor="insight-title">
                Dê um título ao seu insight
              </Label>
              <Input
                id="insight-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Percepção sobre meu medo de falhar"
                data-testid="input-insight-title"
              />
            </div>

            {/* Categoria FEME */}
            <div className="space-y-2">
              <Label htmlFor="insight-category">
                Dimensão FEME relacionada
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="insight-category" data-testid="select-insight-category">
                  <SelectValue placeholder="Selecione uma dimensão" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Descrição do Insight */}
            <div className="space-y-2">
              <Label htmlFor="insight-description">
                Descreva sua descoberta
              </Label>
              <Textarea
                id="insight-description"
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                placeholder="Escreva livremente sobre o que você percebeu, sentiu ou compreendeu..."
                className="min-h-[150px] resize-none"
                data-testid="textarea-insight-description"
              />
              <p className="text-xs text-gray-500">
                {insight.length} caracteres
              </p>
            </div>

            {/* Botões */}
            <div className="flex space-x-3">
              <Button 
                onClick={handleClose}
                variant="outline"
                className="flex-1"
                data-testid="button-insight-cancel"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!title.trim() || !insight.trim() || !category}
                className="flex-1"
                data-testid="button-insight-save"
              >
                Salvar Insight
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Insight Capturado!</h3>
              <p className="text-gray-600">
                "{title}" foi salvo no seu diário de insights.
                <br />
                Continue observando e registrando suas descobertas.
                <br />
                <span className="text-green-600 font-medium">+15 pontos ganhos</span>
              </p>
            </div>
            <Button onClick={handleComplete} size="lg" className="w-full" data-testid="button-complete-insight">
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
