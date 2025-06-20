import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, BookOpen, Clock, Target, Trash2, 
  ArrowLeft, PlayCircle, CheckCircle, Calendar
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { LearningPath } from "../../../../../shared/schema-edu";

export default function LearningPaths() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();

  const { data: learningPaths = [], isLoading } = useQuery<LearningPath[]>({
    queryKey: ["/api/edu/learning-paths"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/edu/learning-paths/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/learning-paths"] });
      toast({ title: "Trilha excluída com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao excluir trilha", variant: "destructive" });
    }
  });

  const filteredPaths = learningPaths
    .filter((path) => {
      const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           path.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === "active") return matchesSearch && !path.isCompleted;
      if (filter === "completed") return matchesSearch && path.isCompleted;
      return matchesSearch;
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "Iniciante";
      case "intermediate": return "Intermediário";
      case "advanced": return "Avançado";
      default: return difficulty;
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Minhas Trilhas</h1>
            </div>
            
            <Link href="/criar-trilha">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Nova Trilha
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar trilhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            {[
              { key: "all", label: "Todas" },
              { key: "active", label: "Ativas" },
              { key: "completed", label: "Concluídas" }
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.key as typeof filter)}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{learningPaths.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Ativas</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {learningPaths.filter(p => !p.isCompleted).length}
                  </p>
                </div>
                <PlayCircle className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Concluídas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {learningPaths.filter(p => p.isCompleted).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Progresso Médio</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {learningPaths.length > 0 
                      ? Math.round(learningPaths.reduce((acc, p) => acc + p.progress, 0) / learningPaths.length)
                      : 0}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Paths Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{path.title}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {path.description}
                      </p>
                    </div>
                    {path.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {getDifficultyLabel(path.difficulty)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {path.targetDays} dias
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progresso</span>
                      <span className="text-sm font-medium">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(path.createdAt)}
                    </span>
                    <span className="capitalize">{path.subject}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/estudar/${path.id}`} className="flex-1">
                      <Button 
                        size="sm" 
                        className="w-full"
                        variant={path.isCompleted ? "outline" : "default"}
                      >
                        {path.isCompleted ? "Revisar" : "Continuar"}
                      </Button>
                    </Link>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteMutation.mutate(path.id)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "Nenhuma trilha encontrada" : "Nenhuma trilha ainda"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? "Tente buscar por outros termos ou criar uma nova trilha."
                  : "Comece sua jornada de aprendizado criando sua primeira trilha!"}
              </p>
              <Link href="/criar-trilha">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {searchTerm ? "Criar nova trilha" : "Criar primeira trilha"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}