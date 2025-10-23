type SoundName = 'ui_click' | 'ui_success' | 'ui_open' | 'ui_close' | 'breath_tick' | 'tribal_drum' | 'ceremonial_drum' | 'avatar_appear';

class SoundManager {
  private sounds: Map<SoundName, HTMLAudioElement> = new Map();
  private lastPlayTime: Map<SoundName, number> = new Map();
  private enabled: boolean = true;
  private initialized: boolean = false;
  private readonly MIN_INTERVAL_MS = 80;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    const stored = localStorage.getItem('sound_enabled');
    this.enabled = stored !== 'false';
  }

  async initialize() {
    if (this.initialized) return;

    // Try to load from files first
    const soundFiles: Record<SoundName, string> = {
      ui_click: '/audio/ui_click.mp3',
      ui_success: '/audio/ui_success.mp3',
      ui_open: '/audio/ui_open.mp3',
      ui_close: '/audio/ui_close.mp3',
      breath_tick: '/audio/breath_tick.mp3',
      tribal_drum: '/audio/tribal_drum.mp3',
      ceremonial_drum: '/audio/ceremonial_drum.mp3',
      avatar_appear: '/audio/avatar_appear.mp3',
    };

    for (const [name, path] of Object.entries(soundFiles) as [SoundName, string][]) {
      try {
        const audio = new Audio(path);
        audio.volume = 0.3;
        audio.preload = 'auto';
        
        // Test if file actually loads
        audio.addEventListener('error', () => {
          console.debug(`Audio file ${name} not found, using Web Audio fallback`);
          this.sounds.delete(name);
        }, { once: true });
        
        this.sounds.set(name, audio);
      } catch (error) {
        console.warn(`Failed to load sound: ${name}`, error);
      }
    }

    this.initialized = true;
  }

  // Generate sound using Web Audio API as fallback
  private generateSound(type: 'click' | 'success') {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'click') {
        // Quick tick
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.08);
      } else {
        // Bell-like success
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    } catch (error) {
      console.debug('Web Audio API not available:', error);
    }
  }

  play(name: SoundName) {
    if (!this.enabled || !this.initialized) return;

    const now = Date.now();
    const lastPlay = this.lastPlayTime.get(name) || 0;

    if (now - lastPlay < this.MIN_INTERVAL_MS) {
      return;
    }

    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.debug('Sound play failed, using Web Audio fallback:', err);
        // Fallback to Web Audio API
        if (name === 'ui_click') {
          this.generateSound('click');
        } else if (name === 'ui_success') {
          this.generateSound('success');
        }
      });
      this.lastPlayTime.set(name, now);

      // Track click sounds
      if (name === 'ui_click') {
        this.trackEvent('ui_click_played');
      }
    } else {
      // No sound file, use Web Audio directly
      if (name === 'ui_click') {
        this.generateSound('click');
      } else if (name === 'ui_success') {
        this.generateSound('success');
      }
      this.lastPlayTime.set(name, now);
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem('sound_enabled', String(enabled));
    this.trackEvent('sound_toggle', { value: enabled });
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private trackEvent(eventName: string, meta: Record<string, any> = {}) {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventProps: meta,
      }),
    }).catch(err => console.debug('Event tracking failed:', err));
  }
}

export const soundManager = new SoundManager();

// Initialize on first user interaction
let hasInitialized = false;
const initOnInteraction = () => {
  if (!hasInitialized) {
    soundManager.initialize();
    hasInitialized = true;
    document.removeEventListener('click', initOnInteraction);
    document.removeEventListener('keydown', initOnInteraction);
  }
};

if (typeof document !== 'undefined') {
  document.addEventListener('click', initOnInteraction, { once: true });
  document.addEventListener('keydown', initOnInteraction, { once: true });
}
