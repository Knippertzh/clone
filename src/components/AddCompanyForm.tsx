import React, { useState } from 'react';
import { X, Building2, Save, Image as ImageIcon, Bot, AlertCircle } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { generateNewId } from '../utils/recordManager';
import { AIResearchPopup } from './AIResearchPopup';

interface AddCompanyFormProps {
  onClose: () => void;
  onSave: (company: any) => void;
}

export const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ onClose, onSave }) => {
  const { playSound } = useSound();
  const [showAIResearch, setShowAIResearch] = useState(false);
  const [formData, setFormData] = useState({
    domain: '',
    name: '',
    description: '',
    logo: '',
    ceo: '',
    country: '',
    city: '',
    category: [] as string[],
    tags: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.domain) return;

    playSound('keypress');

    const newCompany = {
      id: generateNewId(),
      status: 'ACTIVE',
      level: 'PUBLIC',
      lastAccessed: new Date().toISOString().split('T')[0],
      subject: formData.name || formData.domain,
      details: formData.description || 'Company details pending',
      requiredClearance: 'PUBLIC',
      name: formData.name || formData.domain,
      country: formData.country || 'Unknown',
      city: formData.city || 'Unknown',
      logo: formData.logo || 'https://via.placeholder.com/150',
      category: formData.category.length ? formData.category : ['UNCATEGORIZED'],
      tags: formData.tags.length ? formData.tags : [],
      description: formData.description || 'Company description pending',
      ceo: formData.ceo || 'Unknown',
      language: ['ENGLISH'],
      verificationStatus: {}
    };

    onSave(newCompany);
    playSound('login');
    onClose();
  };

  const handleAIResearch = () => {
    if (!formData.domain) {
      alert('Please enter a domain first');
      return;
    }
    setShowAIResearch(true);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex justify-center p-8 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Add New Company
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-500 mb-2">
              Domain (Required)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.domain}
              onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              placeholder="company.com"
            />
          </div>

          <div>
            <label className="block text-green-500 mb-2">Company Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              placeholder="Company Name"
            />
          </div>

          <div>
            <label className="block text-green-500 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 h-32"
              placeholder="Company description..."
            />
          </div>

          <div>
            <label className="block text-green-500 mb-2">Logo URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                className="flex-1 bg-black/30 border border-green-500/30 rounded px-4 py-2"
                placeholder="https://..."
              />
              <button
                type="button"
                className="bg-green-500/20 border border-green-500/30 rounded px-4"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">CEO</label>
            <input
              type="text"
              value={formData.ceo}
              onChange={(e) => setFormData(prev => ({ ...prev, ceo: e.target.value }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              placeholder="CEO name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-green-500 mb-2">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block text-green-500 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                placeholder="City"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Categories (comma-separated)</label>
            <input
              type="text"
              value={formData.category.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                category: e.target.value.split(',').map(c => c.trim().toUpperCase())
              }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              placeholder="TECHNOLOGY, SOFTWARE, etc."
            />
          </div>

          <div>
            <label className="block text-green-500 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(t => t.trim().toUpperCase())
              }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
              placeholder="AI, CLOUD, etc."
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleAIResearch}
              className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded px-6 py-2 text-blue-500 hover:bg-blue-500/30 transition-colors"
            >
              <Bot className="w-4 h-4" />
              AI Research
            </button>
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
              Save to Database
            </button>
          </div>
        </form>
      </div>

      {showAIResearch && (
        <AIResearchPopup
          domain={formData.domain}
          onClose={() => setShowAIResearch(false)}
        />
      )}
    </div>
  );
};