import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { DatabaseTerminal } from './components/DatabaseTerminal';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { Lock } from 'lucide-react';

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'OWNER';

  const handleLogin = (username: string, password: string) => {
    return login(username, password);
  };

  if (showAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-8">
      <Background />
      
      <div className="relative w-full max-w-4xl">
        {isAuthenticated && isAdmin && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 transition-colors px-3 py-1.5 rounded text-sm border border-green-500/30"
            >
              <Lock className="w-4 h-4" />
              Admin
            </button>
          </div>
        )}

        <Header />
        {isAuthenticated && user ? (
          <DatabaseTerminal user={user} onLogout={logout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;