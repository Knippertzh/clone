import React, { useState } from 'react';
import { Bot, Search, Zap, Brain, Database, Globe, BarChart3, Shield, Code, Mail, Users, FileText, AlertTriangle, Rocket, MessageSquare, Eye, Target, Cpu, Network, LineChart, Lock, X } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface AIAgent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  specialization: string;
  status: 'available' | 'busy' | 'offline';
}

interface AIAgentSelectorProps {
  onClose: () => void;
  onSelect: (agent: AIAgent) => void;
}

const agents: AIAgent[] = [
  {
    id: 'data-miner',
    name: 'Data Miner',
    icon: <Database className="w-5 h-5" />,
    description: 'Extracts and processes company information from various sources',
    specialization: 'Data Extraction',
    status: 'available'
  },
  {
    id: 'market-analyst',
    name: 'Market Analyst',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Analyzes market trends and competitive landscape',
    specialization: 'Market Analysis',
    status: 'available'
  },
  {
    id: 'web-crawler',
    name: 'Web Crawler',
    icon: <Globe className="w-5 h-5" />,
    description: 'Scans websites and online resources for information',
    specialization: 'Web Scraping',
    status: 'available'
  },
  {
    id: 'security-auditor',
    name: 'Security Auditor',
    icon: <Shield className="w-5 h-5" />,
    description: 'Assesses company security measures and compliance',
    specialization: 'Security Analysis',
    status: 'available'
  },
  {
    id: 'code-analyzer',
    name: 'Code Analyzer',
    icon: <Code className="w-5 h-5" />,
    description: 'Reviews technical infrastructure and codebase',
    specialization: 'Technical Analysis',
    status: 'available'
  },
  {
    id: 'social-analyzer',
    name: 'Social Analyzer',
    icon: <Users className="w-5 h-5" />,
    description: 'Analyzes social media presence and engagement',
    specialization: 'Social Media Analysis',
    status: 'available'
  },
  {
    id: 'document-processor',
    name: 'Document Processor',
    icon: <FileText className="w-5 h-5" />,
    description: 'Processes and analyzes company documents',
    specialization: 'Document Analysis',
    status: 'available'
  },
  {
    id: 'risk-assessor',
    name: 'Risk Assessor',
    icon: <AlertTriangle className="w-5 h-5" />,
    description: 'Evaluates business risks and opportunities',
    specialization: 'Risk Assessment',
    status: 'available'
  },
  {
    id: 'innovation-tracker',
    name: 'Innovation Tracker',
    icon: <Rocket className="w-5 h-5" />,
    description: 'Monitors technological innovations and patents',
    specialization: 'Innovation Analysis',
    status: 'available'
  },
  {
    id: 'sentiment-analyzer',
    name: 'Sentiment Analyzer',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Analyzes public sentiment and reputation',
    specialization: 'Sentiment Analysis',
    status: 'available'
  },
  {
    id: 'competitor-monitor',
    name: 'Competitor Monitor',
    icon: <Eye className="w-5 h-5" />,
    description: 'Tracks competitor activities and strategies',
    specialization: 'Competitive Analysis',
    status: 'available'
  },
  {
    id: 'market-predictor',
    name: 'Market Predictor',
    icon: <Target className="w-5 h-5" />,
    description: 'Predicts market trends and opportunities',
    specialization: 'Market Prediction',
    status: 'available'
  },
  {
    id: 'performance-analyzer',
    name: 'Performance Analyzer',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Analyzes business performance metrics',
    specialization: 'Performance Analysis',
    status: 'available'
  },
  {
    id: 'network-mapper',
    name: 'Network Mapper',
    icon: <Network className="w-5 h-5" />,
    description: 'Maps business relationships and connections',
    specialization: 'Network Analysis',
    status: 'available'
  },
  {
    id: 'financial-analyzer',
    name: 'Financial Analyzer',
    icon: <LineChart className="w-5 h-5" />,
    description: 'Analyzes financial health and metrics',
    specialization: 'Financial Analysis',
    status: 'available'
  },
  {
    id: 'compliance-checker',
    name: 'Compliance Checker',
    icon: <Lock className="w-5 h-5" />,
    description: 'Verifies regulatory compliance',
    specialization: 'Compliance Analysis',
    status: 'available'
  },
  {
    id: 'email-analyzer',
    name: 'Email Analyzer',
    icon: <Mail className="w-5 h-5" />,
    description: 'Analyzes email communications and patterns',
    specialization: 'Communication Analysis',
    status: 'available'
  },
  {
    id: 'brain-trust',
    name: 'AI Brain Trust',
    icon: <Brain className="w-5 h-5" />,
    description: 'Combines multiple AI agents for complex analysis',
    specialization: 'Multi-domain Analysis',
    status: 'available'
  },
  {
    id: 'power-processor',
    name: 'Power Processor',
    icon: <Zap className="w-5 h-5" />,
    description: 'Processes large datasets quickly',
    specialization: 'Data Processing',
    status: 'available'
  },
  {
    id: 'master-bot',
    name: 'Master Bot',
    icon: <Bot className="w-5 h-5" />,
    description: 'Coordinates and manages other AI agents',
    specialization: 'Agent Coordination',
    status: 'available'
  }
];

export const AIAgentSelector: React.FC<AIAgentSelectorProps> = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { playSound } = useSound();

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (agent: AIAgent) => {
    playSound('keypress');
    onSelect(agent);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center p-8 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Bot className="w-6 h-6" />
          Select AI Agent
        </h2>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AI agents..."
            className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredAgents.map(agent => (
            <button
              key={agent.id}
              onClick={() => handleSelect(agent)}
              className="text-left p-4 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                {agent.icon}
                <span className="font-bold text-green-500">{agent.name}</span>
              </div>
              <div className="text-green-500/70 text-sm mb-2">{agent.description}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-500/50">{agent.specialization}</span>
                <span className={`px-2 py-0.5 rounded ${
                  agent.status === 'available'
                    ? 'bg-green-500/20 text-green-500'
                    : agent.status === 'busy'
                    ? 'bg-yellow-500/20 text-yellow-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {agent.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};