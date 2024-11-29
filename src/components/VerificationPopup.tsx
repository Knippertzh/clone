import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { addVerificationEntry } from '../utils/verificationManager';
import { useAuth } from '../hooks/useAuth';

interface VerificationPopupProps {
  action: 'verify' | 'flag' | null;
  recordId?: string;
  fieldName?: string;
  onClose: () => void;
}

export const VerificationPopup: React.FC<VerificationPopupProps> = ({
  action,
  recordId,
  fieldName,
  onClose
}) => {
  const [info, setInfo] = useState('');
  const { playSound } = useSound();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (recordId && fieldName && action && user) {
      addVerificationEntry(recordId, {
        action,
        fieldName,
        info,
        verifiedBy: user.id
      });

      playSound(action === 'flag' ? 'error' : 'login');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-lg bg-black/80 border border-green-500/30 rounded-lg p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            {action === 'verify' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            )}
            <h2 className="text-xl font-bold text-green-500">
              {action === 'verify' ? 'Verify Information' : 'Flag for Review'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-green-500/70 mb-2">
                {action === 'verify' 
                  ? 'Add verification notes (optional):'
                  : 'Please describe the issue:'}
              </label>
              <textarea
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="w-full h-32 bg-black/30 border border-green-500/30 rounded p-3 text-green-500 focus:outline-none focus:border-green-500 transition-colors"
                placeholder={action === 'verify'
                  ? 'Enter any additional verification notes...'
                  : 'Describe why this information needs review...'}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-red-500/70 hover:text-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded px-6 py-2 text-green-500 hover:bg-green-500/30 transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};