import React, { useState } from 'react';
import { User, Edit, Trash2, Plus, Shield } from 'lucide-react';

interface UserData {
  id: string;
  username: string;
  role: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export const UserManagement: React.FC = () => {
  const [users] = useState<UserData[]>([
    {
      id: '1',
      username: 'admin',
      role: 'Administrator',
      lastActive: '2024-03-19T10:30:00',
      status: 'active'
    },
    {
      id: '2',
      username: 'moderator',
      role: 'Moderator',
      lastActive: '2024-03-19T09:15:00',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <User className="w-6 h-6" />
          User Management
        </h2>
        <button className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded hover:bg-green-500/30 transition-colors">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Total Users</div>
          <div className="text-4xl font-bold">1,234</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">Active Now</div>
          <div className="text-4xl font-bold">42</div>
        </div>
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="text-xl mb-4">New Today</div>
          <div className="text-4xl font-bold">7</div>
        </div>
      </div>

      <div className="border border-green-500/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-500/10">
            <tr>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Last Active</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-green-500/30">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {new Date(user.lastActive).toLocaleString()}
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
                    <button className="p-1 hover:bg-green-500/20 rounded">
                      <Shield className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-green-500/20 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-red-500/20 rounded text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};