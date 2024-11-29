import React, { useState } from 'react';
import { Search, Building2 } from 'lucide-react';
import { Record } from '../types';
import { getAllRecords } from '../utils/recordManager';

interface SearchBarProps {
  onSearch: (results: Record[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  playSound: (type: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, setIsSearching, playSound }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    playSound('search');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const allRecords = getAllRecords();
    const filteredRecords = allRecords.filter(record => {
      const searchFields = [
        record.name.toLowerCase(),
        record.subject.toLowerCase(),
        record.id.toLowerCase(),
        record.country.toLowerCase(),
        record.city.toLowerCase(),
        ...(record.category?.map(cat => cat.toLowerCase()) || []),
        ...(record.tags?.map(tag => typeof tag === 'string' ? tag.toLowerCase() : tag.name.toLowerCase()) || [])
      ];
      return searchFields.some(field => field.includes(query.toLowerCase()));
    });
    
    onSearch(filteredRecords);
    setIsSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playSound('keypress');
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-500/50" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="SEARCH COMPANIES BY NAME, LOCATION, OR INDUSTRY..."
          className="w-full bg-black/30 border border-green-500/30 rounded-lg px-14 py-4 text-lg focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-500/30"
        />
        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-green-500/50" />
      </div>
    </form>
  );
};