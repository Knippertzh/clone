import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Award, History, Lightbulb, Rocket } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface ManagementViewerProps {
  type: string;
  id: string;
  onClose: () => void;
}

export const ManagementViewer: React.FC<ManagementViewerProps> = ({ type, id, onClose }) => {
  const { playSound } = useSound();
  const [showContent, setShowContent] = useState(false);
  const [managementInfo, setManagementInfo] = useState<any>(null);

  useEffect(() => {
    const loadContent = async () => {
      playSound('diskRead');
      try {
        // Dynamic import of management file
        const module = await import(`../data/management/${id}.json`);
        setManagementInfo(module.default);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowContent(true);
      } catch (error) {
        console.error('Failed to load management info:', error);
      }
    };
    loadContent();
  }, [id, playSound]);

  if (!managementInfo) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full flex items-start justify-center p-8 overflow-y-auto">
        {!showContent ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-green-500 text-2xl font-mono animate-pulse">
              LOADING MANAGEMENT PROFILE...
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

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Basic Info */}
              <div className="col-span-1 space-y-6">
                <div>
                  <img
                    src={managementInfo.image}
                    alt={managementInfo.name}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-bold text-green-500">{managementInfo.name}</h2>
                  <div className="text-green-500/70">{managementInfo.currentRole}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-500/70">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${managementInfo.email}`} className="hover:text-green-500">
                      {managementInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-green-500/70">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${managementInfo.phone}`} className="hover:text-green-500">
                      {managementInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="col-span-2 space-y-6">
                <div>
                  <h3 className="text-green-500 flex items-center gap-2 mb-4">
                    <History className="w-4 h-4" />
                    Work History
                  </h3>
                  <div className="space-y-4">
                    {managementInfo.workHistory.map((work: any, index: number) => (
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

                {managementInfo.achievements && (
                  <div>
                    <h3 className="text-green-500 flex items-center gap-2 mb-4">
                      <Award className="w-4 h-4" />
                      Achievements
                    </h3>
                    <div className="space-y-4">
                      {managementInfo.achievements.map((achievement: any, index: number) => (
                        <div
                          key={index}
                          className="border border-green-500/30 rounded-lg p-4"
                        >
                          <div className="text-green-500">{achievement.title}</div>
                          <div className="text-green-500/70">{achievement.year}</div>
                          <div className="text-green-500/50 text-sm mt-2">
                            {achievement.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-green-500 flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4" />
                    Vision
                  </h3>
                  <div className="border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-500/70">{managementInfo.vision}</div>
                  </div>
                </div>

                {managementInfo.expertise && (
                  <div>
                    <h3 className="text-green-500 flex items-center gap-2 mb-4">
                      <Rocket className="w-4 h-4" />
                      Areas of Expertise
                    </h3>
                    <div className="border border-green-500/30 rounded-lg p-4">
                      <ul className="space-y-2">
                        {managementInfo.expertise.map((item: string, index: number) => (
                          <li key={index} className="text-green-500/70">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};