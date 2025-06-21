import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export function BackgroundMusic() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  const createAmbientMusic = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const masterGain = audioContext.createGain();
      masterGain.connect(audioContext.destination);
      masterGain.gain.value = 0.02; // Very low volume
      setGainNode(masterGain);

      // Create multiple oscillators for ambient pad
      const frequencies = [130.81, 164.81, 196.00, 246.94]; // C3, E3, G3, B3
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;
        
        // Gentle modulation
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        
        lfo.frequency.value = 0.1 + (index * 0.02); // Slow modulation
        lfo.type = 'sine';
        lfoGain.gain.value = 0.01;
        
        oscGain.gain.setValueAtTime(0, audioContext.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 2);
        
        oscillator.start();
        lfo.start();
        
        // Schedule restart to create seamless loop
        setTimeout(() => {
          if (isPlaying) {
            createAmbientMusic();
          }
        }, 120000); // 2 minutes
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      createAmbientMusic();
      setIsPlaying(true);
    } else {
      if (gainNode) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current!.currentTime + 0.5);
      }
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMusic}
        className="bg-black/20 border-white/20 text-white hover:bg-black/40"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </Button>
    </div>
  );
}