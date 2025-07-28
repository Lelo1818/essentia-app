import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Calendar, Star, Lock, Check, Eye, Edit3 } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'positive' | 'neutral' | 'reflective' | 'challenging';
  tags: string[];
  insights: string[];
  isPrivate: boolean;
}

interface JournalingProProps {
  onComplete?: () => void;
}

export const JournalingPro = ({ onComplete }: JournalingProProps) => {
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood']>('neutral');
  const [viewEntry, setViewEntry] = useState<JournalEntry | null>(null);

  // Sample journal entries
  const [entries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2025-07-28',
      title: 'Reflexão sobre Propósito',
      content: 'Hoje tive uma revelação importante sobre minha jornada. Percebi que o autoconhecimento não é um destino, mas um caminho contínuo de descobertas...',
      mood: 'reflective',
      tags: ['propósito', 'autoconhecimento', 'crescimento'],
      insights: ['O crescimento é um processo contínuo', 'A clareza vem com a prática constante'],
      isPrivate: true
    },
    {
      id: '2',
      date: '2025-07-27',
      title: 'Gratidão e Energia',
      content: 'Que dia incrível! Senti uma energia renovada após completar os exercícios de respiração. A conexão com meu eu interior está cada vez mais forte...',
      mood: 'positive',
      tags: ['gratidão', 'energia', 'respiração'],
      insights: ['A respiração é uma ponte para o eu interior'],
      isPrivate: false
    },
    {
      id: '3',
      date: '2025-07-26',
      title: 'Desafios e Aprendizados',
      content: 'Enfrentei alguns obstáculos hoje, mas cada desafio trouxe uma lição valiosa. Estou aprendendo a ver as dificuldades como oportunidades de crescimento...',
      mood: 'challenging',
      tags: ['desafios', 'aprendizado', 'resiliência'],
      insights: ['Desafios são oportunidades disfarçadas'],
      isPrivate: true
    }
  ]);

  const moodColors = {
    positive: 'from-green-400 to-emerald-500',
    neutral: 'from-blue-400 to-cyan-500',
    reflective: 'from-purple-400 to-violet-500',
    challenging: 'from-orange-400 to-red-500'
  };

  const moodLabels = {
    positive: 'Positivo',
    neutral: 'Neutro',
    reflective: 'Reflexivo',
    challenging: 'Desafiador'
  };

  const handleStartWriting = () => {
    setIsWriting(true);
    setCurrentEntry('');
    setCurrentTitle('');
    setSelectedMood('neutral');
  };

  const handleSaveEntry = () => {
    if (currentEntry.trim() && currentTitle.trim()) {
      // Simulate saving entry
      console.log('Salvando entrada:', { title: currentTitle, content: currentEntry, mood: selectedMood });
      setIsWriting(false);
      onComplete?.();
    }
  };

  const todayEntries = entries.filter(entry => entry.date === '2025-07-28');
  const recentEntries = entries.filter(entry => entry.date !== '2025-07-28').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
            Diário Pessoal
          </CardTitle>
          <p className="text-center text-gray-600">
            Registre suas reflexões, insights e descobertas da jornada de autoconhecimento
          </p>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleStartWriting}>
          <CardContent className="p-6 text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
            <h3 className="font-semibold">Nova Entrada</h3>
            <p className="text-sm text-gray-600">Registre suas reflexões de hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold">{entries.length} Entradas</h3>
            <p className="text-sm text-gray-600">Total registrado</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-semibold">12 Insights</h3>
            <p className="text-sm text-gray-600">Descobertas importantes</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Entries */}
      {todayEntries.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Entradas de Hoje
          </h3>
          <div className="space-y-4">
            {todayEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${moodColors[entry.mood]}`}></div>
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                    </div>
                    <div className="flex space-x-2">
                      {entry.isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
                      <Badge variant="outline">{moodLabels[entry.mood]}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3 line-clamp-2">{entry.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {entry.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{entry.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setViewEntry(entry)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Entries */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
          Entradas Recentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{entry.title}</CardTitle>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${moodColors[entry.mood]}`}></div>
                </div>
                <p className="text-xs text-gray-500">{entry.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{entry.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {entry.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs"
                    onClick={() => setViewEntry(entry)}
                  >
                    Ler
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Writing Dialog */}
      <Dialog open={isWriting} onOpenChange={setIsWriting}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit3 className="w-5 h-5 mr-2" />
              Nova Entrada no Diário
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Título</label>
              <input
                type="text"
                placeholder="Como você resumiria este momento?"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Como você se sente?</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(moodLabels).map(([mood, label]) => (
                  <Button
                    key={mood}
                    variant={selectedMood === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMood(mood as JournalEntry['mood'])}
                    className={selectedMood === mood ? `bg-gradient-to-r ${moodColors[mood as keyof typeof moodColors]}` : ''}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Suas reflexões</label>
              <Textarea
                placeholder="O que você descobriu sobre si mesmo hoje? Quais insights surgiram? Como se sente em relação ao seu crescimento?"
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                className="min-h-[200px] resize-none"
                rows={8}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setIsWriting(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveEntry}
                disabled={!currentEntry.trim() || !currentTitle.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <Check className="w-4 h-4 mr-2" />
                Salvar Entrada
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Entry Dialog */}
      <Dialog open={!!viewEntry} onOpenChange={() => setViewEntry(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          {viewEntry && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{viewEntry.title}</span>
                  <Badge className={`bg-gradient-to-r ${moodColors[viewEntry.mood]}`}>
                    {moodLabels[viewEntry.mood]}
                  </Badge>
                </DialogTitle>
                <p className="text-sm text-gray-500">{viewEntry.date}</p>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 leading-relaxed">{viewEntry.content}</p>
                </div>
                
                {viewEntry.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {viewEntry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {viewEntry.insights.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Insights
                    </h4>
                    <ul className="space-y-1">
                      {viewEntry.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};