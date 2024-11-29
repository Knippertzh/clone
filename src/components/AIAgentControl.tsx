import React, { useState } from 'react';
import { Bot, Zap, Brain, Settings, Activity } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  lastRun: string;
  performance: number;
}

export const AIAgentControl: React.FC = () => {
  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Data Analyzer',
      type: 'Analysis',
      status: 'active',
      lastRun: '2024-03-19T10:30:00',
      performance: 92
    },
    {
      id: '2',
      name: 'Market Predictor',
      type: 'Prediction',
      status: 'active',
      lastRun: '2024-03-19T10:15:00',
      performance: 88
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="w-6 h-6" />
          AI Agent Control
        </h2>
        <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
          <Zap className="w-4 h-4" />
          Train Agents
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Active Agents</div>
          <div className="text-4xl font-bold">8</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Tasks/Hour</div>
          <div className="text-4xl font-bold">247</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Avg. Performance</div>
          <div className="text-4xl font-bold">91%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="border border-green-500/30 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  {agent.name}
                </h3>
                <div className="text-green-500/70">{agent.type}</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-green-500/20 rounded">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-green-500/20 rounded">
                  <Activity className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  agent.status === 'active'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {agent.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Run</span>
                <span>{new Date(agent.lastRun).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Performance</span>
                <span>{agent.performance}%</span>
              </div>
              <div className="w-full bg-green-500/10 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${agent.performance}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};