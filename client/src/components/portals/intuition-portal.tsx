import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import portalIntuicaoVideo from '@assets/Portal da Intuição_1761165744262.mp4';

interface IntuitionPortalProps {
  onClose: () => void;
}

type Stage = 'fade-in' | 'video' | 'reflection';

export function IntuitionPortal({ onClose }: IntuitionPortalProps) {
  const [stage, setStage] = useState<Stage>('fade-in');
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Fade-in effect -> Video after 2 seconds
  useEffect(() => {
    if (stage === 'fade-in') {
      const timer = setTimeout(() => {
        setStage('video');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Auto-play video when it loads
  useEffect(() => {
    if (stage === 'video' && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay bloqueado:', err);
      });
    }
  }, [stage]);

  const handleVideoEnd = () => {
    setStage('reflection');
  };

  const handleSaveReflection = async () => {
    if (!reflection.trim()) {
      toast({
        title: 'Escreva sua reflexão',
        description: 'Por favor, compartilhe o que seu coração sente.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portalType: 'intuicao',
          content: reflection,
        }),
      });

      if (response.ok) {
        toast({
          title: '✨ Reflexão Guardada',
          description: 'Sua intuição foi registrada no diário.',
        });
        
        // Award points for completing portal
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            delta: 75,
            activity: 'portal_intuicao_complete',
          }),
        });

        // Close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar reflexão:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar sua reflexão.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fade-in Stage: White with soft glow */}
      {stage === 'fade-in' && (
        <div className="absolute inset-0 bg-white flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 animate-pulse">
              <Eye className="w-full h-full text-purple-400" />
            </div>
            <p className="text-2xl font-light text-purple-600 italic">
              Preparando seu Portal...
            </p>
          </div>
        </div>
      )}

      {/* Video Stage */}
      {stage === 'video' && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 flex items-center justify-center animate-fadeIn">
          <div className="relative w-full max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 left-4 text-white hover:bg-white/20 z-10"
              data-testid="button-back-from-video"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {/* Video Player */}
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                src={portalIntuicaoVideo}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                controls
                data-testid="video-intuition"
              />
            </div>

            <div className="text-center mt-6">
              <p className="text-white/80 text-sm">
                🎥 Assista até o final para desbloquear sua reflexão
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reflection Stage */}
      {stage === 'reflection' && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center animate-fadeIn">
          <div className="w-full max-w-2xl mx-auto px-4 py-8">
            {/* Mystical Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 blur-2xl opacity-50 rounded-full" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Reflection Prompt */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light text-purple-900 mb-4">
                Momento de Intuição
              </h2>
              <p className="text-lg italic text-purple-700 leading-relaxed">
                "Feche os olhos. O que você sente quando o caminho não é claro, mas o coração sabe?"
              </p>
            </div>

            {/* Reflection Textarea */}
            <div className="space-y-6">
              <Textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Escreva o que sua intuição revela..."
                className="min-h-[12rem] bg-white border-2 border-purple-300 focus:border-purple-500 rounded-2xl p-6 text-lg placeholder:italic placeholder:text-gray-400 resize-none shadow-lg focus:shadow-purple-500/20"
                data-testid="textarea-reflection"
              />

              {/* Save Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSaveReflection}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-4 px-12 rounded-full text-lg shadow-xl"
                  data-testid="button-save-reflection"
                >
                  {isSaving ? 'Salvando...' : '✨ Guardar no Diário'}
                </Button>
              </div>

              {/* Back Link */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-purple-600 hover:text-purple-800"
                  data-testid="button-back-from-reflection"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar aos Portais
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
