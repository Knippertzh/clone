import React, { useState, useEffect } from 'react';
import { X, Tag, Search, Globe, Building2, Link } from 'lucide-react';
import { Record } from '../types';
import { getAllRecords } from '../utils/recordManager';
import { useSound } from '../hooks/useSound';

interface TagSearchPopupProps {
  tag: string;
  onClose: () => void;
}

export const TagSearchPopup: React.FC<TagSearchPopupProps> = ({ tag, onClose }) => {
  const [results, setResults] = useState<Record[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const { playSound } = useSound();

  useEffect(() => {
    const searchByTag = async () => {
      playSound('search');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const allRecords = getAllRecords();
      const matchingRecords = allRecords.filter(record => 
        record.tags.some(t => 
          (typeof t === 'string' && t === tag) || 
          (typeof t === 'object' && t.name === tag)
        )
      );
      
      setResults(matchingRecords);
      setIsSearching(false);
    };

    searchByTag();
  }, [tag, playSound]);

  const renderTagSource = (record: Record) => {
    const tagInfo = record.tags.find(t => 
      (typeof t === 'object' && t.name === tag)
    );

    if (typeof tagInfo === 'object' && tagInfo.source) {
      return (
        <div className="mb-4 border border-green-500/30 rounded-lg p-4">
          <div className="text-green-500 mb-2">Source for {record.name}:</div>
          <a
            href={tagInfo.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500/70 hover:text-green-500 flex items-center gap-2 mb-1"
          >
            <Link className="w-4 h-4" />
            {tagInfo.source}
          </a>
          {tagInfo.description && (
            <div className="text-green-500/50 text-sm mt-2">
              {tagInfo.description}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-2xl bg-black/80 border border-green-500/30 rounded-lg p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Tag className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-green-500">
              Companies Tagged: {tag}
            </h2>
          </div>

          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <Search className="w-8 h-8 animate-spin text-green-500" />
            </div>
          ) : (
            <div className="space-y-6">
              {results.map(record => (
                <div key={record.id}>
                  {renderTagSource(record)}
                  <div className="border border-green-500/30 rounded-lg p-4 hover:bg-green-500/5 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-500 font-bold">{record.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-500/70 text-sm">
                      <Globe className="w-4 h-4" />
                      <span>{record.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};