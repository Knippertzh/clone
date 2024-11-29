import { useCallback } from 'react';

export const useTTS = () => {
  const speak = useCallback((text: string) => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // Create a new instance of SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure the voice settings
      utterance.rate = 0.9; // Slightly slower than default
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Get available voices and set to a neutral English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Google')
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      // Speak the text
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};