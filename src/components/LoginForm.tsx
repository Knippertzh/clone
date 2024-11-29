import React, { useState, useEffect } from 'react';
import { User, Lock, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useTTS } from '../hooks/useTTS';

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { playSound, toggleSound, isEnabled } = useSound();
  const { speak } = useTTS();

  // Load voices when component mounts
  useEffect(() => {
    // Chrome needs a little time to load voices
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6 ? 'wonderful night' : 'wonderful day';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = onLogin(username, password);
    if (success) {
      playSound('login');
      // Get the user's full name from the users data
      const users = [
        { username: 'jhoover', name: 'J. Edgar Hoover' },
        { username: 'rpeters', name: 'Ricarda Peters' },
        { username: 'pblanks', name: 'Patrick Blanks' },
        { username: 'mmohr', name: 'Michael Mohr' }
      ];
      const user = users.find(u => u.username === username);
      
      if (user) {
        // Wait a moment for the login sound to finish
        await new Promise(resolve => setTimeout(resolve, 500));
        const greeting = getTimeBasedGreeting();
        speak(`Welcome ${user.name}. Have a ${greeting}`);
      }
    } else {
      playSound('error');
      setError('INVALID CREDENTIALS - ACCESS DENIED');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playSound('keypress');
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 font-mono">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSound}
          className="text-green-500/70 hover:text-green-500 transition-colors"
          aria-label={isEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="USERNAME"
            className="w-full bg-black/30 border border-green-500/30 rounded px-12 py-3 focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-500/30"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="ACCESS CODE"
            className="w-full bg-black/30 border border-green-500/30 rounded px-12 py-3 focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-500/30"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500/20 border border-green-500/30 rounded py-3 text-green-500 hover:bg-green-500/30 transition-colors"
        >
          AUTHENTICATE
        </button>
      </form>
    </div>
  );
}