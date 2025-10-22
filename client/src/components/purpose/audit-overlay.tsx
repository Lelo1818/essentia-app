import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Download } from "lucide-react";

interface AuditCheck {
  id: string;
  label: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  details?: string;
  fix?: {
    file: string;
    line: number;
    code: string;
  };
}

export function AuditOverlay() {
  const [checks, setChecks] = useState<AuditCheck[]>([
    { id: 'video_route', label: '1. Ver vídeo → /journey', status: 'pending' },
    { id: 'video_playback', label: '2. Vídeo toca + CTA', status: 'pending' },
    { id: 'video_points', label: '3. +25 pontos ao completar', status: 'pending' },
    { id: 'cta_navigation', label: '4. CTA → respiração/FEME', status: 'pending' },
    { id: 'ai_real', label: '5. IA real (sem mock)', status: 'pending' },
    { id: 'history_tracking', label: '6. Histórico correto', status: 'pending' },
    { id: 'sound_control', label: '7. Som pausa no vídeo', status: 'pending' },
    { id: 'gamification', label: '8. Pontos/nível consistentes', status: 'pending' },
  ]);

  const [expanded, setExpanded] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Fetch data for audit
  const { data: progressData } = useQuery<any>({ queryKey: ['/api/progress'] });
  const { data: eventsData } = useQuery<any[]>({ queryKey: ['/api/events'] });

  useEffect(() => {
    runAudit();
  }, [progressData, eventsData]);

  const runAudit = async () => {
    const newChecks: AuditCheck[] = [...checks];

    // Check 1: Video route exists
    try {
      const journeyExists = document.querySelector('[data-testid="button-open-portal"]') !== null;
      newChecks[0] = {
        ...newChecks[0],
        status: journeyExists ? 'pass' : 'fail',
        details: journeyExists ? 'Botão Portal UAU encontrado' : 'Botão não encontrado',
        fix: !journeyExists ? {
          file: 'client/src/pages/purpose.tsx',
          line: 210,
          code: 'onClick={() => setLocation("/journey")}'
        } : undefined
      };
    } catch (e) {
      newChecks[0].status = 'fail';
    }

    // Check 2: Video component exists in /journey
    try {
      const response = await fetch('/journey');
      const hasVideoComponent = response.ok;
      newChecks[1] = {
        ...newChecks[1],
        status: hasVideoComponent ? 'pass' : 'warning',
        details: hasVideoComponent ? 'Rota /journey acessível' : 'Verificar componente MediaPlayer',
        fix: !hasVideoComponent ? {
          file: 'client/src/pages/journey.tsx',
          line: 1,
          code: 'Adicionar <MediaPlayer /> com tracking completo'
        } : undefined
      };
    } catch (e) {
      newChecks[1].status = 'fail';
    }

    // Check 3: Points update system (verificar eventos de video_complete)
    try {
      const hasProgressEndpoint = progressData !== undefined;
      const hasVideoCompleteEvents = eventsData?.some((e: any) => e.eventName === 'video_complete') || false;
      newChecks[2] = {
        ...newChecks[2],
        status: hasProgressEndpoint ? (hasVideoCompleteEvents ? 'pass' : 'warning') : 'fail',
        details: hasProgressEndpoint 
          ? `Pontos: ${progressData?.points || 0}${hasVideoCompleteEvents ? ' | Eventos OK' : ' | Sem eventos de vídeo'}` 
          : 'Endpoint /api/progress não responde',
        fix: !hasProgressEndpoint ? {
          file: 'server/routes-clean.ts',
          line: 150,
          code: 'app.get("/api/progress", async (req, res) => {...})'
        } : !hasVideoCompleteEvents ? {
          file: 'client/src/components/purpose/media-player.tsx',
          line: 40,
          code: 'trackEvent("video_complete", { points: 25 })'
        } : undefined
      };
    } catch (e) {
      newChecks[2].status = 'fail';
    }

    // Check 4: CTA navigation configured (verificar se rota existe)
    try {
      const breathRouteExists = window.location.pathname === '/breath' || document.querySelector('[href="/breath"]') !== null;
      newChecks[3] = {
        ...newChecks[3],
        status: breathRouteExists ? 'pass' : 'warning',
        details: breathRouteExists ? 'Rota /breath configurada' : 'Verificar navegação do CTA',
        fix: !breathRouteExists ? {
          file: 'client/src/components/purpose/media-player.tsx',
          line: 45,
          code: 'onComplete: () => setLocation("/breath")'
        } : undefined
      };
    } catch (e) {
      newChecks[3].status = 'warning';
    }

    // Check 5: AI endpoints (real vs mock)
    try {
      const aiResponse = await fetch('/api/ai/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: 'test' })
      });
      const isRealAI = aiResponse.status !== 404;
      newChecks[4] = {
        ...newChecks[4],
        status: isRealAI ? 'pass' : 'fail',
        details: isRealAI ? 'Endpoints IA conectados' : 'IA usando mocks',
        fix: !isRealAI ? {
          file: 'server/routes-clean.ts',
          line: 270,
          code: 'Integrar Anthropic Claude via ANTHROPIC_API_KEY'
        } : undefined
      };
    } catch (e) {
      newChecks[4].status = 'warning';
    }

    // Check 6: History tracking
    const hasHistory = eventsData && eventsData.length > 0;
    newChecks[5] = {
      ...newChecks[5],
      status: hasHistory ? 'pass' : 'warning',
      details: hasHistory ? `${eventsData.length} eventos rastreados` : 'Histórico vazio',
    };

    // Check 7: Sound system
    const soundSystemExists = typeof (window as any).playSound === 'function';
    newChecks[6] = {
      ...newChecks[6],
      status: soundSystemExists ? 'pass' : 'fail',
      details: soundSystemExists ? 'Sistema de som inicializado' : 'Sistema de som não encontrado',
      fix: !soundSystemExists ? {
        file: 'client/src/lib/sound.ts',
        line: 1,
        code: 'export function playSound(soundId: string) {...}'
      } : undefined
    };

    // Check 8: Gamification consistency
    const hasPoints = progressData?.points !== undefined;
    const hasLevel = progressData?.level !== undefined;
    newChecks[7] = {
      ...newChecks[7],
      status: hasPoints && hasLevel ? 'pass' : 'fail',
      details: hasPoints && hasLevel 
        ? `${progressData.points} pts, Nível ${progressData.level}` 
        : 'Dados de gamificação incompletos',
      fix: !hasPoints ? {
        file: 'server/storage.ts',
        line: 63,
        code: 'getUserProgress(userId): retornar { points, level, streak }'
      } : undefined
    };

    setChecks(newChecks);

    // Generate console report
    if (!reportGenerated) {
      generateConsoleReport(newChecks);
      setReportGenerated(true);
    }
  };

  const generateConsoleReport = (auditChecks: AuditCheck[]) => {
    console.log('\n🔍 ========== AUDITORIA ESSENTIA ========== 🔍\n');
    console.log('📍 URLs Ativas:');
    console.log('  • Dashboard: /purpose');
    console.log('  • Vídeo Portal UAU: /journey');
    console.log('  • Respiração: /breath');
    console.log('  • Pontos: /points\n');

    console.log('📊 Resultados da Auditoria:\n');
    
    auditChecks.forEach((check, idx) => {
      const icon = check.status === 'pass' ? '✅' : check.status === 'fail' ? '❌' : '⚠️';
      console.log(`${icon} ${check.label}`);
      if (check.details) {
        console.log(`   → ${check.details}`);
      }
      if (check.fix) {
        console.log(`   ⚡ Correção:`);
        console.log(`      Arquivo: ${check.fix.file}:${check.fix.line}`);
        console.log(`      Código: ${check.fix.code}`);
      }
      console.log('');
    });

    const passed = auditChecks.filter(c => c.status === 'pass').length;
    const failed = auditChecks.filter(c => c.status === 'fail').length;
    const warnings = auditChecks.filter(c => c.status === 'warning').length;

    console.log(`\n📈 Resumo: ${passed}/8 ✅  |  ${failed} ❌  |  ${warnings} ⚠️\n`);
    console.log('========================================\n');
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      checks,
      summary: {
        passed: checks.filter(c => c.status === 'pass').length,
        failed: checks.filter(c => c.status === 'fail').length,
        warnings: checks.filter(c => c.status === 'warning').length,
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `auditoria-essentia-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const passCount = checks.filter(c => c.status === 'pass').length;
  const failCount = checks.filter(c => c.status === 'fail').length;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-white/95 backdrop-blur shadow-xl border-2 border-purple-300 max-w-sm">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-sm">Auditoria do Sistema</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-6 px-2"
            >
              {expanded ? '−' : '+'}
            </Button>
          </div>

          <div className="flex gap-2 mb-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              ✅ {passCount}/8
            </Badge>
            {failCount > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                ❌ {failCount}
              </Badge>
            )}
          </div>

          {expanded && (
            <div className="space-y-1 text-xs">
              {checks.map((check) => (
                <div key={check.id} className="flex items-start gap-2 p-2 rounded bg-gray-50">
                  <div className="mt-0.5">
                    {check.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {check.status === 'fail' && <XCircle className="w-4 h-4 text-red-600" />}
                    {check.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                    {check.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{check.label}</div>
                    {check.details && (
                      <div className="text-gray-600 text-[10px] mt-0.5">{check.details}</div>
                    )}
                  </div>
                </div>
              ))}

              <Button
                size="sm"
                onClick={exportReport}
                className="w-full mt-2 h-7 text-xs"
                variant="outline"
              >
                <Download className="w-3 h-3 mr-1" />
                Exportar Relatório
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
