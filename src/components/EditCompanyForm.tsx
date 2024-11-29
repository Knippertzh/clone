import React, { useState, useEffect } from 'react';
import { X, Building2, Save, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { Record } from '../types';
import { getAllRecords } from '../utils/recordManager';

interface EditCompanyFormProps {
  record: Record;
  onClose: () => void;
  onSave: (updatedCompany: Record) => void;
}

export const EditCompanyForm: React.FC<EditCompanyFormProps> = ({ record, onClose, onSave }) => {
  const { playSound } = useSound();
  const [formData, setFormData] = useState(record);
  const [verificationFlags, setVerificationFlags] = useState<any[]>([]);

  useEffect(() => {
    // Get verification flags for this company
    const flags = Object.entries(record.verificationStatus || {})
      .filter(([_, value]) => value.flagged)
      .map(([field, value]) => ({
        field,
        ...value
      }));
    setVerificationFlags(flags);
  }, [record]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('keypress');

    // Update the company in the database
    const allRecords = getAllRecords();
    const index = allRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      allRecords[index] = {
        ...formData,
        verificationStatus: {
          ...formData.verificationStatus,
          [Object.keys(formData.verificationStatus)[0]]: {
            verified: true,
            lastChecked: new Date().toISOString(),
            verifiedBy: 'USER001' // Replace with actual user ID
          }
        }
      };
    }

    onSave(formData);
    playSound('login');
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      verificationStatus: {
        ...prev.verificationStatus,
        [field]: {
          verified: true,
          lastChecked: new Date().toISOString(),
          verifiedBy: 'USER001' // Replace with actual user ID
        }
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex justify-center p-8 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Edit Company: {record.name}
        </h2>

        {verificationFlags.length > 0 && (
          <div className="mb-6 border border-yellow-500/30 rounded-lg p-4 bg-yellow-500/10">
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <AlertTriangle className="w-5 h-5" />
              Verification Flags
            </div>
            <div className="space-y-2">
              {verificationFlags.map((flag, index) => (
                <div key={index} className="text-yellow-500/70">
                  <div>Field "{flag.field}" needs verification</div>
                  <div className="text-sm">Suggested value: {flag.suggestedValue}</div>
                  <div className="text-sm">Reason: {flag.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-green-500 mb-2">Company Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-green-500 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full h-32 bg-black/30 border border-green-500/30 rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-green-500 mb-2">CEO</label>
                <input
                  type="text"
                  value={formData.ceo}
                  onChange={(e) => handleInputChange('ceo', e.target.value)}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-green-500 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-green-500 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-green-500 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-green-500 mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* Categories and Tags */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-green-500 mb-2">Categories (comma-separated)</label>
              <input
                type="text"
                value={formData.category.join(', ')}
                onChange={(e) => handleInputChange('category', e.target.value.split(',').map(c => c.trim().toUpperCase()))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-green-500 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags.map(t => typeof t === 'string' ? t : t.name).join(', ')}
                onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(t => t.trim().toUpperCase()))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-green-500 mb-2">LinkedIn</label>
              <input
                type="text"
                value={formData.socialMedia.linkedin || ''}
                onChange={(e) => handleInputChange('socialMedia', { ...formData.socialMedia, linkedin: e.target.value })}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-green-500 mb-2">Twitter</label>
              <input
                type="text"
                value={formData.socialMedia.twitter || ''}
                onChange={(e) => handleInputChange('socialMedia', { ...formData.socialMedia, twitter: e.target.value })}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-green-500 mb-2">Images (one URL per line)</label>
            <textarea
              value={formData.images?.join('\n') || ''}
              onChange={(e) => handleInputChange('images', e.target.value.split('\n').filter(url => url.trim()))}
              className="w-full h-32 bg-black/30 border border-green-500/30 rounded px-4 py-2"
              placeholder="Enter image URLs, one per line"
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
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};