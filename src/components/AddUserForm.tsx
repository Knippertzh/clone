import React, { useState } from 'react';
import { X, Save, User, Lock, Mail, Shield } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface AddUserFormProps {
  onClose: () => void;
  onSave: (user: any) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ onClose, onSave }) => {
  const { playSound } = useSound();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'USER'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('keypress');

    const newUser = {
      id: `USER${Math.floor(Math.random() * 10000)}`,
      ...formData,
      status: 'active',
      lastLogin: new Date().toISOString(),
      division: formData.role,
      permissions: getRolePermissions(formData.role)
    };

    onSave(newUser);
    playSound('login');
    onClose();
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'OWNER':
        return [
          "VERIFY",
          "EDIT",
          "DELETE",
          "ADD_USERS",
          "MODIFY_ROLES",
          "EXPORT_DATA",
          "ACCESS_AI",
          "MANAGE_SYSTEM"
        ];
      case 'ADMIN':
        return [
          "VERIFY",
          "EDIT",
          "DELETE",
          "ADD_USERS",
          "EXPORT_DATA",
          "ACCESS_AI",
          "MANAGE_SYSTEM"
        ];
      case 'MOD':
        return [
          "VERIFY",
          "EDIT",
          "EXPORT_DATA",
          "ACCESS_AI"
        ];
      default:
        return [
          "VERIFY",
          "EXPORT_DATA",
          "ACCESS_AI"
        ];
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-8">
      <div className="relative w-full max-w-lg bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <User className="w-6 h-6" />
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-500 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Enter full name"
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
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-500 mb-2">Role</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500/50" />
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full bg-black/30 border border-green-500/30 rounded pl-12 pr-4 py-2 focus:outline-none focus:border-green-500"
              >
                <option value="USER">User</option>
                <option value="MOD">Moderator</option>
                <option value="ADMIN">Administrator</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-red-500/70 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded px-6 py-2 text-green-500 hover:bg-green-500/30 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};