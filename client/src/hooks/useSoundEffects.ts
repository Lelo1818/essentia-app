import { useCallback } from 'react';

// Sound effects using Web Audio API
const createBeepSound = (frequency: number, duration: number, volume: number = 0.3) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const createSuccessSound = () => {
  // Success: ascending tone
  setTimeout(() => createBeepSound(523, 0.1), 0);   // C5
  setTimeout(() => createBeepSound(659, 0.1), 100); // E5
  setTimeout(() => createBeepSound(784, 0.15), 200); // G5
};

const createClickSound = () => {
  // Quick pop sound
  createBeepSound(800, 0.05, 0.2);
};

const createErrorSound = () => {
  // Error: descending tone
  setTimeout(() => createBeepSound(400, 0.1), 0);
  setTimeout(() => createBeepSound(300, 0.15), 100);
};

const createNotificationSound = () => {
  // Notification: two tone
  setTimeout(() => createBeepSound(600, 0.1), 0);
  setTimeout(() => createBeepSound(800, 0.1), 150);
};

// Haptic feedback
const vibrate = (pattern: number | number[] = 50) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export const useSoundEffects = () => {
  const playClick = useCallback(() => {
    createClickSound();
    vibrate(25);
  }, []);

  const playSuccess = useCallback(() => {
    createSuccessSound();
    vibrate([100, 50, 100]);
  }, []);

  const playError = useCallback(() => {
    createErrorSound();
    vibrate([200, 100, 200]);
  }, []);

  const playNotification = useCallback(() => {
    createNotificationSound();
    vibrate([50, 30, 50]);
  }, []);

  const playHover = useCallback(() => {
    createBeepSound(600, 0.03, 0.1);
    vibrate(15);
  }, []);

  return {
    playClick,
    playSuccess,
    playError,
    playNotification,
    playHover,
  };
};