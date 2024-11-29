import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface FlagPopupProps {
  recordId: string;
  fieldName: string;
  currentValue: string;
  onClose: () => void;
  onSubmit: (data: { recordId: string; fieldName: string; suggestedValue: string; reason: string }) => void;
}

export const FlagPopup: React.FC<FlagPopupProps> = ({ recordId, fieldName, currentValue, onClose, onSubmit }) => {
  const { playSound } = useSound();
  const [suggestedValue, setSuggestedValue] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('error');
    onSubmit({
      recordId,
      fieldName,
      suggestedValue,
      reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-8">
      <div className="relative w-full max-w-lg bg-black/80 border border-red-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Flag Information for Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-500 mb-2">Current Value</label>
            <input
              type="text"
              value={currentValue}
              disabled
              className="w-full bg-black/30 border border-red-500/30 rounded px-4 py-2 text-red-500/50"
            />
          </div>

          <div>
            <label className="block text-red-500 mb-2">Suggested Value</label>
            <input
              type="text"
              required
              value={suggestedValue}
              onChange={(e) => setSuggestedValue(e.target.value)}
              className="w-full bg-black/30 border border-red-500/30 rounded px-4 py-2 text-red-500 focus:outline-none focus:border-red-500"
              placeholder="Enter the correct information"
            />
          </div>

          <div>
            <label className="block text-red-500 mb-2">Reason for Flag</label>
            <textarea
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-32 bg-black/30 border border-red-500/30 rounded px-4 py-2 text-red-500 focus:outline-none focus:border-red-500"
              placeholder="Explain why this information needs to be updated..."
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
              className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded px-6 py-2 text-red-500 hover:bg-red-500/30 transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Flag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};