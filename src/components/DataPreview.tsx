import React, { useState } from 'react';
import { X, Download, Search } from 'lucide-react';

interface DataPreviewProps {
  database: string;
  onClose: () => void;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ database, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Mock data - replace with actual CSV data
  const mockData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Company ${i + 1}`,
    email: `company${i + 1}@example.com`,
    phone: `+1234567${i.toString().padStart(4, '0')}`,
    address: `${i + 1} Business Street`
  }));

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-8">
      <div className="relative w-full max-w-6xl h-[90vh] bg-black border border-green-500/30 rounded-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-500">{database} Data Preview</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="bg-black/30 border border-green-500/30 rounded pl-10 pr-4 py-2 text-green-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-auto h-[calc(100%-8rem)] border border-green-500/30 rounded-lg">
          <table className="w-full">
            <thead className="bg-green-500/10 sticky top-0">
              <tr>
                {Object.keys(mockData[0]).map(header => (
                  <th key={header} className="px-4 py-2 text-left text-green-500">
                    {header.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData
                .filter(row =>
                  Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-green-500/30 hover:bg-green-500/5"
                  >
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-4 py-2 text-green-500/70">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center text-green-500/70">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, mockData.length)} of {mockData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-green-500/30 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage * itemsPerPage >= mockData.length}
              className="px-3 py-1 border border-green-500/30 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};