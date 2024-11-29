import React from 'react';
import { BarChart, TrendingUp, Clock, Activity } from 'lucide-react';

export const SystemMetrics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart className="w-6 h-6" />
          System Metrics
        </h2>
        <div className="flex items-center gap-2 text-green-500/70">
          <Clock className="w-4 h-4" />
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">CPU Usage</div>
          <div className="text-4xl font-bold">32%</div>
          <div className="mt-2 w-full bg-green-500/10 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }} />
          </div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Memory</div>
          <div className="text-4xl font-bold">4.2GB</div>
          <div className="mt-2 w-full bg-green-500/10 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Disk Space</div>
          <div className="text-4xl font-bold">234GB</div>
          <div className="mt-2 w-full bg-green-500/10 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
          </div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Network</div>
          <div className="text-4xl font-bold">2.3MB/s</div>
          <div className="mt-2 w-full bg-green-500/10 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-green-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>API Response Time</span>
              <span className="text-green-500">124ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database Queries/sec</span>
              <span className="text-green-500">847</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Sessions</span>
              <span className="text-green-500">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Error Rate</span>
              <span className="text-green-500">0.02%</span>
            </div>
          </div>
        </div>

        <div className="border border-green-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Trends
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Request Success Rate</span>
                <span className="text-green-500">99.98%</span>
              </div>
              <div className="w-full bg-green-500/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.98%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>Cache Hit Rate</span>
                <span className="text-green-500">94.5%</span>
              </div>
              <div className="w-full bg-green-500/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.5%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span>System Uptime</span>
                <span className="text-green-500">99.99%</span>
              </div>
              <div className="w-full bg-green-500/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.99%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};