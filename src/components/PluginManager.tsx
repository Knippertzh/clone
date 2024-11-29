import React, { useState } from 'react';
import { Puzzle, Download, RefreshCw, Settings, AlertTriangle } from 'lucide-react';

interface PluginData {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'update-available';
  author: string;
  lastUpdated: string;
}

export const PluginManager: React.FC = () => {
  const [plugins] = useState<PluginData[]>([
    {
      id: '1',
      name: 'Data Importer',
      version: '1.2.0',
      status: 'active',
      author: 'Plugilo',
      lastUpdated: '2024-03-19T10:30:00'
    },
    {
      id: '2',
      name: 'Analytics Engine',
      version: '2.0.1',
      status: 'update-available',
      author: 'Plugilo',
      lastUpdated: '2024-03-18T15:45:00'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Puzzle className="w-6 h-6" />
          Plugin Manager
        </h2>
        <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
          <Download className="w-4 h-4" />
          Install Plugin
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Installed</div>
          <div className="text-4xl font-bold">12</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Active</div>
          <div className="text-4xl font-bold">8</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Updates Available</div>
          <div className="text-4xl font-bold">3</div>
        </div>
      </div>

      <div className="border border-green-500/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-500/10">
            <tr>
              <th className="px-6 py-3 text-left">Plugin</th>
              <th className="px-6 py-3 text-left">Version</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Last Updated</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plugins.map(plugin => (
              <tr key={plugin.id} className="border-t border-green-500/30">
                <td className="px-6 py-4">{plugin.name}</td>
                <td className="px-6 py-4">{plugin.version}</td>
                <td className="px-6 py-4">{plugin.author}</td>
                <td className="px-6 py-4">
                  {new Date(plugin.lastUpdated).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    plugin.status === 'active'
                      ? 'bg-green-500/20 text-green-500'
                      : plugin.status === 'update-available'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {plugin.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {plugin.status === 'update-available' && (
                      <button className="p-1 hover:bg-green-500/20 rounded">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1 hover:bg-green-500/20 rounded">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-red-500/20 rounded text-red-500">
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};