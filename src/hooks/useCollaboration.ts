import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

interface Comment {
  text: string;
  userId: string;
  timestamp: string;
}

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

interface ActiveUser {
  id: string;
  name: string;
  lastActive: string;
}

export const useCollaboration = (recordId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, this would connect to your WebSocket server
    const newSocket = io('wss://your-websocket-server.com', {
      query: { recordId, userId: user?.id }
    });

    newSocket.on('users:update', (users: ActiveUser[]) => {
      setActiveUsers(users);
    });

    newSocket.on('comment:new', (comment: Comment) => {
      setComments(prev => [...prev, comment]);
    });

    newSocket.on('notification:new', (notification: Notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [recordId, user]);

  const addComment = (comment: Comment) => {
    if (socket) {
      socket.emit('comment:add', comment);
      setComments(prev => [...prev, comment]);
    }
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  return {
    activeUsers,
    comments,
    notifications,
    addComment,
    markNotificationRead
  };
};