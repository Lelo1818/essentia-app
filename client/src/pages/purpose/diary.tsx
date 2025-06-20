import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Plus, Edit, Heart, Calendar, Tag } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDateRelative } from "@/lib/purpose-utils";
import { MOOD_OPTIONS, TAG_SUGGESTIONS } from "@/types/purpose";
import type { DiaryEntry } from "@/types/purpose";

export default function Diary() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading } = useQuery<DiaryEntry[]>({
    queryKey: ["/api/purpose/diary"],
  });

  const createEntryMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/purpose/diary", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/diary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/profile"] });
      resetForm();
      setIsCreateOpen(false);
      toast({ title: "Entrada salva!", description: "Suas reflexões foram registradas no diário." });
    },
    onError: (error) => {
      console.error("Erro ao criar entrada:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível salvar a entrada. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const updateEntryMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const response = await apiRequest("PUT", `/api/purpose/diary/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/diary"] });
      resetForm();
      setEditingEntry(null);
      toast({ title: "Entrada atualizada!", description: "Suas mudanças foram salvas." });
    }
  });

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("");
    setSelectedTags([]);
    setCustomTag("");
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    const entryData = {
      title: title.trim(),
      content: content.trim(),
      mood: mood || null,
      tags: selectedTags,
      isPrivate: true
    };

    if (editingEntry) {
      updateEntryMutation.mutate({ id: editingEntry.id, ...entryData });
    } else {
      createEntryMutation.mutate(entryData);
    }
  };

  const startEditing = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood || "");
    setSelectedTags(entry.tags || []);
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const addSuggestedTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getMoodEmoji = (moodValue: string) => {
    const mood = MOOD_OPTIONS.find(m => m.value === moodValue);
    return mood?.emoji || "💭";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando suas reflexões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Diário Pessoal</h1>
          <p className="text-lg text-gray-600">
            Um espaço sagrado para suas reflexões, descobertas e jornada interior.
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-purple-600" />
                {editingEntry ? "Editar Entrada" : "Nova Entrada do Diário"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Como me sinto hoje..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de espírito
                </label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Como você está se sentindo?" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOOD_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.emoji} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suas reflexões
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escreva livremente sobre seus pensamentos, sentimentos, descobertas e insights..."
                  className="min-h-[200px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      placeholder="Adicionar tag personalizada..."
                      onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                    />
                    <Button onClick={addCustomTag} variant="outline" size="sm">
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Sugestões:</p>
                    <div className="flex flex-wrap gap-2">
                      {TAG_SUGGESTIONS.filter(tag => !selectedTags.includes(tag)).slice(0, 8).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-purple-50"
                          onClick={() => addSuggestedTag(tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!title.trim() || !content.trim() || createEntryMutation.isPending || updateEntryMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {editingEntry ? "Atualizar" : "Salvar"} Entrada
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setEditingEntry(null);
                    setIsCreateOpen(false);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {entries.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Seu diário está esperando</h3>
            <p className="text-gray-600 mb-6">
              Comece sua jornada de autoconhecimento escrevendo sua primeira reflexão.
            </p>
            <Button 
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Primeira Entrada
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <Card key={entry.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1 line-clamp-2">{entry.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDateRelative(entry.createdAt)}
                    </div>
                  </div>
                  {entry.mood && (
                    <span className="text-2xl ml-2">
                      {getMoodEmoji(entry.mood)}
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-700 line-clamp-4 mb-4">
                  {entry.content}
                </p>
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {entry.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{entry.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startEditing(entry)}
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-purple-600" />
                        Editar Entrada
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título
                        </label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Como me sinto hoje..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado de espírito
                        </label>
                        <Select value={mood} onValueChange={setMood}>
                          <SelectTrigger>
                            <SelectValue placeholder="Como você está se sentindo?" />
                          </SelectTrigger>
                          <SelectContent>
                            {MOOD_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.emoji} {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Suas reflexões
                        </label>
                        <Textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="min-h-[200px]"
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={handleSubmit}
                          disabled={!title.trim() || !content.trim() || updateEntryMutation.isPending}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Atualizar Entrada
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            resetForm();
                            setEditingEntry(null);
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}