import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/essentia';

export const useEssentiaPro = () => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Explorador',
    clarity: 67,
    daysActive: 89,
    currentStage: 'Descoberta de Paixões',
    achievements: 12
  });

  const [currentEnvironment, setCurrentEnvironment] = useState(2); // Montanha
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentBreathPhase, setCurrentBreathPhase] = useState('prepare');
  const [selectedTechnique, setSelectedTechnique] = useState(0);
  const [breathingProgress, setBreathingProgress] = useState(0);

  // Avatar animation state
  const [avatarRotation, setAvatarRotation] = useState(0);
  const [auraIntensity, setAuraIntensity] = useState(0.5);

  // Breathing animation
  useEffect(() => {
    if (isBreathing) {
      const interval = setInterval(() => {
        setAuraIntensity(prev => Math.sin(Date.now() / 1000) * 0.3 + 0.7);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isBreathing]);

  // Avatar rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAvatarRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const updateClarity = useCallback((newClarity: number) => {
    const clamped = Math.min(100, Math.max(0, newClarity));
    setUser(prev => ({ ...prev, clarity: clamped }));
  }, []);

  const completeDaily = useCallback(() => {
    setUser(prev => ({ 
      ...prev, 
      daysActive: prev.daysActive + 1,
      clarity: Math.min(100, prev.clarity + 2),
      achievements: prev.achievements + 1
    }));
  }, []);

  const completeBreathe = useCallback(() => {
    setIsBreathing(false);
    setCurrentBreathPhase('complete');
    updateClarity(user.clarity + 3);
    
    setTimeout(() => {
      setCurrentBreathPhase('prepare');
    }, 2000);
  }, [user.clarity, updateClarity]);

  const startBreathing = useCallback((techniqueIndex: number) => {
    setSelectedTechnique(techniqueIndex);
    setIsBreathing(true);
    setCurrentBreathPhase('inhale');
    setBreathingProgress(0);
  }, []);

  return {
    // User data
    user,
    setUser,
    
    // Environment
    currentEnvironment,
    setCurrentEnvironment,
    
    // Breathing
    isBreathing,
    setIsBreathing,
    currentBreathPhase,
    setCurrentBreathPhase,
    selectedTechnique,
    setSelectedTechnique,
    breathingProgress,
    setBreathingProgress,
    startBreathing,
    completeBreathe,
    
    // Avatar animation
    avatarRotation,
    auraIntensity,
    
    // Actions
    updateClarity,
    completeDaily
  };
};