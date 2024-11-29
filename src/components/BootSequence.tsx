import React, { useState, useEffect } from 'react';
import { useSound } from '../hooks/useSound';

interface BootSequenceProps {
  onComplete: () => void;
  username: string;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, username }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const { playSound } = useSound();

  const bootLines = [
    "INITIALIZING SYSTEM...",
    "CHECKING HARDWARE INTEGRITY... OK",
    "LOADING KERNEL... DONE",
    "MOUNTING FILESYSTEMS... OK",
    "INITIALIZING NETWORK INTERFACES... OK",
    "ESTABLISHING SECURE CONNECTION... DONE",
    "LOADING AI CORE SYSTEMS... OK",
    "INITIALIZING NEURAL NETWORKS... DONE",
    "LOADING DATABASE MODULES... OK",
    "CHECKING SECURITY PROTOCOLS... VERIFIED",
    "INITIALIZING USER INTERFACE... OK",
    "SYSTEM READY"
  ];

  useEffect(() => {
    if (currentLine < bootLines.length) {
      playSound('keypress');
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else if (!showWelcome) {
      playSound('login');
      setShowWelcome(true);
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(false);
        setShowLogo(true);
        const logoTimer = setTimeout(() => {
          onComplete();
        }, 2000);
        return () => clearTimeout(logoTimer);
      }, 2000);
      return () => clearTimeout(welcomeTimer);
    }
  }, [currentLine, showWelcome, showLogo, onComplete, playSound]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className={`transition-opacity duration-300 ${showWelcome || showLogo ? 'opacity-0' : 'opacity-100'}`}>
          {bootLines.slice(0, currentLine).map((line, index) => (
            <div
              key={index}
              className={`text-sm ${
                index < currentLine - 1 ? 'opacity-50' : ''
              } animate-[slideIn_0.3s_ease-out]`}
            >
              {line}
            </div>
          ))}
        </div>
        
        {showWelcome && (
          <div className="text-[8rem] font-bold text-center animate-pulse text-green-500">
            Welcome to Future
          </div>
        )}
        
        {showLogo && (
          <div className="text-center animate-[fadeIn_0.5s_ease-out]">
            <img 
              src="/plugilo-logo.svg" 
              alt="Plugilo"
              className="h-32 w-auto mx-auto mb-4 filter brightness-0 invert"
            />
            <div className="text-3xl font-bold tracking-wider text-green-500">
              PLUGILO DATABASE SYSTEM
            </div>
          </div>
        )}
      </div>
    </div>
  );
};