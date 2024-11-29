import React, { useState } from 'react';
import { X, Send, Mail, User, MessageSquare } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import emailjs from 'emailjs-com';

interface ContactFormProps {
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { playSound } = useSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    playSound('keypress');

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          to_email: 'patrick.blanks@plugilo.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      );

      setStatus('success');
      playSound('login');
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setStatus('error');
      playSound('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-lg bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Contact Plugilo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-500 mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full bg-black/30 border border-green-500/30 rounded px-4 py-2 focus:outline-none focus:border-green-500"
              placeholder="Email subject"
            />
          </div>

          <div>
            <label className="block text-green-500 mb-2">Message</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-green-500/50" />
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full h-32 bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Your message"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-red-500/70 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded px-6 py-2 text-green-500 hover:bg-green-500/30 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {status === 'success' && (
            <div className="text-green-500 text-center">
              Message sent successfully!
            </div>
          )}

          {status === 'error' && (
            <div className="text-red-500 text-center">
              Failed to send message. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};