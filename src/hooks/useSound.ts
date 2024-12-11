import { useCallback, useRef } from 'react';

export type SoundType = 'login' | 'error' | 'keypress' | 'search' | 'logout' | 'diskRead';

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

/**
 * Creates an oscillator and a gain node for audio playback.
 *
 * This function initializes an oscillator with a specified frequency and duration,
 * and connects it to a gain node that controls the volume. The oscillator type can
 * be specified, defaulting to 'sine' if not provided.
 *
 * @param {number} frequency - The frequency of the oscillator in hertz (Hz).
 * @param {number} duration - The duration in seconds for which the oscillator will play.
 * @param {OscillatorType} [type='sine'] - The type of oscillator to create.
 *                                           Options include 'sine', 'square', 'sawtooth',
 *                                           'triangle', etc.
 * @returns {{ oscillator: OscillatorNode, gainNode: GainNode }} An object containing
 *          the created oscillator and gain node.
 *
 * @throws {Error} Throws an error if the audio context is not initialized or if the
 *                 frequency is not a valid number.
 *
 * @example
 * const { oscillator, gainNode } = createOscillator(440, 2, 'sine');
 * oscillator.start();
 * oscillator.stop(audioContext.currentTime + 2);
 */
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

/**
 * Plays a sequence of Amiga disk sound frequencies using the Web Audio API.
 * The function creates oscillators for each frequency in a predefined array and
 * schedules them to play at intervals.
 *
 * Frequencies played are: 800Hz, 1000Hz, 600Hz, 900Hz, 700Hz, 850Hz, 750Hz, and 950Hz.
 * Each sound plays for a duration of 0.1 seconds, with a delay of 180 milliseconds
 * between each sound.
 *
 * @throws {Error} Throws an error if the audio context is not initialized properly.
 *
 * @example
 * // To play the Amiga disk sound
 * playAmigaDiskSound();
 */
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

/**
 * A custom hook that manages sound playback functionality.
 * It provides methods to play different types of sounds and to toggle sound playback on or off.
 *
 * @returns {Object} An object containing the following properties:
 *   - playSound: A function that plays a sound based on the provided type.
 *   - toggleSound: A function that toggles the sound on or off.
 *   - isEnabled: A boolean indicating whether sound playback is enabled.
 *
 * @example
 * const { playSound, toggleSound, isEnabled } = useSound();
 * playSound('login'); // Plays the login sound
 * toggleSound(); // Toggles the sound state
 *
 * @throws {Error} Throws an error if the sound type is not recognized.
 */
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