import React, { useState } from 'react';
import { Layout, Users, Database, Bot, Palette, Puzzle, Settings, BarChart } from 'lucide-react';
import { SecurityPanel } from './SecurityPanel';
import { UserManagement } from './UserManagement';
import { DatabaseControl } from './DatabaseControl';
import { AIAgentControl } from './AIAgentControl';
import { DesignSystem } from './DesignSystem';
import { PluginManager } from './PluginManager';
import { SystemMetrics } from './SystemMetrics';

type AdminSection = 'users' | 'database' | 'ai' | 'design' | 'plugins' | 'security' | 'metrics';

export const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('metrics');

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'database':
        return <DatabaseControl />;
      case 'ai':
        return <AIAgentControl />;
      case 'design':
        return <DesignSystem />;
      case 'plugins':
        return <PluginManager />;
      case 'security':
        return <SecurityPanel />;
      case 'metrics':
        return <SystemMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-green-500/30 p-6">
        <div className="flex items-center gap-2 mb-8">
          <Layout className="w-6 h-6" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('metrics')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'metrics'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <BarChart className="w-5 h-5" />
            System Metrics
          </button>
          <button
            onClick={() => setActiveSection('users')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'users'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <Users className="w-5 h-5" />
            User Management
          </button>
          <button
            onClick={() => setActiveSection('database')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'database'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <Database className="w-5 h-5" />
            Database Control
          </button>
          <button
            onClick={() => setActiveSection('ai')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'ai'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <Bot className="w-5 h-5" />
            AI Agents
          </button>
          <button
            onClick={() => setActiveSection('design')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'design'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <Palette className="w-5 h-5" />
            Design System
          </button>
          <button
            onClick={() => setActiveSection('plugins')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'plugins'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <Puzzle className="w-5 h-5" />
            Plugin Manager
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              activeSection === 'security'
                ? 'bg-green-500/20 text-green-500'
                : 'text-green-500/70 hover:bg-green-500/10'
            }`}
          >
            <Settings className="w-5 h-5" />
            Security
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};