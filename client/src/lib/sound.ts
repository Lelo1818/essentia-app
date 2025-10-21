type SoundName = 'ui_click' | 'ui_success' | 'ui_open' | 'ui_close' | 'breath_tick';

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

    const soundFiles: Record<SoundName, string> = {
      ui_click: '/audio/ui_click.mp3',
      ui_success: '/audio/ui_success.mp3',
      ui_open: '/audio/ui_open.mp3',
      ui_close: '/audio/ui_close.mp3',
      breath_tick: '/audio/breath_tick.mp3',
    };

    for (const [name, path] of Object.entries(soundFiles) as [SoundName, string][]) {
      try {
        const audio = new Audio(path);
        audio.volume = 0.3;
        audio.preload = 'auto';
        this.sounds.set(name, audio);
      } catch (error) {
        console.warn(`Failed to load sound: ${name}`, error);
      }
    }

    this.initialized = true;
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
        console.debug('Sound play failed (autoplay policy):', err);
      });
      this.lastPlayTime.set(name, now);

      // Track click sounds
      if (name === 'ui_click') {
        this.trackEvent('ui_click_played');
      }
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
