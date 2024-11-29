import React, { useState } from 'react';
import { X, Download, Globe, Building2, Mail, Phone, Hash, FileText, CheckCircle, AlertCircle, TrendingUp, Image } from 'lucide-react';
import { Record } from '../types';
import { TagSearchPopup } from './TagSearchPopup';
import { VerificationPopup } from './VerificationPopup';
import { CEOViewer } from './CEOViewer';
import { CompetitorAnalysis } from './CompetitorAnalysis';
import { useVerification } from '../hooks/useVerification';
import { format } from 'date-fns';
import { useSound } from '../hooks/useSound';

interface RecordViewerProps {
  record: Record;
  onClose: () => void;
}

export const RecordViewer: React.FC<RecordViewerProps> = ({ record, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showCEODetails, setShowCEODetails] = useState(false);
  const [showCompetitors, setShowCompetitors] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [verificationPopup, setVerificationPopup] = useState<{
    show: boolean;
    action: 'verify' | 'flag' | null;
    recordId?: string;
    fieldName?: string;
  }>({ show: false, action: null });
  const { logVerification } = useVerification('USER001');
  const { playSound } = useSound();

  const handleVerify = (field: string) => {
    logVerification(record.id, field, 'verified');
    playSound('keypress');
    setVerificationPopup({ show: true, action: 'verify', recordId: record.id, fieldName: field });
  };

  const handleFlag = (field: string) => {
    logVerification(record.id, field, 'flagged');
    playSound('error');
    setVerificationPopup({ show: true, action: 'flag', recordId: record.id, fieldName: field });
  };

  const handleCEOClick = () => {
    playSound('keypress');
    setShowCEODetails(true);
  };

  const handleImagesClick = () => {
    playSound('keypress');
    setShowImageGallery(true);
  };

  const ImageGallery = () => (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm">
      <div className="relative h-full flex items-center justify-center p-8">
        <button
          onClick={() => setShowImageGallery(false)}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="w-full max-w-6xl">
          <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
            <Image className="w-6 h-6" />
            {record.name} - Image Gallery
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {record.images?.map((img, index) => (
              <div key={index} className="aspect-video relative group">
                <img
                  src={img}
                  alt={`${record.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border border-green-500/30"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400"
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const VerificationFlag = ({ field, value }: { field: string; value: string }) => (
    <div className="flex items-center gap-2 group">
      <span className="flex-1">{value}</span>
      <div className="flex items-center gap-2">
        <div
          onClick={() => handleVerify(field)}
          className={`cursor-pointer opacity-0 group-hover:opacity-100 transition-all ${
            record.verificationStatus?.[field]?.verified ? 'text-green-500' : 'text-green-500/30 hover:text-green-500'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
        </div>
        <div
          onClick={() => handleFlag(field)}
          className="cursor-pointer opacity-0 group-hover:opacity-100 text-red-500/30 hover:text-red-500 transition-all"
        >
          <AlertCircle className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  const renderTag = (tag: string | { name: string; source: string; description: string }) => {
    const tagName = typeof tag === 'string' ? tag : tag.name;
    return (
      <button
        key={tagName}
        onClick={() => setSelectedTag(tagName)}
        className="px-2 py-1 bg-green-500/10 hover:bg-green-500/20 rounded text-sm transition-colors cursor-pointer"
      >
        {tagName}
      </button>
    );
  };

  const exportAsTxt = () => {
    const content = Object.entries(record)
      .filter(([key]) => key !== 'verificationStatus')
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${key.toUpperCase()}: ${JSON.stringify(value, null, 2)}`;
        }
        return `${key.toUpperCase()}: ${value}`;
      })
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.id}_${format(new Date(), 'yyyyMMdd_HHmmss')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    playSound('search');
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
          <div className="absolute top-4 right-4 flex gap-4">
            <button
              onClick={exportAsTxt}
              className="text-green-500/70 hover:text-green-500 transition-colors"
            >
              <Download className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="text-red-500/70 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 font-mono">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Company Name and Logo */}
              <div>
                <h2 className="text-2xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6" />
                  <VerificationFlag field="name" value={record.name} />
                </h2>
                {record.logo && (
                  <img src={record.logo} alt="Company Logo" className="w-32 h-32 object-contain mb-4" />
                )}
                {record.images && record.images.length > 0 && (
                  <button
                    onClick={handleImagesClick}
                    className="flex items-center gap-2 text-green-500/70 hover:text-green-500 transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    View Company Images ({record.images.length})
                  </button>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <div className="text-green-500/70">ADDRESS:</div>
                <VerificationFlag field="address" value={record.address} />
                <VerificationFlag field="location" value={`${record.zipCode} ${record.city}`} />
                <VerificationFlag field="country" value={record.country} />
              </div>

              {/* Identification */}
              <div className="space-y-2">
                <div className="text-green-500/70">IDENTIFICATION:</div>
                <VerificationFlag field="taxId" value={`TAX ID: ${record.taxId}`} />
              </div>

              {/* Management */}
              <div className="space-y-2">
                <div className="text-green-500/70">MANAGEMENT:</div>
                <div
                  onClick={handleCEOClick}
                  className="w-full text-left hover:bg-green-500/10 rounded transition-colors p-2 cursor-pointer"
                >
                  <VerificationFlag field="ceo" value={`CEO: ${record.ceo}`} />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <div className="text-green-500/70">CONTACT:</div>
                {record.socialMedia.linkedin && (
                  <VerificationFlag
                    field="linkedin"
                    value={`LinkedIn: ${record.socialMedia.linkedin}`}
                  />
                )}
                {record.socialMedia.twitter && (
                  <VerificationFlag
                    field="twitter"
                    value={`Twitter: ${record.socialMedia.twitter}`}
                  />
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Classification */}
              <div className="space-y-2">
                <div className="text-green-500/70">CLASSIFICATION:</div>
                <div className="flex flex-wrap gap-2">
                  {record.category.map((cat) => (
                    <span key={cat} className="px-2 py-1 bg-green-500/10 rounded text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="text-green-500/70">TAGS:</div>
                <div className="flex flex-wrap gap-2">
                  {record.tags.map(renderTag)}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <div className="text-green-500/70">LANGUAGES:</div>
                <div className="flex flex-wrap gap-2">
                  {record.language.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-green-500/10 rounded text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="text-green-500/70">DESCRIPTION:</div>
                <VerificationFlag field="description" value={record.description} />
              </div>

              {/* Metrics */}
              {record.metrics && (
                <div className="space-y-4">
                  <div className="text-green-500/70">METRICS:</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-green-500/30 rounded-lg p-4">
                      <div className="text-sm text-green-500/70 mb-1">Trust Score</div>
                      <div className="text-xl text-green-500">{record.metrics.trustScore}/100</div>
                    </div>
                    <div className="border border-green-500/30 rounded-lg p-4">
                      <div className="text-sm text-green-500/70 mb-1">Deal Probability</div>
                      <div className="text-xl text-green-500">{record.metrics.dealProbability}%</div>
                    </div>
                  </div>
                  <div className="border border-green-500/30 rounded-lg p-4">
                    <div className="text-sm text-green-500/70 mb-2">Annual Revenue</div>
                    <div className="text-xl text-green-500">${record.metrics.annualRevenue}M</div>
                    <div className="text-sm text-green-500/50 mt-1">
                      YoY Growth: {record.metrics.yearOverYearGrowth}%
                    </div>
                  </div>
                </div>
              )}

              {/* Top Products */}
              {record.metrics?.topProducts && (
                <div className="space-y-4">
                  <div className="text-green-500/70">TOP PRODUCTS:</div>
                  <div className="space-y-2">
                    {record.metrics.topProducts.map((product, index) => (
                      <div key={product.name} className="border border-green-500/30 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-green-500">{product.name}</div>
                          <div className="text-green-500/70">${product.annualRevenue}M</div>
                        </div>
                        <p className="text-green-500/70 text-sm mb-2">{product.description}</p>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500/50 hover:text-green-500 text-sm flex items-center gap-1"
                        >
                          <Globe className="w-4 h-4" />
                          {product.url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div className="space-y-2">
                <div className="text-green-500/70">SOURCE:</div>
                <VerificationFlag field="sourceFound" value={record.sourceFound} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTag && (
        <TagSearchPopup
          tag={selectedTag}
          onClose={() => setSelectedTag(null)}
        />
      )}

      {verificationPopup.show && (
        <VerificationPopup
          action={verificationPopup.action}
          recordId={verificationPopup.recordId}
          fieldName={verificationPopup.fieldName}
          onClose={() => setVerificationPopup({ show: false, action: null })}
        />
      )}

      {showCEODetails && (
        <CEOViewer
          ceoName={record.ceo}
          onClose={() => setShowCEODetails(false)}
          record={record}
        />
      )}

      {showCompetitors && (
        <CompetitorAnalysis
          company={record}
          onClose={() => setShowCompetitors(false)}
        />
      )}

      {showImageGallery && <ImageGallery />}
    </div>
  );
};