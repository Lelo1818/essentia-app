import { useEffect } from 'react';

export function useMobileOptimization() {
  useEffect(() => {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Add viewport meta tag if not exists
    let viewport = document.querySelector('meta[name=viewport]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

    // Add touch optimization styles
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        * {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        body {
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
        }
        button, [role="button"], a {
          min-height: 44px;
          min-width: 44px;
          cursor: pointer;
        }
      }
    `;
    document.head.appendChild(style);

    document.addEventListener('touchend', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('touchend', preventZoom);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);
}