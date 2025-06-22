import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertTriangle, Camera, Video, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestItem {
  id: string;
  category: 'CEO' | 'FUNCIONAL';
  name: string;
  description: string;
  status: 'pending' | 'testing' | 'passed' | 'failed';
  evidence: string;
  notes: string;
  critical: boolean;
  estimatedTime: string;
}

export default function ChecklistExecucao() {
  const [tests, setTests] = useState<TestItem[]>([
    // Testes CEO Críticos
    {
      id: 'ceo_behavior',
      category: 'CEO',
      name: 'Comportamento → Recompensa',
      description: 'Simular economia por 3 dias → XP → conquista → oferta',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: true,
      estimatedTime: '5 min'
    },
    {
      id: 'ceo_navigation',
      category: 'CEO', 
      name: 'Navegação Completa',
      description: 'Clicar em TODAS as abas do menu, verificar carregamento',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: true,
      estimatedTime: '4 min'
    },
    {
      id: 'ceo_mobile',
      category: 'CEO',
      name: 'APIs Mobile',
      description: 'Testar carregamento em dispositivo móvel',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: true,
      estimatedTime: '3 min'
    },
    {
      id: 'ceo_sync',
      category: 'CEO',
      name: 'Sincronização Módulos',
      description: 'Criar meta → verificar dashboard → confirmar tempo real',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: true,
      estimatedTime: '3 min'
    },

    // Testes Funcionais
    {
      id: 'func_menu',
      category: 'FUNCIONAL',
      name: 'Menu Responsivo',
      description: 'Desktop + Mobile + Tablet, todos os links',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: false,
      estimatedTime: '6 min'
    },
    {
      id: 'func_metas',
      category: 'FUNCIONAL',
      name: 'CRUD Metas',
      description: 'Criar, editar, deletar, calcular progresso',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: false,
      estimatedTime: '8 min'
    },
    {
      id: 'func_ofertas',
      category: 'FUNCIONAL',
      name: 'Sistema Ofertas',
      description: 'Carregamento, cupons, redirecionamento',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: false,
      estimatedTime: '5 min'
    },
    {
      id: 'func_conquistas',
      category: 'FUNCIONAL',
      name: 'Gamificação',
      description: 'XP, níveis, badges, notificações',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: false,
      estimatedTime: '6 min'
    },
    {
      id: 'func_cashback',
      category: 'FUNCIONAL',
      name: 'Cashback Mérito',
      description: 'Página completa, níveis, desafios',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: false,
      estimatedTime: '4 min'
    },
    {
      id: 'func_performance',
      category: 'FUNCIONAL',
      name: 'Performance',
      description: 'Todas as telas < 3s, console limpo',
      status: 'pending',
      evidence: '',
      notes: '',
      critical: false,
      estimatedTime: '5 min'
    }
  ]);

  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [evidenceText, setEvidenceText] = useState('');
  const [notesText, setNotesText] = useState('');
  const { toast } = useToast();

  const updateTest = (testId: string, status: TestItem['status'], evidence: string, notes: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId ? { ...test, status, evidence, notes } : test
    ));

    if (status === 'failed') {
      const test = tests.find(t => t.id === testId);
      if (test?.critical) {
        toast({
          title: "🚨 TESTE CRÍTICO FALHOU",
          description: "Execução bloqueada - correção necessária",
          variant: "destructive"
        });
      }
    }
  };

  const startTest = (testId: string) => {
    setActiveTest(testId);
    const test = tests.find(t => t.id === testId);
    setEvidenceText(test?.evidence || '');
    setNotesText(test?.notes || '');
    updateTest(testId, 'testing', '', '');
  };

  const completeTest = (testId: string, passed: boolean) => {
    updateTest(testId, passed ? 'passed' : 'failed', evidenceText, notesText);
    setActiveTest(null);
    setEvidenceText('');
    setNotesText('');
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

  const getCriticalFailures = () => tests.filter(t => t.critical && t.status === 'failed');
  const canDeliver = () => {
    const criticalPassed = tests.filter(t => t.critical && t.status === 'passed').length;
    const totalCritical = tests.filter(t => t.critical).length;
    return criticalPassed === totalCritical && getCriticalFailures().length === 0;
  };

  const ceoTests = tests.filter(t => t.category === 'CEO');
  const funcTests = tests.filter(t => t.category === 'FUNCIONAL');
  const progress = calculateProgress();
  const criticalFailures = getCriticalFailures();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Checklist de Execução Manual</h1>
          <p className="text-gray-600">Testes críticos obrigatórios para liberação final</p>
        </div>
        <Badge className={canDeliver() ? "bg-green-600" : "bg-red-600"}>
          {canDeliver() ? "✅ LIBERADO" : "🚨 BLOQUEADO"}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso da Execução</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <div className="grid grid-cols-4 gap-4 text-center">
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

      {/* Critical Failures */}
      {criticalFailures.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 EXECUÇÃO BLOQUEADA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-3">
              Testes críticos falharam. Correção obrigatória antes de continuar.
            </p>
            <div className="space-y-2">
              {criticalFailures.map(test => (
                <div key={test.id} className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium">{test.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CEO Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            🎯 Testes CEO (Críticos)
            <Badge variant="outline">
              {ceoTests.filter(t => t.status === 'passed').length}/{ceoTests.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ceoTests.map(test => (
              <div key={test.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{test.name}</span>
                        <Badge className="bg-red-100 text-red-800 text-xs">CRÍTICO</Badge>
                        <Badge variant="outline" className="text-xs">{test.estimatedTime}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(test.status)}>
                    {test.status === 'pending' ? 'Pendente' :
                     test.status === 'testing' ? 'Testando' :
                     test.status === 'passed' ? 'Aprovado' : 'Reprovado'}
                  </Badge>
                </div>

                {test.status === 'pending' && (
                  <Button size="sm" onClick={() => startTest(test.id)}>
                    Iniciar Teste
                  </Button>
                )}

                {test.status === 'testing' && activeTest === test.id && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium">Evidência Coletada:</label>
                      <Textarea
                        value={evidenceText}
                        onChange={(e) => setEvidenceText(e.target.value)}
                        placeholder="Descreva a evidência: screenshots, vídeos, resultados..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Observações:</label>
                      <Textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        placeholder="Problemas encontrados, comportamento observado..."
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => completeTest(test.id, false)}>
                        Reprovar
                      </Button>
                      <Button size="sm" onClick={() => completeTest(test.id, true)}>
                        Aprovar
                      </Button>
                    </div>
                  </div>
                )}

                {(test.status === 'passed' || test.status === 'failed') && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                    {test.evidence && (
                      <div className="mb-2">
                        <strong>Evidência:</strong> {test.evidence}
                      </div>
                    )}
                    {test.notes && (
                      <div>
                        <strong>Observações:</strong> {test.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Functional Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            🔧 Testes Funcionais
            <Badge variant="outline">
              {funcTests.filter(t => t.status === 'passed').length}/{funcTests.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funcTests.map(test => (
              <div key={test.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{test.name}</span>
                        <Badge variant="outline" className="text-xs">{test.estimatedTime}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status === 'pending' ? 'Pendente' :
                       test.status === 'testing' ? 'Testando' :
                       test.status === 'passed' ? 'Aprovado' : 'Reprovado'}
                    </Badge>
                    {test.status === 'pending' && (
                      <Button size="sm" variant="outline" onClick={() => startTest(test.id)}>
                        Iniciar
                      </Button>
                    )}
                  </div>
                </div>

                {test.status === 'testing' && activeTest === test.id && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium">Evidência:</label>
                      <Textarea
                        value={evidenceText}
                        onChange={(e) => setEvidenceText(e.target.value)}
                        placeholder="Screenshots, resultados de teste..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Notas:</label>
                      <Textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        placeholder="Observações sobre o teste..."
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => completeTest(test.id, false)}>
                        Reprovar
                      </Button>
                      <Button size="sm" onClick={() => completeTest(test.id, true)}>
                        Aprovar
                      </Button>
                    </div>
                  </div>
                )}

                {(test.status === 'passed' || test.status === 'failed') && test.evidence && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                    <strong>Evidência:</strong> {test.evidence}
                    {test.notes && (
                      <div className="mt-1">
                        <strong>Notas:</strong> {test.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Resumo de Evidências
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Screenshots Necessários:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Dashboard desktop e mobile</li>
                <li>• Páginas principais carregadas</li>
                <li>• Sistema de metas funcionando</li>
                <li>• DevTools performance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Vídeos Necessários:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Navegação completa (1 min)</li>
                <li>• Fluxo comportamental (2 min)</li>
                <li>• Interface mobile (30s)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}