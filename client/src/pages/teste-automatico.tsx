import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Play, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AutoTest {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  result?: string;
  timing?: number;
  critical: boolean;
}

export default function TesteAutomatico() {
  const [tests, setTests] = useState<AutoTest[]>([
    { id: 'api_summary', name: 'API Financial Summary', status: 'pending', critical: true },
    { id: 'api_goals', name: 'API Goals Loading', status: 'pending', critical: true },
    { id: 'api_offers', name: 'API Real Offers', status: 'pending', critical: false },
    { id: 'api_validation', name: 'API Goal Validation', status: 'pending', critical: true },
    { id: 'api_achievements', name: 'API Achievements', status: 'pending', critical: false },
    { id: 'api_cashback', name: 'API Cashback Merit', status: 'pending', critical: false },
    { id: 'performance', name: 'Performance Test', status: 'pending', critical: true },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const { toast } = useToast();

  // Queries para testar APIs
  const { data: summary, isLoading: summaryLoading, error: summaryError } = useQuery({
    queryKey: ['/api/financial-summary'],
    enabled: false
  });

  const { data: goals, isLoading: goalsLoading, error: goalsError } = useQuery({
    queryKey: ['/api/goals'],
    enabled: false
  });

  const updateTestStatus = (testId: string, status: AutoTest['status'], result?: string, timing?: number) => {
    setTests(prev => prev.map(test => 
      test.id === testId ? { ...test, status, result, timing } : test
    ));
  };

  const runSingleTest = async (test: AutoTest): Promise<void> => {
    updateTestStatus(test.id, 'running');
    const startTime = performance.now();

    try {
      switch (test.id) {
        case 'api_summary':
          const summaryResponse = await fetch('/api/financial-summary');
          const summaryData = await summaryResponse.json();
          const summaryValid = summaryData.balance && summaryData.totalIncome && summaryData.totalExpenses;
          updateTestStatus(test.id, summaryValid ? 'passed' : 'failed', 
            summaryValid ? `Saldo: R$ ${summaryData.balance.toFixed(2)}` : 'Dados inválidos',
            performance.now() - startTime);
          break;

        case 'api_goals':
          const goalsResponse = await fetch('/api/goals');
          const goalsData = await goalsResponse.json();
          const goalsValid = Array.isArray(goalsData) && goalsData.length > 0;
          updateTestStatus(test.id, goalsValid ? 'passed' : 'failed',
            goalsValid ? `${goalsData.length} metas carregadas` : 'Sem metas',
            performance.now() - startTime);
          break;

        case 'api_offers':
          const offersResponse = await fetch('/api/real-offers');
          const offersData = await offersResponse.json();
          const offersValid = Array.isArray(offersData) && offersData.length > 0;
          updateTestStatus(test.id, offersValid ? 'passed' : 'failed',
            offersValid ? `${offersData.length} ofertas disponíveis` : 'Sem ofertas',
            performance.now() - startTime);
          break;

        case 'api_validation':
          const validationResponse = await fetch('/api/goals/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              targetAmount: 50000,
              targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
              category: "Teste"
            })
          });
          const validationData = await validationResponse.json();
          const validationValid = !validationData.valid && validationData.message;
          updateTestStatus(test.id, validationValid ? 'passed' : 'failed',
            validationValid ? 'Meta impossível rejeitada corretamente' : 'Validação falhou',
            performance.now() - startTime);
          break;

        case 'api_achievements':
          const achievementResponse = await fetch('/api/achievements/unlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ achievementId: "test", context: "automated_test" })
          });
          const achievementData = await achievementResponse.json();
          const achievementValid = achievementData.success && achievementData.achievement;
          updateTestStatus(test.id, achievementValid ? 'passed' : 'failed',
            achievementValid ? `+${achievementData.xpReward} XP` : 'Falha no sistema',
            performance.now() - startTime);
          break;

        case 'api_cashback':
          const cashbackResponse = await fetch('/api/cashback-merit');
          const cashbackData = await cashbackResponse.json();
          const cashbackValid = cashbackData.userLevel && cashbackData.cashbackRate;
          updateTestStatus(test.id, cashbackValid ? 'passed' : 'failed',
            cashbackValid ? `Nível ${cashbackData.userLevel} - ${cashbackData.cashbackRate.percentage}%` : 'Dados inválidos',
            performance.now() - startTime);
          break;

        case 'performance':
          const perfTests = [
            fetch('/api/financial-summary'),
            fetch('/api/goals'),
            fetch('/api/real-offers')
          ];
          const perfStartTime = performance.now();
          await Promise.all(perfTests);
          const totalTime = performance.now() - perfStartTime;
          const perfValid = totalTime < 3000;
          updateTestStatus(test.id, perfValid ? 'passed' : 'failed',
            `${Math.round(totalTime)}ms total`,
            totalTime);
          break;
      }
    } catch (error) {
      updateTestStatus(test.id, 'failed', `Erro: ${error}`, performance.now() - startTime);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    toast({
      title: "Iniciando Testes Automáticos",
      description: "Executando validação completa das APIs..."
    });

    for (let i = 0; i < tests.length; i++) {
      setCurrentTestIndex(i);
      await runSingleTest(tests[i]);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay entre testes
    }

    setIsRunning(false);
    setCurrentTestIndex(0);

    const passedTests = tests.filter(t => t.status === 'passed').length;
    const criticalFailures = tests.filter(t => t.critical && t.status === 'failed').length;

    toast({
      title: criticalFailures === 0 ? "Testes Concluídos" : "Problemas Críticos Detectados",
      description: `${passedTests}/${tests.length} testes aprovados`,
      variant: criticalFailures === 0 ? "default" : "destructive"
    });
  };

  const getStatusIcon = (status: AutoTest['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: AutoTest['status']) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    const completed = tests.filter(t => t.status === 'passed' || t.status === 'failed').length;
    return (completed / tests.length) * 100;
  };

  const progress = calculateProgress();
  const criticalFailures = tests.filter(t => t.critical && t.status === 'failed');
  const passedTests = tests.filter(t => t.status === 'passed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teste Automático - Validação Rápida</h1>
          <p className="text-gray-600">Execução automática dos testes principais do sistema</p>
        </div>
        <Button onClick={runAllTests} disabled={isRunning} className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          {isRunning ? 'Executando...' : 'Executar Todos os Testes'}
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Progresso dos Testes
            <span className="text-lg">{Math.round(progress)}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
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
                {tests.filter(t => t.status === 'running').length}
              </div>
              <div className="text-sm text-gray-600">Em Execução</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Failures */}
      {criticalFailures.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Problemas Críticos Detectados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalFailures.map(test => (
                <div key={test.id} className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium">{test.name}</span>
                  <span className="text-sm text-red-600">- {test.result}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados dos Testes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tests.map((test, index) => (
              <div key={test.id} className={`flex items-center justify-between p-3 border rounded-lg ${
                isRunning && index === currentTestIndex ? 'bg-blue-50 border-blue-200' : ''
              }`}>
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{test.name}</span>
                      {test.critical && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">CRÍTICO</Badge>
                      )}
                    </div>
                    {test.result && (
                      <p className="text-sm text-gray-600">{test.result}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(test.status)}>
                    {test.status === 'pending' ? 'Pendente' :
                     test.status === 'running' ? 'Executando' :
                     test.status === 'passed' ? 'Aprovado' : 'Reprovado'}
                  </Badge>
                  
                  {test.timing && (
                    <span className="text-xs text-gray-500">
                      {Math.round(test.timing)}ms
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {progress === 100 && (
        <Card className={criticalFailures.length === 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${criticalFailures.length === 0 ? 'text-green-600' : 'text-red-600'}`}>
                {criticalFailures.length === 0 ? '✅' : '❌'}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {criticalFailures.length === 0 ? 'Sistema Validado' : 'Problemas Detectados'}
              </h3>
              <p className="text-gray-600">
                {criticalFailures.length === 0 
                  ? `${passedTests}/${tests.length} testes aprovados. Sistema pronto para uso.`
                  : `${criticalFailures.length} teste(s) crítico(s) falharam. Correção necessária.`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}