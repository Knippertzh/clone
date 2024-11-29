import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Bell, Clock } from 'lucide-react';
import { useCollaboration } from '../hooks/useCollaboration';
import { useAuth } from '../hooks/useAuth';

interface CollaborationPanelProps {
  recordId: string;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ recordId }) => {
  const { user } = useAuth();
  const { 
    activeUsers,
    comments,
    addComment,
    notifications,
    markNotificationRead
  } = useCollaboration(recordId);

  const [newComment, setNewComment] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment({
        text: newComment,
        userId: user?.id || '',
        timestamp: new Date().toISOString()
      });
      setNewComment('');
    }
  };

  return (
    <div className="border-l border-green-500/30 w-80 p-4 space-y-6">
      {/* Active Users */}
      <div>
        <h3 className="text-green-500 flex items-center gap-2 mb-3">
          <Users className="w-4 h-4" />
          Active Users
        </h3>
        <div className="space-y-2">
          {activeUsers.map(user => (
            <div 
              key={user.id}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-green-500/70">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-green-500 flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4" />
          Comments
        </h3>
        <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
          {comments.map((comment, index) => (
            <div key={index} className="border border-green-500/30 rounded p-2">
              <div className="flex justify-between text-sm text-green-500/50 mb-1">
                <span>{comment.userId}</span>
                <span><Clock className="w-3 h-3 inline mr-1" />{new Date(comment.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-green-500/70">{comment.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-black/30 border border-green-500/30 rounded px-3 py-2 focus:outline-none focus:border-green-500 transition-colors"
          />
        </form>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-green-500 flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4" />
          Notifications
          {notifications.some(n => !n.read) && (
            <span className="w-2 h-2 rounded-full bg-red-500" />
          )}
        </h3>
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`text-sm p-2 rounded ${
                notification.read ? 'text-green-500/50' : 'text-green-500 bg-green-500/10'
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};