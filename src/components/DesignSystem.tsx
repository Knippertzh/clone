import React, { useState } from 'react';
import { Palette, EyeOff, Eye, Copy, Check } from 'lucide-react';

export const DesignSystem: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const colors = [
    { name: 'Primary', value: '#10B981' },
    { name: 'Secondary', value: '#1F2937' },
    { name: 'Accent', value: '#6366F1' },
    { name: 'Background', value: '#000000' },
    { name: 'Text', value: '#F3F4F6' }
  ];

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Palette className="w-6 h-6" />
          Design System
        </h2>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors"
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Preview
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Color Palette</h3>
            <div className="space-y-4">
              {colors.map(color => (
                <div key={color.name} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="flex-1">
                    <div className="font-bold">{color.name}</div>
                    <div className="text-green-500/70">{color.value}</div>
                  </div>
                  <button
                    onClick={() => copyColor(color.value)}
                    className="p-2 hover:bg-green-500/20 rounded"
                  >
                    {copiedColor === color.value ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-green-500/70 mb-1">Heading 1</div>
                <div className="text-4xl font-bold">The quick brown fox</div>
              </div>
              <div>
                <div className="text-sm text-green-500/70 mb-1">Heading 2</div>
                <div className="text-3xl font-bold">The quick brown fox</div>
              </div>
              <div>
                <div className="text-sm text-green-500/70 mb-1">Body</div>
                <div className="text-base">The quick brown fox jumps over the lazy dog</div>
              </div>
              <div>
                <div className="text-sm text-green-500/70 mb-1">Small</div>
                <div className="text-sm">The quick brown fox jumps over the lazy dog</div>
              </div>
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Component Preview</h3>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-green-500/70 mb-2">Buttons</div>
                <div className="flex gap-4">
                  <button className="bg-green-500 text-black px-4 py-2 rounded">
                    Primary
                  </button>
                  <button className="bg-green-500/20 text-green-500 px-4 py-2 rounded">
                    Secondary
                  </button>
                  <button className="border border-green-500 text-green-500 px-4 py-2 rounded">
                    Outline
                  </button>
                </div>
              </div>

              <div>
                <div className="text-sm text-green-500/70 mb-2">Form Elements</div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Text Input"
                    className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2"
                  />
                  <select className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2">
                    <option>Select Option</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <label>Checkbox</label>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-green-500/70 mb-2">Cards</div>
                <div className="border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Card Title</h4>
                  <p className="text-green-500/70">Card content goes here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};