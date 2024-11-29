import React, { useState, useEffect } from 'react';
import { X, Bot, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface AIAgentWorkSimulationProps {
  agent: {
    id: string;
    name: string;
    icon: React.ReactNode;
  };
  onClose: () => void;
}

const getSimulationSteps = (agentId: string) => {
  const commonSteps = [
    {
      message: 'Initializing AI core systems...',
      duration: 1500
    },
    {
      message: 'Loading specialized algorithms...',
      duration: 1800
    },
    {
      message: 'Establishing secure connections...',
      duration: 1200
    }
  ];

  const agentSpecificSteps: { [key: string]: Array<{ message: string; duration: number }> } = {
    'data-miner': [
      { message: 'Scanning data sources...', duration: 2000 },
      { message: 'Extracting relevant information...', duration: 2500 },
      { message: 'Processing structured data...', duration: 1800 }
    ],
    'market-analyst': [
      { message: 'Analyzing market trends...', duration: 2200 },
      { message: 'Evaluating competitive landscape...', duration: 2000 },
      { message: 'Generating market insights...', duration: 1900 }
    ],
    'web-crawler': [
      { message: 'Crawling target websites...', duration: 2300 },
      { message: 'Indexing discovered content...', duration: 2100 },
      { message: 'Extracting relevant data...', duration: 1700 }
    ],
    'security-auditor': [
      { message: 'Performing security scan...', duration: 2400 },
      { message: 'Analyzing vulnerabilities...', duration: 2200 },
      { message: 'Generating security report...', duration: 1600 }
    ],
    'code-analyzer': [
      { message: 'Analyzing codebase...', duration: 2100 },
      { message: 'Evaluating code quality...', duration: 2300 },
      { message: 'Generating technical report...', duration: 1800 }
    ],
    'social-analyzer': [
      { message: 'Scanning social platforms...', duration: 2000 },
      { message: 'Analyzing social engagement...', duration: 2400 },
      { message: 'Processing social metrics...', duration: 1700 }
    ],
    'document-processor': [
      { message: 'Processing documents...', duration: 2200 },
      { message: 'Extracting key information...', duration: 2100 },
      { message: 'Organizing document data...', duration: 1900 }
    ],
    'risk-assessor': [
      { message: 'Evaluating risk factors...', duration: 2300 },
      { message: 'Calculating risk metrics...', duration: 2000 },
      { message: 'Generating risk report...', duration: 1800 }
    ],
    'innovation-tracker': [
      { message: 'Scanning innovation sources...', duration: 2400 },
      { message: 'Analyzing technological trends...', duration: 2200 },
      { message: 'Processing patent data...', duration: 1700 }
    ],
    'sentiment-analyzer': [
      { message: 'Analyzing sentiment data...', duration: 2100 },
      { message: 'Processing public opinion...', duration: 2300 },
      { message: 'Generating sentiment report...', duration: 1800 }
    ],
    'competitor-monitor': [
      { message: 'Monitoring competitor activity...', duration: 2000 },
      { message: 'Analyzing competitive strategies...', duration: 2400 },
      { message: 'Generating competitive report...', duration: 1700 }
    ],
    'market-predictor': [
      { message: 'Analyzing market data...', duration: 2200 },
      { message: 'Running prediction models...', duration: 2100 },
      { message: 'Generating forecast report...', duration: 1900 }
    ],
    'performance-analyzer': [
      { message: 'Analyzing performance metrics...', duration: 2300 },
      { message: 'Processing KPI data...', duration: 2000 },
      { message: 'Generating performance report...', duration: 1800 }
    ],
    'network-mapper': [
      { message: 'Mapping network connections...', duration: 2400 },
      { message: 'Analyzing relationship patterns...', duration: 2200 },
      { message: 'Generating network report...', duration: 1700 }
    ],
    'financial-analyzer': [
      { message: 'Processing financial data...', duration: 2100 },
      { message: 'Analyzing financial metrics...', duration: 2300 },
      { message: 'Generating financial report...', duration: 1800 }
    ],
    'compliance-checker': [
      { message: 'Checking compliance requirements...', duration: 2000 },
      { message: 'Analyzing regulatory data...', duration: 2400 },
      { message: 'Generating compliance report...', duration: 1700 }
    ],
    'email-analyzer': [
      { message: 'Processing email data...', duration: 2200 },
      { message: 'Analyzing communication patterns...', duration: 2100 },
      { message: 'Generating communication report...', duration: 1900 }
    ],
    'brain-trust': [
      { message: 'Coordinating AI systems...', duration: 2300 },
      { message: 'Processing multi-domain data...', duration: 2000 },
      { message: 'Generating comprehensive report...', duration: 1800 }
    ],
    'power-processor': [
      { message: 'Initializing processing cores...', duration: 2400 },
      { message: 'Processing large datasets...', duration: 2200 },
      { message: 'Generating processing report...', duration: 1700 }
    ],
    'master-bot': [
      { message: 'Coordinating agent network...', duration: 2100 },
      { message: 'Managing AI resources...', duration: 2300 },
      { message: 'Generating coordination report...', duration: 1800 }
    ]
  };

  return [
    ...commonSteps,
    ...(agentSpecificSteps[agentId] || agentSpecificSteps['master-bot'])
  ];
};

export const AIAgentWorkSimulation: React.FC<AIAgentWorkSimulationProps> = ({ agent, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const { playSound } = useSound();
  const steps = getSimulationSteps(agent.id);

  useEffect(() => {
    // Scroll to top when popup opens
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const advanceStep = async () => {
      if (currentStep < steps.length) {
        playSound('keypress');
        await new Promise(resolve => setTimeout(resolve, steps[currentStep].duration));
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === steps.length && !complete) {
        playSound('login');
        setComplete(true);
      }
    };

    advanceStep();
  }, [currentStep, complete, steps, playSound]);

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
          {agent.icon}
          {agent.name} - Work Process
        </h2>

        <div className="space-y-4 mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded border ${
                index === currentStep
                  ? 'border-blue-500/30 bg-blue-500/10 text-blue-500 animate-pulse'
                  : index < currentStep
                  ? 'border-green-500/30 bg-green-500/10 text-green-500'
                  : 'border-blue-500/30 text-blue-500/50'
              }`}
            >
              <Bot className="w-4 h-4" />
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
              <span>Task completed successfully</span>
            </div>
            <div className="text-blue-500/70">
              You will receive an email notification with the results.
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