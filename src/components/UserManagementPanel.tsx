import React, { useState } from 'react';
import { X, Users, UserPlus, Shield, Mail, Clock } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { AddUserForm } from './AddUserForm';

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  email: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

interface UserManagementPanelProps {
  onClose: () => void;
}

export const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ onClose }) => {
  const { playSound } = useSound();
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: 'USER001',
      username: 'jhoover',
      name: 'J. Edgar Hoover',
      role: 'OWNER',
      email: 'jhoover@fbi.gov',
      lastLogin: '2024-03-19T10:30:00Z',
      status: 'active'
    },
    {
      id: 'USER002',
      username: 'rpeters',
      name: 'Ricarda Peters',
      role: 'MOD',
      email: 'ricarda.peters@plugilo.com',
      lastLogin: '2024-03-19T09:15:00Z',
      status: 'active'
    },
    {
      id: 'USER003',
      username: 'pblanks',
      name: 'Patrick Blanks',
      role: 'ADMIN',
      email: 'patrick.blanks@plugilo.com',
      lastLogin: '2024-03-19T08:45:00Z',
      status: 'active'
    },
    {
      id: 'USER004',
      username: 'mmohr',
      name: 'Michael Mohr',
      role: 'OWNER',
      email: 'mmohr@plugilo.com',
      lastLogin: '2024-03-19T11:00:00Z',
      status: 'active'
    }
  ]);

  const handleAddUser = (newUser: User) => {
    // Update users.json
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then(() => {
      // Update local state
      setUsers(prev => [...prev, newUser]);
      setShowAddUser(false);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6" />
          User Management
        </h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="border border-green-500/30 rounded-lg px-4 py-2">
              <div className="text-green-500/70 text-sm">Total Users</div>
              <div className="text-xl font-bold text-green-500">{users.length}</div>
            </div>
            <div className="border border-green-500/30 rounded-lg px-4 py-2">
              <div className="text-green-500/70 text-sm">Active Users</div>
              <div className="text-xl font-bold text-green-500">
                {users.filter(u => u.status === 'active').length}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('keypress');
              setShowAddUser(true);
            }}
            className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>

        <div className="border border-green-500/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-500/10">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Last Login</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-green-500/30">
                  <td className="px-6 py-4">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-green-500/70 text-sm">{user.username}</div>
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => playSound('keypress')}
                        className="p-1 hover:bg-green-500/20 rounded"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => playSound('keypress')}
                        className="p-1 hover:bg-green-500/20 rounded"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => playSound('keypress')}
                        className="p-1 hover:bg-green-500/20 rounded"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddUser && (
          <AddUserForm
            onClose={() => setShowAddUser(false)}
            onSave={handleAddUser}
          />
        )}
      </div>
    </div>
  );
};