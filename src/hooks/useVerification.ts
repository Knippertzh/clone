import { useState, useCallback } from 'react';
import verificationLogs from '../data/verificationLogs.json';
import { VerificationLog } from '../types';

export const useVerification = (userId: string) => {
  const [logs, setLogs] = useState<VerificationLog[]>(verificationLogs.logs);

  const logVerification = useCallback((
    recordId: string,
    field: string,
    action: 'verified' | 'flagged'
  ) => {
    const newLog: VerificationLog = {
      recordId,
      field,
      timestamp: new Date().toISOString(),
      action,
      userId
    };
    
    setLogs(prevLogs => [...prevLogs, newLog]);
    // In a real app, this would be persisted to a database
  }, [userId]);

  return { logs, logVerification };
};