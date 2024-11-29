import React, { useState, useEffect } from 'react';
import { X, Bot, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface AIResearchPopupProps {
  domain: string;
  onClose: () => void;
}

interface ResearchStep {
  id: string;
  message: string;
  status: 'pending' | 'complete' | 'error';
  icon: React.ReactNode;
}

const playJeopardyTheme = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const notes = [
    { freq: 261.63, duration: 0.25 }, // C4
    { freq: 329.63, duration: 0.25 }, // E4
    { freq: 392.00, duration: 0.25 }, // G4
    { freq: 523.25, duration: 0.5 },  // C5
    { freq: 392.00, duration: 0.25 }, // G4
    { freq: 523.25, duration: 0.75 }  // C5
  ];

  let startTime = audioContext.currentTime;

  notes.forEach(note => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = note.freq;
    
    gainNode.gain.setValueAtTime(0.2, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + note.duration);
    
    startTime += note.duration;
  });
};

export const AIResearchPopup: React.FC<AIResearchPopupProps> = ({ domain, onClose }) => {
  const { playSound } = useSound();
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Scroll to top when popup opens
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const steps: ResearchStep[] = [
    {
      id: 'agents-verify',
      message: 'Verifying AI Agents...',
      status: 'pending',
      icon: <Bot className="w-5 h-5" />
    },
    {
      id: 'agents-call',
      message: 'Calling AI Agents...',
      status: 'pending',
      icon: <Bot className="w-5 h-5" />
    },
    {
      id: 'api-establish',
      message: 'Establishing API connections...',
      status: 'pending',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 'research-start',
      message: 'Starting research process...',
      status: 'pending',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  useEffect(() => {
    if (currentStep === 0) {
      playJeopardyTheme();
    }

    const advanceStep = async () => {
      if (currentStep < steps.length) {
        playSound('keypress');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === steps.length && !complete) {
        playSound('login');
        setComplete(true);
      }
    };

    advanceStep();
  }, [currentStep, complete, playSound]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-start justify-center p-8" style={{ marginTop: '2vh' }}>
      <div className="relative w-full max-w-lg bg-black/80 border-2 border-blue-500/50 rounded-lg p-8 animate-blink shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-blue-500 mb-6 flex items-center gap-2">
          <Bot className="w-6 h-6" />
          AI Research Process
        </h2>

        <div className="space-y-4 mb-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded border ${
                index === currentStep
                  ? 'border-blue-500/30 bg-blue-500/10 text-blue-500 animate-pulse'
                  : index < currentStep
                  ? 'border-green-500/30 bg-green-500/10 text-green-500'
                  : 'border-blue-500/30 text-blue-500/50'
              }`}
            >
              {step.icon}
              <span>{step.message}</span>
              {index < currentStep && (
                <CheckCircle className="w-4 h-4 ml-auto text-green-500" />
              )}
            </div>
          ))}
        </div>

        {complete ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-500">
              <Mail className="w-5 h-5" />
              <span>Research initiated for {domain}</span>
            </div>
            <div className="text-blue-500/70">
              Estimated completion time: 93 minutes
            </div>
            <div className="text-blue-500/70">
              You will receive an email notification when the report is complete.
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};