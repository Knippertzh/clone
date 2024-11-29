import React, { useState, useEffect } from 'react';
import { X, Search, Building2, AlertTriangle } from 'lucide-react';
import { Record } from '../types';
import { getAllRecords } from '../utils/recordManager';
import { useSound } from '../hooks/useSound';

interface SelectCompanyPopupProps {
  onClose: () => void;
  onSelect: (company: Record) => void;
}

export const SelectCompanyPopup: React.FC<SelectCompanyPopupProps> = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<Record[]>([]);
  const { playSound } = useSound();

  useEffect(() => {
    const records = getAllRecords();
    const companiesWithFlags = records.map(company => ({
      ...company,
      flagCount: Object.values(company.verificationStatus || {})
        .filter(status => status.flagged).length
    }));
    
    // Sort companies with flags first
    companiesWithFlags.sort((a, b) => (b.flagCount || 0) - (a.flagCount || 0));
    setCompanies(companiesWithFlags);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = getAllRecords().filter(company => 
      company.name.toLowerCase().includes(term.toLowerCase()) ||
      company.id.toLowerCase().includes(term.toLowerCase())
    );
    setCompanies(filtered);
  };

  const handleSelect = (company: Record) => {
    playSound('keypress');
    onSelect(company);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-lg bg-black/80 border border-green-500/30 rounded-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Select Company to Edit
        </h2>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {companies.map(company => {
            const flagCount = Object.values(company.verificationStatus || {})
              .filter(status => status.flagged).length;

            return (
              <button
                key={company.id}
                onClick={() => handleSelect(company)}
                className={`w-full text-left p-3 border rounded hover:bg-green-500/10 transition-colors ${
                  flagCount > 0 ? 'border-yellow-500/30' : 'border-green-500/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-green-500">{company.name}</div>
                    <div className="text-green-500/70 text-sm">{company.id}</div>
                  </div>
                  {flagCount > 0 && (
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      {flagCount} flag{flagCount > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};