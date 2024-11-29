import React from 'react';
import { Shield, Key, Clock, List } from 'lucide-react';
import { useSecurityFeatures } from '../hooks/useSecurityFeatures';

export const SecurityPanel: React.FC = () => {
  const {
    securityLogs,
    securityStatus,
    toggleTwoFactor,
    updateSessionTimeout
  } = useSecurityFeatures();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Security Status */}
        <div className="border border-green-500/30 rounded-lg p-4">
          <h3 className="text-green-500 flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4" />
            Security Status
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Encryption</span>
              <span className="text-green-500">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span>Last Password Change</span>
              <span className="text-green-500/70">
                {new Date(securityStatus.lastPasswordChange).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Two-Factor Auth</span>
              <button
                onClick={toggleTwoFactor}
                className={`px-3 py-1 rounded ${
                  securityStatus.twoFactorEnabled
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                {securityStatus.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Session Settings */}
        <div className="border border-green-500/30 rounded-lg p-4">
          <h3 className="text-green-500 flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4" />
            Session Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-green-500/70 mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={securityStatus.sessionTimeout}
                onChange={(e) => updateSessionTimeout(Number(e.target.value))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-3 py-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="border border-green-500/30 rounded-lg p-4">
        <h3 className="text-green-500 flex items-center gap-2 mb-4">
          <List className="w-4 h-4" />
          Security Logs
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {securityLogs.map((log) => (
            <div
              key={log.id}
              className="text-sm border border-green-500/10 rounded p-2"
            >
              <div className="flex justify-between text-green-500/70">
                <span>{log.action}</span>
                <span>{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <div className="text-green-500/50 text-xs">
                User: {log.userId} | IP: {log.ipAddress}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};