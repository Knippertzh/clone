import React, { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { FlagPopup } from './FlagPopup';
import { useSound } from '../hooks/useSound';

interface VerificationFlagProps {
  field: string;
  value: string;
  recordId: string;
  isVerified?: boolean;
  onVerify: (field: string) => void;
  onFlag: (data: { recordId: string; fieldName: string; suggestedValue: string; reason: string }) => void;
}

export const VerificationFlag: React.FC<VerificationFlagProps> = ({
  field,
  value,
  recordId,
  isVerified,
  onVerify,
  onFlag
}) => {
  const [showFlagPopup, setShowFlagPopup] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const { playSound } = useSound();

  const handleVerify = () => {
    playSound('keypress');
    onVerify(field);
    setShowVerificationMessage(true);
    setTimeout(() => setShowVerificationMessage(false), 2000);
  };

  const handleFlag = () => {
    playSound('error');
    setShowFlagPopup(true);
  };

  return (
    <div className="flex items-center gap-2 group relative">
      <span className="flex-1">{value}</span>
      <div className="flex items-center gap-2">
        <span
          onClick={handleVerify}
          className={`cursor-pointer opacity-0 group-hover:opacity-100 transition-all ${
            isVerified ? 'text-green-500' : 'text-green-500/30 hover:text-green-500'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
        </span>
        <span
          onClick={handleFlag}
          className="cursor-pointer opacity-0 group-hover:opacity-100 text-red-500/30 hover:text-red-500 transition-all"
        >
          <AlertTriangle className="w-4 h-4" />
        </span>
      </div>

      {showVerificationMessage && (
        <div className="absolute right-0 top-6 bg-green-500/90 text-black px-3 py-1 rounded text-sm animate-fade-in-out">
          Thank you for verifying this information
        </div>
      )}

      {showFlagPopup && (
        <FlagPopup
          recordId={recordId}
          fieldName={field}
          currentValue={value}
          onClose={() => setShowFlagPopup(false)}
          onSubmit={onFlag}
        />
      )}
    </div>
  );
};