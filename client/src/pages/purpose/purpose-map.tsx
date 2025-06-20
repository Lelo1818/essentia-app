import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Map, Heart, Star, Lightbulb, Target, Eye, Plus, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { validatePurposeMapCompletion } from "@/lib/purpose-utils";
import type { PurposeMap } from "@/types/purpose";

export default function PurposeMapPage() {
  const [values, setValues] = useState<string[]>([]);
  const [passions, setPassions] = useState<string[]>([]);
  const [talents, setTalents] = useState<string[]>([]);
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newPassion, setNewPassion] = useState("");
  const [newTalent, setNewTalent] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: purposeMap, isLoading } = useQuery<PurposeMap>({
    queryKey: ["/api/purpose/purpose-map"],
  });

  const savePurposeMapMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/purpose/purpose-map", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/purpose-map"] });
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/profile"] });
      toast({ title: "Mapa salvo!", description: "Seu mapa do propósito foi atualizado." });
    },
    onError: (error) => {
      console.error("Erro ao salvar mapa:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível salvar o mapa. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (purposeMap) {
      setValues((purposeMap.values as string[]) || []);
      setPassions((purposeMap.passions as string[]) || []);
      setTalents((purposeMap.talents as string[]) || []);
      setMission(purposeMap.mission || "");
      setVision(purposeMap.vision || "");
    }
  }, [purposeMap]);

  const addValue = () => {
    if (newValue.trim() && !values.includes(newValue.trim()) && values.length < 8) {
      setValues([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (value: string) => {
    setValues(values.filter(v => v !== value));
  };

  const addPassion = () => {
    if (newPassion.trim() && !passions.includes(newPassion.trim()) && passions.length < 8) {
      setPassions([...passions, newPassion.trim()]);
      setNewPassion("");
    }
  };

  const removePassion = (passion: string) => {
    setPassions(passions.filter(p => p !== passion));
  };

  const addTalent = () => {
    if (newTalent.trim() && !talents.includes(newTalent.trim()) && talents.length < 8) {
      setTalents([...talents, newTalent.trim()]);
      setNewTalent("");
    }
  };

  const removeTalent = (talent: string) => {
    setTalents(talents.filter(t => t !== talent));
  };

  const savePurposeMap = () => {
    savePurposeMapMutation.mutate({
      values,
      passions,
      talents,
      mission: mission.trim() || null,
      vision: vision.trim() || null
    });
  };

  const currentData = { values, passions, talents, mission, vision };
  const completion = validatePurposeMapCompletion(currentData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu mapa do propósito...</p>
        </div>
      </div>
    );
  }

  const valuesSuggestions = [
    "Autenticidade", "Compaixão", "Crescimento", "Liberdade", "Justiça",
    "Criatividade", "Família", "Sabedoria", "Coragem", "Paz"
  ];

  const passionsSuggestions = [
    "Ensinar", "Criar", "Ajudar pessoas", "Arte", "Natureza",
    "Música", "Escritura", "Viagens", "Cozinhar", "Aprender"
  ];

  const talentsSuggestions = [
    "Comunicação", "Empatia", "Organização", "Liderança", "Criatividade",
    "Análise", "Intuição", "Paciência", "Resolução de problemas", "Inspirar outros"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mapa do Propósito</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Crie um mapa visual da sua essência: valores, paixões, talentos, missão e visão.
        </p>
        
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Progresso do Mapa</span>
              <span className="text-sm text-gray-600">
                {completion.completedSections}/{completion.totalSections}
              </span>
            </div>
            <Progress 
              value={(completion.completedSections / completion.totalSections) * 100} 
              className="h-3 mb-2" 
            />
            {completion.isComplete && (
              <p className="text-sm text-green-600 font-medium">
                Mapa completo! Você tem uma visão clara do seu propósito.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Valores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Valores Fundamentais
            </CardTitle>
            <p className="text-sm text-gray-600">
              Princípios que guiam suas decisões e definem quem você é.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Ex: Autenticidade, Compaixão..."
                onKeyPress={(e) => e.key === 'Enter' && addValue()}
              />
              <Button onClick={addValue} size="sm" disabled={values.length >= 8}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {values.map((value) => (
                <Badge 
                  key={value} 
                  className="bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                  onClick={() => removeValue(value)}
                >
                  {value} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-2">Sugestões:</p>
              <div className="flex flex-wrap gap-1">
                {valuesSuggestions
                  .filter(suggestion => !values.includes(suggestion))
                  .slice(0, 6)
                  .map((suggestion) => (
                  <Badge 
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-red-50 text-xs"
                    onClick={() => {
                      if (values.length < 8) {
                        setValues([...values, suggestion]);
                      }
                    }}
                  >
                    + {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paixões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Paixões Naturais
            </CardTitle>
            <p className="text-sm text-gray-600">
              Atividades que despertam alegria e energia em você.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newPassion}
                onChange={(e) => setNewPassion(e.target.value)}
                placeholder="Ex: Ensinar, Criar, Ajudar..."
                onKeyPress={(e) => e.key === 'Enter' && addPassion()}
              />
              <Button onClick={addPassion} size="sm" disabled={passions.length >= 8}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {passions.map((passion) => (
                <Badge 
                  key={passion} 
                  className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer"
                  onClick={() => removePassion(passion)}
                >
                  {passion} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-2">Sugestões:</p>
              <div className="flex flex-wrap gap-1">
                {passionsSuggestions
                  .filter(suggestion => !passions.includes(suggestion))
                  .slice(0, 6)
                  .map((suggestion) => (
                  <Badge 
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-yellow-50 text-xs"
                    onClick={() => {
                      if (passions.length < 8) {
                        setPassions([...passions, suggestion]);
                      }
                    }}
                  >
                    + {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Talentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
              Talentos Únicos
            </CardTitle>
            <p className="text-sm text-gray-600">
              Habilidades naturais e competências que você desenvolveu.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTalent}
                onChange={(e) => setNewTalent(e.target.value)}
                placeholder="Ex: Comunicação, Empatia..."
                onKeyPress={(e) => e.key === 'Enter' && addTalent()}
              />
              <Button onClick={addTalent} size="sm" disabled={talents.length >= 8}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {talents.map((talent) => (
                <Badge 
                  key={talent} 
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                  onClick={() => removeTalent(talent)}
                >
                  {talent} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-2">Sugestões:</p>
              <div className="flex flex-wrap gap-1">
                {talentsSuggestions
                  .filter(suggestion => !talents.includes(suggestion))
                  .slice(0, 6)
                  .map((suggestion) => (
                  <Badge 
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 text-xs"
                    onClick={() => {
                      if (talents.length < 8) {
                        setTalents([...talents, suggestion]);
                      }
                    }}
                  >
                    + {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missão e Visão */}
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-500" />
              Missão Pessoal
            </CardTitle>
            <p className="text-sm text-gray-600">
              Seu propósito de vida em uma declaração clara e inspiradora.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Ex: Minha missão é inspirar pessoas a descobrirem seu potencial autêntico através da compaixão e da sabedoria prática..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-purple-500" />
              Visão de Futuro
            </CardTitle>
            <p className="text-sm text-gray-600">
              Como você vê sua vida e impacto daqui a 5-10 anos.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Ex: Vejo-me como uma pessoa realizada, vivendo autenticamente e contribuindo para um mundo mais compassivo..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={savePurposeMap}
          disabled={savePurposeMapMutation.isPending}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg"
        >
          <Map className="w-5 h-5 mr-2" />
          Salvar Mapa do Propósito
        </Button>
      </div>

      {completion.isComplete && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Parabéns! Seu Mapa do Propósito está completo!
            </h3>
            <p className="text-green-700">
              Você agora tem uma visão clara dos seus valores, paixões, talentos, missão e visão. 
              Use este mapa como guia para tomar decisões alinhadas com sua essência verdadeira.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}