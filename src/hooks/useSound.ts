import { useCallback, useRef } from 'react';

export type SoundType = 'login' | 'error' | 'keypress' | 'search' | 'logout' | 'diskRead';

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const createOscillator = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  return { oscillator, gainNode };
};

const playAmigaDiskSound = () => {
  const frequencies = [800, 1000, 600, 900, 700, 850, 750, 950];
  
  frequencies.forEach((freq, i) => {
    window.setTimeout(() => {
      const { oscillator } = createOscillator(freq, 0.1, 'square');
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }, i * 180);
  });
};

export const useSound = () => {
  const isEnabled = useRef(true);

  const playSound = useCallback((type: SoundType) => {
    if (!isEnabled.current) return;

    switch (type) {
      case 'diskRead':
        playAmigaDiskSound();
        break;
      case 'login':
        [440, 550, 660].forEach((freq, i) => {
          window.setTimeout(() => {
            const { oscillator } = createOscillator(freq, 0.3);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
          }, i * 100);
        });
        break;
      case 'error':
        const { oscillator: errorOsc } = createOscillator(150, 0.3, 'sawtooth');
        errorOsc.start();
        errorOsc.stop(audioContext.currentTime + 0.3);
        break;
      case 'keypress':
        const { oscillator: keypressOsc } = createOscillator(800, 0.05);
        keypressOsc.start();
        keypressOsc.stop(audioContext.currentTime + 0.05);
        break;
      case 'search':
        [400, 600].forEach((freq, i) => {
          window.setTimeout(() => {
            const { oscillator: searchOsc } = createOscillator(freq, 0.1);
            searchOsc.start();
            searchOsc.stop(audioContext.currentTime + 0.1);
          }, i * 150);
        });
        break;
      case 'logout':
        const { oscillator: logoutOsc } = createOscillator(440, 0.5);
        logoutOsc.frequency.linearRampToValueAtTime(110, audioContext.currentTime + 0.5);
        logoutOsc.start();
        logoutOsc.stop(audioContext.currentTime + 0.5);
        break;
    }
  }, []);

  const toggleSound = useCallback(() => {
    isEnabled.current = !isEnabled.current;
    return isEnabled.current;
  }, []);

  return { playSound, toggleSound, isEnabled: isEnabled.current };
};