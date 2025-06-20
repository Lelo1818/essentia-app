import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, Plus, FileText, Link2, Image, Mic, 
  Upload, Search, Trash2, Eye, Download, Brain
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserMaterial } from "../../../../../../shared/schema-edu";

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "text",
    content: "",
    url: "",
  });
  const { toast } = useToast();

  const { data: materials = [], isLoading } = useQuery<UserMaterial[]>({
    queryKey: ["/api/edu/materials"],
  });

  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: any) => {
      const response = await apiRequest("POST", "/api/edu/materials", {
        userId: 1,
        ...materialData,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/materials"] });
      setIsAddDialogOpen(false);
      setNewMaterial({ title: "", type: "text", content: "", url: "" });
      toast({ title: "Material adicionado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao adicionar material", variant: "destructive" });
    }
  });

  const deleteMaterialMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/edu/materials/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/materials"] });
      toast({ title: "Material excluído com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao excluir material", variant: "destructive" });
    }
  });

  const processMaterialMutation = useMutation({
    mutationFn: async (id: number) => {
      // Simulate processing
      const response = await apiRequest("PUT", `/api/edu/materials/${id}`, {
        processed: true,
        summary: "Material processado automaticamente pelo EDU. Resumo e exercícios gerados com base no conteúdo fornecido.",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/edu/materials"] });
      toast({ 
        title: "Material processado!", 
        description: "Resumos e exercícios foram gerados automaticamente." 
      });
    },
    onError: () => {
      toast({ title: "Erro ao processar material", variant: "destructive" });
    }
  });

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || material.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddMaterial = () => {
    if (!newMaterial.title.trim()) {
      toast({ title: "Título é obrigatório", variant: "destructive" });
      return;
    }

    createMaterialMutation.mutate(newMaterial);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="w-4 h-4" />;
      case "link": return <Link2 className="w-4 h-4" />;
      case "image": return <Image className="w-4 h-4" />;
      case "audio": return <Mic className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf": return "bg-red-100 text-red-800";
      case "link": return "bg-blue-100 text-blue-800";
      case "image": return "bg-green-100 text-green-800";
      case "audio": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "pdf": return "PDF";
      case "link": return "Link";
      case "image": return "Imagem";
      case "audio": return "Áudio";
      case "text": return "Texto";
      default: return type;
    }
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
              <h1 className="text-xl font-bold text-gray-900">Meus Materiais</h1>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Material
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Material</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <Input
                      placeholder="Nome do material..."
                      value={newMaterial.title}
                      onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo
                    </label>
                    <Select 
                      value={newMaterial.type} 
                      onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="image">Imagem</SelectItem>
                        <SelectItem value="audio">Áudio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newMaterial.type === "link" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL
                      </label>
                      <Input
                        placeholder="https://..."
                        value={newMaterial.url}
                        onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conteúdo/Descrição
                    </label>
                    <Textarea
                      placeholder="Descreva o conteúdo ou cole o texto..."
                      rows={4}
                      value={newMaterial.content}
                      onChange={(e) => setNewMaterial({ ...newMaterial, content: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddMaterial} disabled={createMaterialMutation.isPending}>
                      {createMaterialMutation.isPending ? "Adicionando..." : "Adicionar"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar materiais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="image">Imagem</SelectItem>
              <SelectItem value="audio">Áudio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Como funciona o processamento?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  O EDU transforma seus materiais em conteúdo ativo de aprendizado:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cria resumos automáticos</li>
                  <li>• Gera flashcards personalizados</li>
                  <li>• Produz quizzes adaptativos</li>
                  <li>• Converte texto em áudio narrado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 flex-1 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center space-x-2">
                        {getTypeIcon(material.type)}
                        <span className="line-clamp-1">{material.title}</span>
                      </CardTitle>
                      <Badge className={getTypeColor(material.type)}>
                        {getTypeLabel(material.type)}
                      </Badge>
                    </div>
                    {material.processed && (
                      <Badge className="bg-green-100 text-green-800">
                        Processado
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {material.content || "Sem descrição"}
                    </p>
                  </div>

                  {material.url && (
                    <div className="mb-4">
                      <a 
                        href={material.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Link2 className="w-3 h-3 mr-1" />
                        Abrir link
                      </a>
                    </div>
                  )}

                  {material.summary && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Resumo:</span> {material.summary}
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {!material.processed ? (
                      <Button
                        size="sm"
                        onClick={() => processMaterialMutation.mutate(material.id)}
                        disabled={processMaterialMutation.isPending}
                        className="flex-1"
                      >
                        <Brain className="w-3 h-3 mr-1" />
                        {processMaterialMutation.isPending ? "Processando..." : "Processar"}
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Ver Conteúdo
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteMaterialMutation.mutate(material.id)}
                      disabled={deleteMaterialMutation.isPending}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "Nenhum material encontrado" : "Nenhum material ainda"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? "Tente buscar por outros termos ou adicione um novo material."
                  : "Adicione seus materiais de estudo e transforme-os em conteúdo ativo!"}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {searchTerm ? "Adicionar novo material" : "Adicionar primeiro material"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}