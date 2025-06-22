import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Clock, FileText, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestItem {
  id: string;
  category: string;
  name: string;
  status: 'pending' | 'testing' | 'passed' | 'failed';
  evidence?: string;
  notes?: string;
  critical: boolean;
}

export default function PainelValidacao() {
  const [tests, setTests] = useState<TestItem[]>([
    // Jornadas Críticas CEO
    { id: 'ceo_1', category: 'CEO', name: 'Meta Impossível → Ajuste Inteligente', status: 'pending', critical: true },
    { id: 'ceo_2', category: 'CEO', name: 'Comportamento → Recompensa Real', status: 'pending', critical: true },
    { id: 'ceo_3', category: 'CEO', name: 'Navegação Completa sem Quebras', status: 'pending', critical: true },
    { id: 'ceo_4', category: 'CEO', name: 'APIs Respondem em Tempo Real', status: 'pending', critical: true },
    { id: 'ceo_5', category: 'CEO', name: 'Sincronização entre Módulos', status: 'pending', critical: true },

    // Navegação e Interface
    { id: 'nav_1', category: 'Navegação', name: 'Menu Principal - Todos os Links', status: 'pending', critical: true },
    { id: 'nav_2', category: 'Navegação', name: 'Responsividade Mobile', status: 'pending', critical: true },
    { id: 'nav_3', category: 'Navegação', name: 'Performance de Carregamento', status: 'pending', critical: false },

    // Funcionalidades Core
    { id: 'core_1', category: 'Core', name: 'Sistema de Metas CRUD', status: 'pending', critical: true },
    { id: 'core_2', category: 'Core', name: 'Sistema de Conquistas', status: 'pending', critical: false },
    { id: 'core_3', category: 'Core', name: 'Sistema de Ofertas', status: 'pending', critical: false },
    { id: 'core_4', category: 'Core', name: 'Cashback por Mérito', status: 'pending', critical: false },

    // APIs e Integrações
    { id: 'api_1', category: 'APIs', name: 'APIs Dados Financeiros', status: 'pending', critical: true },
    { id: 'api_2', category: 'APIs', name: 'APIs de Validação', status: 'pending', critical: true },
    { id: 'api_3', category: 'APIs', name: 'APIs Comportamentais', status: 'pending', critical: false },

    // Fluxos Comportamentais
    { id: 'flow_1', category: 'Fluxos', name: 'Meta → Conquista → Oferta', status: 'pending', critical: false },
    { id: 'flow_2', category: 'Fluxos', name: 'Nível → Benefícios', status: 'pending', critical: false },
  ]);

  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const { toast } = useToast();

  const updateTestStatus = (testId: string, status: TestItem['status'], evidence?: string, testNotes?: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status, evidence, notes: testNotes }
        : test
    ));

    if (status === 'failed') {
      const test = tests.find(t => t.id === testId);
      if (test?.critical) {
        toast({
          title: "🚨 TESTE CRÍTICO FALHOU",
          description: `${test.name} - Entrega bloqueada`,
          variant: "destructive"
        });
      }
    }

    if (status === 'passed') {
      toast({
        title: "✅ Teste Aprovado",
        description: `${tests.find(t => t.id === testId)?.name}`,
      });
    }
  };

  const startTest = (testId: string) => {
    setCurrentTest(testId);
    updateTestStatus(testId, 'testing');
  };

  const completeTest = (testId: string, passed: boolean) => {
    updateTestStatus(testId, passed ? 'passed' : 'failed', '', notes);
    setCurrentTest(null);
    setNotes('');
  };

  const getStatusIcon = (status: TestItem['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'testing': return <Clock className="w-4 h-4 text-blue-600 animate-pulse" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: TestItem['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'testing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    const completed = tests.filter(t => t.status === 'passed' || t.status === 'failed').length;
    return (completed / tests.length) * 100;
  };

  const getCriticalFailures = () => {
    return tests.filter(t => t.critical && t.status === 'failed');
  };

  const categorizeTests = () => {
    return tests.reduce((acc, test) => {
      if (!acc[test.category]) acc[test.category] = [];
      acc[test.category].push(test);
      return acc;
    }, {} as Record<string, TestItem[]>);
  };

  const canDeliver = () => {
    const criticalFailures = getCriticalFailures();
    const coreTestsPassed = tests.filter(t => t.critical && t.status === 'passed').length;
    const totalCritical = tests.filter(t => t.critical).length;
    
    return criticalFailures.length === 0 && coreTestsPassed === totalCritical;
  };

  const categorizedTests = categorizeTests();
  const progress = calculateProgress();
  const criticalFailures = getCriticalFailures();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel de Validação Profissional</h1>
          <p className="text-gray-600">Protocolo completo de testes para entrega Flow</p>
        </div>
        <Badge className={canDeliver() ? "bg-green-600" : "bg-red-600"}>
          {canDeliver() ? "✅ LIBERADO PARA ENTREGA" : "🚨 BLOQUEADO"}
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Progresso Geral
            <span className="text-lg">{Math.round(progress)}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {tests.filter(t => t.status === 'passed').length}
              </div>
              <div className="text-sm text-gray-600">Aprovados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {tests.filter(t => t.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-600">Reprovados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {tests.filter(t => t.status === 'testing').length}
              </div>
              <div className="text-sm text-gray-600">Em Teste</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {tests.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Failures Alert */}
      {criticalFailures.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription>
            <strong>🚨 ENTREGA BLOQUEADA:</strong> {criticalFailures.length} teste(s) crítico(s) falharam.
            Corrija antes de prosseguir: {criticalFailures.map(t => t.name).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Test Categories */}
      {Object.entries(categorizedTests).map(([category, categoryTests]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {category === 'CEO' ? '🎯 ' : category === 'Navegação' ? '🧭 ' : 
               category === 'Core' ? '⚡ ' : category === 'APIs' ? '🔌 ' : '🔄 '} 
              {category}
              <Badge variant="outline">
                {categoryTests.filter(t => t.status === 'passed').length}/{categoryTests.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{test.name}</span>
                        {test.critical && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">CRÍTICO</Badge>
                        )}
                      </div>
                      {test.notes && (
                        <p className="text-sm text-gray-600 mt-1">{test.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status === 'pending' ? 'Pendente' :
                       test.status === 'testing' ? 'Testando' :
                       test.status === 'passed' ? 'Aprovado' : 'Reprovado'}
                    </Badge>
                    
                    {test.status === 'pending' && (
                      <Button size="sm" onClick={() => startTest(test.id)}>
                        Iniciar Teste
                      </Button>
                    )}
                    
                    {test.status === 'testing' && currentTest === test.id && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => completeTest(test.id, false)}>
                          Reprovar
                        </Button>
                        <Button size="sm" onClick={() => completeTest(test.id, true)}>
                          Aprovar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Test Notes */}
      {currentTest && (
        <Card>
          <CardHeader>
            <CardTitle>Anotações do Teste</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Descreva o que foi testado, problemas encontrados, evidências coletadas..."
              className="w-full h-24 p-3 border rounded-lg resize-none"
            />
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Gravar Evidência
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Relatório PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Marcar Entrega
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Alert>
        <AlertDescription>
          <strong>Instruções:</strong> Clique em "Iniciar Teste" para cada item. 
          Teste manualmente a funcionalidade, colete evidências (prints/vídeos) e 
          aprove/reprove baseado no resultado. Testes CRÍTICOS são obrigatórios para entrega.
        </AlertDescription>
      </Alert>
    </div>
  );
}