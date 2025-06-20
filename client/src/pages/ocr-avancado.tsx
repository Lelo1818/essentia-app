import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, CheckCircle, AlertCircle, Edit3, Save } from "lucide-react";

interface OcrResult {
  id: string;
  imagemUrl: string;
  dadosExtraidos: {
    valor: number;
    data: string;
    estabelecimento: string;
    itens: Array<{
      descricao: string;
      quantidade: number;
      valorUnitario: number;
      valorTotal: number;
      categoria?: string;
    }>;
  };
  categoriasSugeridas: string[];
  confianca: number;
  status: "processando" | "sucesso" | "erro" | "revisao";
  observacoes?: string;
}

export default function OcrAvancado() {
  const [resultados, setResultados] = useState<OcrResult[]>([]);
  const [processando, setProcessando] = useState(false);
  const [resultadoEditando, setResultadoEditando] = useState<string | null>(null);

  const simularOcr = () => {
    setProcessando(true);
    
    setTimeout(() => {
      const novoResultado: OcrResult = {
        id: Date.now().toString(),
        imagemUrl: "/api/placeholder/300/400",
        dadosExtraidos: {
          valor: 47.85,
          data: "2024-06-20",
          estabelecimento: "Supermercado Pão de Açúcar",
          itens: [
            {
              descricao: "Arroz Integral 1kg",
              quantidade: 2,
              valorUnitario: 8.90,
              valorTotal: 17.80,
              categoria: "Alimentação"
            },
            {
              descricao: "Frango Filé 1kg",
              quantidade: 1,
              valorUnitario: 18.90,
              valorTotal: 18.90,
              categoria: "Alimentação"
            },
            {
              descricao: "Detergente Ypê",
              quantidade: 1,
              valorUnitario: 2.15,
              valorTotal: 2.15,
              categoria: "Casa & Limpeza"
            },
            {
              descricao: "Café Pilão 500g",
              quantidade: 1,
              valorUnitario: 9.00,
              valorTotal: 9.00,
              categoria: "Alimentação"
            }
          ]
        },
        categoriasSugeridas: ["Alimentação", "Casa & Limpeza", "Supermercado"],
        confianca: 92,
        status: "sucesso"
      };
      
      setResultados(prev => [novoResultado, ...prev]);
      setProcessando(false);
    }, 3000);
  };

  const editarItem = (resultadoId: string, itemIndex: number, campo: string, valor: any) => {
    setResultados(prev => prev.map(resultado => {
      if (resultado.id === resultadoId) {
        const novosItens = [...resultado.dadosExtraidos.itens];
        novosItens[itemIndex] = {
          ...novosItens[itemIndex],
          [campo]: valor
        };
        return {
          ...resultado,
          dadosExtraidos: {
            ...resultado.dadosExtraidos,
            itens: novosItens
          }
        };
      }
      return resultado;
    }));
  };

  const aprovarResultado = (id: string) => {
    setResultados(prev => prev.map(r => 
      r.id === id ? { ...r, status: "sucesso" as const } : r
    ));
    setResultadoEditando(null);
    // Aqui salvaria no sistema principal
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sucesso": return "text-green-600 bg-green-100";
      case "erro": return "text-red-600 bg-red-100";
      case "processando": return "text-blue-600 bg-blue-100";
      case "revisao": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getConfiancaColor = (confianca: number) => {
    if (confianca >= 90) return "text-green-600";
    if (confianca >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">OCR Avançado</h1>
          <p className="text-gray-600">Registro automático de gastos por foto com IA</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={simularOcr} 
            disabled={processando}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Camera className="w-4 h-4 mr-2" />
            {processando ? "Processando..." : "Tirar Foto"}
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Arquivo
          </Button>
        </div>
      </div>

      {/* Instruções */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Como Funciona o OCR Inteligente</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>
              <strong>1. Capture</strong> - Tire foto do recibo ou nota fiscal
            </div>
            <div>
              <strong>2. IA Analisa</strong> - Extrai dados e categoriza automaticamente
            </div>
            <div>
              <strong>3. Confirme</strong> - Revise e aprove para adicionar aos gastos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados OCR */}
      <div className="space-y-4">
        {resultados.map((resultado) => (
          <Card key={resultado.id} className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📄</div>
                  <div>
                    <CardTitle>{resultado.dadosExtraidos.estabelecimento}</CardTitle>
                    <div className="text-sm text-gray-600">
                      {resultado.dadosExtraidos.data} • R$ {resultado.dadosExtraidos.valor.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(resultado.status)}`}>
                    {resultado.status === "sucesso" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {resultado.status === "erro" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {resultado.status === "sucesso" ? "Aprovado" : 
                     resultado.status === "erro" ? "Erro" : 
                     resultado.status === "processando" ? "Processando" : "Revisão"}
                  </Badge>
                  <div className={`text-sm font-semibold ${getConfiancaColor(resultado.confianca)}`}>
                    {resultado.confianca}% confiança
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Dados Básicos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Estabelecimento:</span>
                  <div className="font-medium">{resultado.dadosExtraidos.estabelecimento}</div>
                </div>
                <div>
                  <span className="text-gray-600">Data:</span>
                  <div className="font-medium">{resultado.dadosExtraidos.data}</div>
                </div>
                <div>
                  <span className="text-gray-600">Valor Total:</span>
                  <div className="font-medium text-green-600">R$ {resultado.dadosExtraidos.valor.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Itens:</span>
                  <div className="font-medium">{resultado.dadosExtraidos.itens.length} produtos</div>
                </div>
              </div>

              {/* Categorias Sugeridas */}
              <div>
                <div className="text-sm text-gray-600 mb-2">Categorias Identificadas:</div>
                <div className="flex flex-wrap gap-2">
                  {resultado.categoriasSugeridas.map((categoria, index) => (
                    <Badge key={index} variant="outline">
                      {categoria}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Itens Detalhados */}
              <div>
                <div className="text-sm text-gray-600 mb-2">Itens Identificados:</div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 grid grid-cols-5 text-sm font-medium text-gray-700">
                    <div>Item</div>
                    <div>Qtd</div>
                    <div>Valor Unit.</div>
                    <div>Total</div>
                    <div>Categoria</div>
                  </div>
                  {resultado.dadosExtraidos.itens.map((item, index) => (
                    <div key={index} className="px-4 py-2 grid grid-cols-5 text-sm border-t">
                      <div className="font-medium">{item.descricao}</div>
                      <div>{item.quantidade}</div>
                      <div>R$ {item.valorUnitario.toFixed(2)}</div>
                      <div className="font-medium">R$ {item.valorTotal.toFixed(2)}</div>
                      <div>
                        {resultadoEditando === resultado.id ? (
                          <Input
                            value={item.categoria || ""}
                            onChange={(e) => editarItem(resultado.id, index, "categoria", e.target.value)}
                            className="h-6 text-xs"
                            placeholder="Categoria"
                          />
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            {item.categoria || "Sem categoria"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {resultado.status !== "sucesso" && (
                    <>
                      {resultadoEditando === resultado.id ? (
                        <Button 
                          size="sm" 
                          onClick={() => aprovarResultado(resultado.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvar e Aprovar
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setResultadoEditando(resultado.id)}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        onClick={() => aprovarResultado(resultado.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                    </>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  Processado com Google Cloud Vision API
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {resultados.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="p-8 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum documento processado</h3>
            <p className="text-gray-600 mb-4">
              Tire uma foto de um recibo ou nota fiscal para começar
            </p>
            <Button onClick={simularOcr} className="bg-blue-600 hover:bg-blue-700">
              <Camera className="w-4 h-4 mr-2" />
              Tirar Primeira Foto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}