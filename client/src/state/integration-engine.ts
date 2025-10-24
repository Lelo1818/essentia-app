import { apiRequest } from "@/lib/queryClient";

interface FEMEState {
  fisico: number;
  energetico: number;
  mental: number;
  espiritual: number;
}

interface CoherenceState {
  score: number;
  meta?: any;
  calculatedAt?: string;
}

interface HistoryEntry {
  id: number;
  dimension: string;
  text: string;
  createdAt: string;
}

interface EssentiaState {
  feme: FEMEState;
  coherence: CoherenceState;
  history: HistoryEntry[];
  lastEntryAt: string | null;
}

type StateListener = (state: EssentiaState) => void;

class IntegrationEngine {
  private state: EssentiaState | null = null;
  private userId: number | null = null;
  private listeners: Set<StateListener> = new Set();
  private cacheKey = 'essentia_state_v1';
  private cacheTTL = 10 * 60 * 1000; // 10 minutos

  async init(userId: number) {
    this.userId = userId;
    
    // Tentar carregar do cache primeiro
    const cached = this.loadFromCache();
    if (cached) {
      this.state = cached;
      this.emit();
    }

    // Buscar estado atualizado do servidor
    try {
      const serverState = await apiRequest('GET', `/api/state?userId=${userId}`);
      this.state = serverState;
      this.saveToCache();
      this.emit();
    } catch (error) {
      console.error('Failed to load state from server:', error);
      // Se falhou mas tem cache, usa cache
      if (!this.state && cached) {
        this.state = cached;
        this.emit();
      }
    }
  }

  getState(): EssentiaState | null {
    return this.state;
  }

  subscribe(listener: StateListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    if (this.state) {
      this.listeners.forEach(listener => listener(this.state!));
    }
  }

  private loadFromCache(): EssentiaState | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;

      if (age > this.cacheTTL) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  private saveToCache() {
    if (!this.state) return;
    
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify({
        data: this.state,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save to cache:', error);
    }
  }

  async logEntry(entry: { dimension: string; text: string }) {
    if (!this.userId) throw new Error('Engine not initialized');

    try {
      const updatedState = await apiRequest('POST', '/api/entries/create', {
        userId: this.userId,
        ...entry
      });

      this.state = updatedState;
      this.saveToCache();
      this.emit();
      return updatedState;
    } catch (error) {
      console.error('Failed to log entry:', error);
      throw error;
    }
  }

  async updateFEME(partial: Partial<FEMEState>) {
    if (!this.userId) throw new Error('Engine not initialized');

    try {
      const updatedState = await apiRequest('POST', '/api/feme/update', {
        userId: this.userId,
        ...partial
      });

      // Força refresh do estado unificado para garantir sincronização
      const fresh = await apiRequest('GET', `/api/state?userId=${this.userId}`);
      this.state = fresh;
      this.saveToCache();
      this.emit();
      return fresh;
    } catch (error) {
      console.error('Failed to update FEME:', error);
      throw error;
    }
  }

  async recalcCoherence() {
    if (!this.userId) throw new Error('Engine not initialized');

    try {
      const updatedState = await apiRequest('POST', '/api/coherence/calc', {
        userId: this.userId
      });

      this.state = updatedState;
      this.saveToCache();
      this.emit();
      return updatedState;
    } catch (error) {
      console.error('Failed to recalculate coherence:', error);
      throw error;
    }
  }

  linkPortal(params: { avatarId: string }) {
    // Registra intenção localmente
    try {
      const intentions = JSON.parse(localStorage.getItem('portal_intentions') || '[]');
      intentions.push({
        avatarId: params.avatarId,
        timestamp: Date.now()
      });
      localStorage.setItem('portal_intentions', JSON.stringify(intentions.slice(-10))); // Keep last 10
    } catch (error) {
      console.error('Failed to save portal intention:', error);
    }
  }

  clearCache() {
    localStorage.removeItem(this.cacheKey);
    localStorage.removeItem('portal_intentions');
  }
}

// Singleton instance
export const integrationEngine = new IntegrationEngine();

// Actions object for easier imports
export const actions = {
  logEntry: (entry: { dimension: string; text: string }) => integrationEngine.logEntry(entry),
  updateFEME: (partial: Partial<FEMEState>) => integrationEngine.updateFEME(partial),
  recalcCoherence: () => integrationEngine.recalcCoherence(),
  linkPortal: (params: { avatarId: string }) => integrationEngine.linkPortal(params)
};

// Initialize helper
export const initIntegrationEngine = (userId: number) => integrationEngine.init(userId);

// State getter
export const getState = () => integrationEngine.getState();

// Subscribe helper
export const subscribe = (listener: StateListener) => integrationEngine.subscribe(listener);
