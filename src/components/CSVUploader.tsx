import React, { useState, useRef } from 'react';
import { X, Upload, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { SoundType } from '../hooks/useSound';
import { Record } from '../types';
import { getAllRecords } from '../utils/recordManager';

interface CSVUploaderProps {
  onClose: () => void;
  playSound: (type: SoundType) => void;
}

interface FieldMapping {
  csvField: string;
  appField: string;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onClose, playSound }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [step, setStep] = useState<'upload' | 'mapping' | 'processing' | 'complete'>('upload');
  const [processedRows, setProcessedRows] = useState(0);
  const [skippedRows, setSkippedRows] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const generateId = () => {
    const records = getAllRecords();
    const lastId = records[records.length - 1]?.id || 'CORP-0000';
    const lastNumber = parseInt(lastId.split('-')[1]);
    return `CORP-${String(lastNumber + 1).padStart(4, '0')}`;
  };

  const processCSV = async (file: File) => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Check for domain field
    if (!headers.includes('domain')) {
      setErrorMessage('CSV must include a "domain" column');
      return;
    }

    setCsvHeaders(headers);
    setStep('mapping');
    playSound('keypress');
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      await processCSV(file);
    } else {
      setErrorMessage('Please upload a valid CSV file');
      playSound('error');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processCSV(file);
    }
  };

  const handleMappingChange = (csvField: string, appField: string) => {
    setFieldMappings(prev => {
      const newMappings = prev.filter(m => m.csvField !== csvField);
      if (appField) {
        newMappings.push({ csvField, appField });
      }
      return newMappings;
    });
  };

  const handleProcessData = () => {
    setStep('processing');
    playSound('diskRead');
    
    // Simulate processing
    let processed = 0;
    const totalRows = 100; // Example number
    
    const processInterval = setInterval(() => {
      processed += 1;
      setProcessedRows(processed);
      
      if (processed >= totalRows) {
        clearInterval(processInterval);
        setStep('complete');
        playSound('login');
      }
    }, 50);
  };

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <>
            <div
              className={`border-2 border-dashed ${
                isDragging ? 'border-green-500' : 'border-green-500/30'
              } rounded-lg p-8 text-center transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-green-500/50" />
              <p className="text-green-500/70 mb-4">
                Drag and drop your CSV file here, or click to select
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".csv"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500/20 border border-green-500/30 rounded px-4 py-2 text-green-500 hover:bg-green-500/30 transition-colors"
              >
                Select File
              </button>
            </div>
            <div className="mt-4 text-sm text-green-500/70">
              <p className="font-bold mb-2">Required CSV Format:</p>
              <p>Must include a "domain" column. Other fields are optional.</p>
            </div>
          </>
        );

      case 'mapping':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-500 mb-4">Map CSV Fields</h3>
            <div className="space-y-2">
              {csvHeaders.map(header => (
                <div key={header} className="flex items-center gap-4">
                  <div className="w-1/3 text-green-500">{header}</div>
                  <ArrowRight className="w-4 h-4 text-green-500/50" />
                  <select
                    value={fieldMappings.find(m => m.csvField === header)?.appField || ''}
                    onChange={(e) => handleMappingChange(header, e.target.value)}
                    className="flex-1 bg-black/30 border border-green-500/30 rounded px-3 py-2"
                    disabled={header === 'domain'}
                  >
                    <option value="">Select field...</option>
                    <option value="name">Company Name</option>
                    <option value="description">Description</option>
                    <option value="ceo">CEO</option>
                    <option value="address">Address</option>
                    <option value="city">City</option>
                    <option value="country">Country</option>
                    <option value="category">Categories</option>
                    <option value="tags">Tags</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setStep('upload')}
                className="px-4 py-2 text-red-500/70 hover:text-red-500 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleProcessData}
                className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded px-6 py-2 text-green-500 hover:bg-green-500/30 transition-colors"
              >
                Process Data
              </button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="text-center py-8">
            <Upload className="w-12 h-12 mx-auto mb-4 text-green-500 animate-spin" />
            <p className="text-green-500">Processing CSV data...</p>
            <p className="text-green-500/70 mt-2">
              Processed: {processedRows} | Skipped: {skippedRows}
            </p>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-green-500">Data imported successfully!</p>
            <p className="text-green-500/70 mt-2">
              Processed {processedRows} records
              {skippedRows > 0 && ` (${skippedRows} skipped)`}
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-green-500/20 border border-green-500/30 rounded px-6 py-2 text-green-500 hover:bg-green-500/30 transition-colors"
            >
              Close
            </button>
          </div>
        );
    }
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
          <Upload className="w-6 h-6" />
          CSV Data Upload
        </h2>

        {errorMessage && (
          <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        {renderStep()}
      </div>
    </div>
  );
};

export default CSVUploader;