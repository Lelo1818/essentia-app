/**
 * Sistema de Analytics Essentia
 * Tracking de eventos para métricas de uso
 */

interface EventMeta {
  [key: string]: any;
}

export const esLog = (name: string, meta: EventMeta = {}) => {
  const event = {
    name,
    meta,
    ts: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };
  
  console.log('[ES_EVENT]', name, event);
  
  // Armazenar localmente para análise posterior
  try {
    const events = JSON.parse(localStorage.getItem('es_events') || '[]');
    events.push(event);
    // Manter apenas últimos 100 eventos
    if (events.length > 100) {
      events.shift();
    }
    localStorage.setItem('es_events', JSON.stringify(events));
  } catch (error) {
    console.error('Erro ao armazenar evento:', error);
  }
};

// Expor globalmente para debug
if (typeof window !== 'undefined') {
  (window as any).esLog = esLog;
  (window as any).getEsEvents = () => {
    try {
      return JSON.parse(localStorage.getItem('es_events') || '[]');
    } catch {
      return [];
    }
  };
}

// Eventos comuns
export const trackPageView = (page: string) => esLog('view_page', { page });
export const trackAction = (action: string, meta?: EventMeta) => esLog('action', { action, ...meta });
export const trackBreathing = (action: 'start' | 'pause' | 'finish', breathingType?: string) => 
  esLog(`breath_${action}`, { breathingType });
export const trackPortal = (action: 'open' | 'close' | 'complete', portalType?: string) => 
  esLog(`portal_${action}`, { portalType });
export const trackActivity = (activityType: string, action: 'start' | 'complete') => 
  esLog(`activity_${action}`, { activityType });
export const trackOnboarding = (step: string, data?: EventMeta) => 
  esLog('onboarding', { step, ...data });
