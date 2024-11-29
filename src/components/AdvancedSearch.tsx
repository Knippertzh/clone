import React, { useState } from 'react';
import { Filter, Search, Save, X } from 'lucide-react';
import { Record } from '../types';
import { useSound } from '../hooks/useSound';

interface AdvancedSearchProps {
  onSearch: (results: Record[]) => void;
  onClose: () => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, onClose }) => {
  const { playSound } = useSound();
  const [filters, setFilters] = useState({
    industry: '',
    country: '',
    revenueMin: '',
    revenueMax: '',
    employeeCount: '',
    foundedAfter: '',
    foundedBefore: '',
    tags: '',
    booleanOperator: 'AND'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('search');
    // Implement advanced search logic here
    onSearch([]);
  };

  const saveFilter = () => {
    playSound('keypress');
    // Save current filter configuration
    localStorage.setItem('savedFilters', JSON.stringify(filters));
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Filter className="w-6 h-6" />
          Advanced Search
        </h2>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-green-500 mb-2">Industry</label>
              <input
                type="text"
                value={filters.industry}
                onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="e.g., TECHNOLOGY, SOFTWARE"
              />
            </div>
            <div>
              <label className="block text-green-500 mb-2">Country</label>
              <input
                type="text"
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="e.g., Germany"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-green-500 mb-2">Revenue Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.revenueMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, revenueMin: e.target.value }))}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={filters.revenueMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, revenueMax: e.target.value }))}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label className="block text-green-500 mb-2">Employee Count</label>
              <input
                type="number"
                value={filters.employeeCount}
                onChange={(e) => setFilters(prev => ({ ...prev, employeeCount: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Minimum employees"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-green-500 mb-2">Founded Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.foundedAfter}
                  onChange={(e) => setFilters(prev => ({ ...prev, foundedAfter: e.target.value }))}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                />
                <input
                  type="date"
                  value={filters.foundedBefore}
                  onChange={(e) => setFilters(prev => ({ ...prev, foundedBefore: e.target.value }))}
                  className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-green-500 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={filters.tags}
                onChange={(e) => setFilters(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="e.g., AI, CLOUD, SAAS"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Boolean Operator</label>
            <select
              value={filters.booleanOperator}
              onChange={(e) => setFilters(prev => ({ ...prev, booleanOperator: e.target.value }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
            >
              <option value="AND">AND - Match all criteria</option>
              <option value="OR">OR - Match any criteria</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={saveFilter}
              className="flex items-center gap-2 px-4 py-2 text-green-500/70 hover:text-green-500 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Filter
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded px-6 py-2 text-green-500 hover:bg-green-500/30 transition-colors"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};