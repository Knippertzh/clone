import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface SecurityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  ipAddress: string;
}

interface SecurityStatus {
  encryptionEnabled: boolean;
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
  sessionTimeout: number;
}

export const useSecurityFeatures = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    encryptionEnabled: true,
    lastPasswordChange: new Date().toISOString(),
    twoFactorEnabled: false,
    sessionTimeout: 30
  });
  const { user } = useAuth();

  const logSecurityEvent = (action: string) => {
    const newLog: SecurityLog = {
      id: crypto.randomUUID(),
      userId: user?.id || '',
      action,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1' // In a real app, get from the server
    };
    setSecurityLogs(prev => [...prev, newLog]);
  };

  const toggleTwoFactor = () => {
    setSecurityStatus(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
    logSecurityEvent('2FA_TOGGLE');
  };

  const updateSessionTimeout = (minutes: number) => {
    setSecurityStatus(prev => ({
      ...prev,
      sessionTimeout: minutes
    }));
    logSecurityEvent('SESSION_TIMEOUT_UPDATE');
  };

  return {
    securityLogs,
    securityStatus,
    logSecurityEvent,
    toggleTwoFactor,
    updateSessionTimeout
  };
};