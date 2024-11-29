import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Award, History, Lightbulb, Rocket, ArrowLeft } from 'lucide-react';
import { getCEOInfo } from '../data/ceos';
import { useSound } from '../hooks/useSound';
import { Record } from '../types';
import { ManagementViewer } from './ManagementViewer';

interface CEOViewerProps {
  ceoName: string;
  onClose: () => void;
  record?: Record;
}

export const CEOViewer: React.FC<CEOViewerProps> = ({ ceoName, onClose, record }) => {
  const [showContent, setShowContent] = useState(false);
  const [selectedCEO, setSelectedCEO] = useState(ceoName);
  const [showManagement, setShowManagement] = useState<{ type: string; id: string } | null>(null);
  const { playSound } = useSound();
  const ceoInfo = getCEOInfo(selectedCEO);

  useEffect(() => {
    const loadContent = async () => {
      playSound('diskRead');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowContent(true);
    };
    loadContent();
  }, [playSound, selectedCEO]);

  const handleCEOChange = (name: string) => {
    setShowContent(false);
    setSelectedCEO(name);
  };

  const handleLinkClick = (type: string, id: string) => {
    setShowManagement({ type, id });
  };

  const renderText = (text: string) => {
    const linkRegex = /<link type='([^']+)' id='([^']+)'>([^<]+)<\/link>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the link
      const [_, type, id, label] = match;
      parts.push(
        <button
          key={match.index}
          onClick={() => handleLinkClick(type, id)}
          className="text-blue-500 hover:text-blue-400 underline"
        >
          {label}
        </button>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  if (!ceoInfo) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="w-full max-w-4xl bg-black/80 border border-red-500/30 rounded-lg p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-red-500 text-center">CEO information not found.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full flex items-start justify-center p-8 overflow-y-auto">
        {!showContent ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-green-500 text-2xl font-mono animate-pulse">
              LOADING CEO PROFILE...
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous CEOs Navigation */}
            {record?.previousCEOs && selectedCEO !== record.ceo && (
              <button
                onClick={() => handleCEOChange(record.ceo)}
                className="absolute top-4 left-4 text-green-500/70 hover:text-green-500 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Current CEO
              </button>
            )}

            {record?.previousCEOs && selectedCEO === record.ceo && (
              <div className="mb-4">
                <div className="text-green-500/70 mb-2">Previous CEOs:</div>
                <div className="flex gap-2">
                  {record.previousCEOs.map(prevCEO => (
                    <button
                      key={prevCEO}
                      onClick={() => handleCEOChange(prevCEO)}
                      className="text-green-500/70 hover:text-green-500 transition-colors"
                    >
                      {prevCEO}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Basic Info */}
              <div className="col-span-1 space-y-6">
                <div>
                  <img
                    src={ceoInfo.image}
                    alt={ceoInfo.name}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-bold text-green-500">{ceoInfo.name}</h2>
                  <div className="text-green-500/70">{ceoInfo.currentRole}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-500/70">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${ceoInfo.email}`} className="hover:text-green-500">
                      {ceoInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-green-500/70">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${ceoInfo.phone}`} className="hover:text-green-500">
                      {ceoInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Middle Column - Work History & Awards */}
              <div className="col-span-2 space-y-6">
                <div>
                  <h3 className="text-green-500 flex items-center gap-2 mb-4">
                    <History className="w-4 h-4" />
                    Work History
                  </h3>
                  <div className="space-y-4">
                    {ceoInfo.workHistory.map((work, index) => (
                      <div
                        key={index}
                        className="border border-green-500/30 rounded-lg p-4"
                      >
                        <div className="text-green-500">{work.position}</div>
                        <div className="text-green-500/70">{work.company}</div>
                        <div className="text-green-500/50 text-sm">{work.period}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-green-500 flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4" />
                    Awards & Recognition
                  </h3>
                  <div className="space-y-4">
                    {ceoInfo.awards.map((award, index) => (
                      <div
                        key={index}
                        className="border border-green-500/30 rounded-lg p-4"
                      >
                        <div className="text-green-500">{award.name}</div>
                        <div className="text-green-500/70">{award.year}</div>
                        <div className="text-green-500/50 text-sm mt-2">
                          {award.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-green-500 flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4" />
                    Vision
                  </h3>
                  <div className="border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-500/70">{ceoInfo.vision}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-green-500 flex items-center gap-2 mb-4">
                    <Rocket className="w-4 h-4" />
                    Recent Developments
                  </h3>
                  <div className="border border-green-500/30 rounded-lg p-4">
                    <ul className="space-y-2">
                      {ceoInfo.recentDevelopments.map((development, index) => (
                        <li key={index} className="text-green-500/70">
                          • {renderText(development)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showManagement && (
        <ManagementViewer
          type={showManagement.type}
          id={showManagement.id}
          onClose={() => setShowManagement(null)}
        />
      )}
    </div>
  );
};