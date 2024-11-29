import React, { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface AIAgentQuestionFormProps {
  agent: {
    id: string;
    name: string;
    icon: React.ReactNode;
  };
  onSubmit: (answers: Record<string, string>) => void;
  onClose: () => void;
}

const getAgentQuestions = (agentId: string): Array<{ id: string; question: string; placeholder: string }> => {
  const questions: { [key: string]: Array<{ id: string; question: string; placeholder: string }> } = {
    'data-miner': [
      { id: 'dataSource', question: 'Which data sources should I prioritize?', placeholder: 'e.g., Company websites, Industry databases, News articles' },
      { id: 'dataType', question: 'What type of data are you most interested in?', placeholder: 'e.g., Financial metrics, Employee count, Product information' }
    ],
    'market-analyst': [
      { id: 'industry', question: 'Which industry sector should I focus on?', placeholder: 'e.g., Technology, Healthcare, Finance' },
      { id: 'timeframe', question: 'What timeframe should I analyze?', placeholder: 'e.g., Last 6 months, Past year, 5-year trend' }
    ],
    'web-crawler': [
      { id: 'websites', question: 'Which websites should I crawl?', placeholder: 'e.g., Company website, Social media, News sites' },
      { id: 'depth', question: 'How deep should I crawl?', placeholder: 'e.g., Main pages only, Full site, Specific sections' }
    ],
    'security-auditor': [
      { id: 'scope', question: 'What security aspects should I focus on?', placeholder: 'e.g., Web security, Data protection, Compliance' },
      { id: 'standards', question: 'Which security standards should I check against?', placeholder: 'e.g., GDPR, ISO 27001, PCI DSS' }
    ],
    'code-analyzer': [
      { id: 'codebase', question: 'Which codebase should I analyze?', placeholder: 'e.g., Frontend, Backend, Full stack' },
      { id: 'metrics', question: 'What metrics are most important?', placeholder: 'e.g., Code quality, Performance, Security' }
    ],
    'social-analyzer': [
      { id: 'platforms', question: 'Which social platforms should I analyze?', placeholder: 'e.g., LinkedIn, Twitter, Facebook' },
      { id: 'metrics', question: 'What social metrics matter most?', placeholder: 'e.g., Engagement, Reach, Sentiment' }
    ],
    'document-processor': [
      { id: 'docTypes', question: 'What types of documents should I process?', placeholder: 'e.g., Reports, Presentations, Legal documents' },
      { id: 'extraction', question: 'What information should I extract?', placeholder: 'e.g., Financial data, Key metrics, Contact information' }
    ],
    'risk-assessor': [
      { id: 'riskTypes', question: 'What types of risks should I assess?', placeholder: 'e.g., Financial, Operational, Market risks' },
      { id: 'impact', question: 'How should I measure risk impact?', placeholder: 'e.g., Financial loss, Reputation damage, Market share' }
    ],
    'innovation-tracker': [
      { id: 'techAreas', question: 'Which technology areas should I monitor?', placeholder: 'e.g., AI, Blockchain, IoT' },
      { id: 'patents', question: 'Should I include patent analysis?', placeholder: 'Yes/No - If yes, specify regions' }
    ],
    'sentiment-analyzer': [
      { id: 'sources', question: 'Which sources should I analyze for sentiment?', placeholder: 'e.g., News, Social media, Reviews' },
      { id: 'topics', question: 'What topics should I focus on?', placeholder: 'e.g., Product feedback, Brand perception, Service quality' }
    ],
    'competitor-monitor': [
      { id: 'competitors', question: 'Which competitors should I monitor?', placeholder: 'e.g., Direct competitors, Industry leaders' },
      { id: 'aspects', question: 'What competitive aspects matter most?', placeholder: 'e.g., Pricing, Features, Market share' }
    ],
    'market-predictor': [
      { id: 'market', question: 'Which market segments should I analyze?', placeholder: 'e.g., Enterprise, Consumer, Geographic regions' },
      { id: 'horizon', question: 'What prediction timeframe?', placeholder: 'e.g., 6 months, 1 year, 5 years' }
    ],
    'performance-analyzer': [
      { id: 'metrics', question: 'Which performance metrics matter most?', placeholder: 'e.g., Revenue growth, Profit margins, Market share' },
      { id: 'benchmark', question: 'What benchmarks should I use?', placeholder: 'e.g., Industry average, Top performers, Historical data' }
    ],
    'network-mapper': [
      { id: 'connections', question: 'What types of connections should I map?', placeholder: 'e.g., Business partnerships, Supply chain, Investments' },
      { id: 'depth', question: 'How many degrees of separation?', placeholder: 'e.g., Direct connections, Extended network' }
    ],
    'financial-analyzer': [
      { id: 'statements', question: 'Which financial statements should I analyze?', placeholder: 'e.g., Income statement, Balance sheet, Cash flow' },
      { id: 'ratios', question: 'What financial ratios are important?', placeholder: 'e.g., Profitability, Liquidity, Efficiency' }
    ],
    'compliance-checker': [
      { id: 'regulations', question: 'Which regulations should I check?', placeholder: 'e.g., GDPR, HIPAA, SOX' },
      { id: 'scope', question: 'What compliance scope?', placeholder: 'e.g., Data privacy, Financial reporting, Industry-specific' }
    ],
    'email-analyzer': [
      { id: 'patterns', question: 'What communication patterns interest you?', placeholder: 'e.g., Response times, Communication frequency' },
      { id: 'content', question: 'What content should I analyze?', placeholder: 'e.g., Topics, Sentiment, Key phrases' }
    ],
    'brain-trust': [
      { id: 'focus', question: 'What is the main analysis focus?', placeholder: 'e.g., Market position, Growth potential, Risk assessment' },
      { id: 'depth', question: 'How comprehensive should the analysis be?', placeholder: 'e.g., High-level overview, Deep dive, Specific aspects' }
    ],
    'power-processor': [
      { id: 'dataset', question: 'What type of dataset needs processing?', placeholder: 'e.g., Customer data, Transaction records, Market data' },
      { id: 'processing', question: 'What processing tasks are needed?', placeholder: 'e.g., Data cleaning, Analysis, Pattern recognition' }
    ],
    'master-bot': [
      { id: 'objective', question: 'What is the main objective?', placeholder: 'e.g., Market analysis, Risk assessment, Competitive analysis' },
      { id: 'coordination', question: 'Which agent types should I coordinate?', placeholder: 'e.g., Analysis, Research, Monitoring' }
    ]
  };

  return questions[agentId] || questions['master-bot'];
};

export const AIAgentQuestionForm: React.FC<AIAgentQuestionFormProps> = ({ agent, onSubmit, onClose }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { playSound } = useSound();
  const questions = getAgentQuestions(agent.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('keypress');
    onSubmit(answers);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-start justify-center p-8" style={{ marginTop: '2vh' }}>
      <div className="relative w-full max-w-lg bg-black/80 border border-blue-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-blue-500 mb-6 flex items-center gap-2">
          {agent.icon}
          {agent.name} - Initial Questions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map(({ id, question, placeholder }) => (
            <div key={id}>
              <label className="block text-blue-500 mb-2">
                {question}
              </label>
              <input
                type="text"
                value={answers[id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [id]: e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-black/30 border border-blue-500/30 rounded px-4 py-2 text-blue-500 placeholder:text-blue-500/30"
                required
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded px-6 py-2 text-blue-500 hover:bg-blue-500/30 transition-colors"
            >
              <Send className="w-4 h-4" />
              Start Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};