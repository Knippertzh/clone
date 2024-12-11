import { useCallback } from 'react';

/**
 * A custom hook that provides text-to-speech functionality using the Web Speech API.
 *
 * This hook returns an object containing a `speak` function that can be used to convert
 * text into speech. It checks for browser support for speech synthesis and configures
 * the speech settings such as rate, pitch, and volume. It also attempts to select a
 * neutral English voice if available.
 *
 * @returns {Object} An object containing the `speak` function.
 * @returns {Function} speak - A function that takes a string as input and converts it to speech.
 *
 * @example
 * const { speak } = useTTS();
 * speak("Hello, how are you?");
 *
 * @throws {Error} Throws an error if the browser does not support speech synthesis.
 */
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