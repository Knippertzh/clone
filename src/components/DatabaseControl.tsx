import React, { useState } from 'react';
import { Database, RefreshCw, Download, Upload, Search, Settings } from 'lucide-react';

export const DatabaseControl: React.FC = () => {
  const [lastBackup] = useState('2024-03-19T08:00:00');
  const [dbSize] = useState('2.3 GB');
  const [totalRecords] = useState(156789);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Database className="w-6 h-6" />
          Database Control
        </h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
          <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
            <Download className="w-4 h-4" />
            Backup
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Database Size</div>
          <div className="text-4xl font-bold">{dbSize}</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Total Records</div>
          <div className="text-4xl font-bold">{totalRecords}</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Last Backup</div>
          <div className="text-xl">{new Date(lastBackup).toLocaleString()}</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Status</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xl">Healthy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-green-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Query Console
          </h3>
          <textarea
            className="w-full h-40 bg-black/30 border border-green-500/30 rounded p-4 mb-4 font-mono"
            placeholder="Enter SQL query..."
          />
          <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
            Execute Query
          </button>
        </div>

        <div className="border border-green-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Database Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Max Connections</label>
              <input
                type="number"
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                value="100"
              />
            </div>
            <div>
              <label className="block mb-2">Cache Size</label>
              <input
                type="text"
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                value="512MB"
              />
            </div>
            <div>
              <label className="block mb-2">Backup Schedule</label>
              <select className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2">
                <option>Every 6 hours</option>
                <option>Every 12 hours</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};