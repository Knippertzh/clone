import React, { useState } from 'react';
import { X, Database } from 'lucide-react';
import { DatabaseVisualization } from './DatabaseVisualization';
import { DataPreview } from './DataPreview';

interface DatabaseManagementProps {
  onClose: () => void;
}

export const DatabaseManagement: React.FC<DatabaseManagementProps> = ({ onClose }) => {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-6xl h-[80vh] bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2 relative z-10">
          <Database className="w-6 h-6" />
          Database Management
        </h2>

        <div className="relative h-[calc(100%-4rem)]">
          <DatabaseVisualization onDatabaseSelect={setSelectedDatabase} />
        </div>

        {selectedDatabase && (
          <DataPreview
            database={selectedDatabase}
            onClose={() => setSelectedDatabase(null)}
          />
        )}
      </div>
    </div>
  );
};