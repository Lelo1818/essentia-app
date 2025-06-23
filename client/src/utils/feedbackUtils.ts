// Feedback auditivo e tátil para melhor UX
export class FeedbackUtils {
  private static audioContext: AudioContext | null = null;
  
  // Sons leves para interações
  static playClickSound(type: 'soft' | 'confirm' | 'navigate' = 'soft') {
    if (typeof window === 'undefined') return;
    
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Configurações por tipo de som
      const sounds = {
        soft: { frequency: 800, duration: 80, volume: 0.1 },
        confirm: { frequency: 1000, duration: 120, volume: 0.15 },
        navigate: { frequency: 600, duration: 100, volume: 0.12 }
      };
      
      const sound = sounds[type];
      oscillator.frequency.setValueAtTime(sound.frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(sound.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + sound.duration / 1000);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + sound.duration / 1000);
    } catch (error) {
      // Silencioso se áudio não suportado
    }
  }
  
  // Vibração tátil para mobile
  static triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light') {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  }
  
  // Feedback combinado para ações importantes
  static feedbackAction(type: 'navigate' | 'confirm' | 'interaction' = 'interaction') {
    const configs = {
      navigate: { sound: 'navigate' as const, haptic: 'light' as const },
      confirm: { sound: 'confirm' as const, haptic: 'medium' as const },
      interaction: { sound: 'soft' as const, haptic: 'light' as const }
    };
    
    const config = configs[type];
    this.playClickSound(config.sound);
    this.triggerHaptic(config.haptic);
  }
}