import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { DatabaseTerminal } from './components/DatabaseTerminal';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { Lock } from 'lucide-react';

/**
 * The main application component that handles user authentication and displays
 * different UI elements based on the user's authentication status and role.
 *
 * It utilizes the `useAuth` hook to manage authentication state and provides
 * functionality for logging in and out. The component conditionally renders
 * an admin panel if the user has the appropriate permissions.
 *
 * @returns {JSX.Element} The rendered application component.
 *
 * @example
 * // Render the App component in your main application file
 * ReactDOM.render(<App />, document.getElementById('root'));
 *
 * @throws {Error} Throws an error if the authentication process fails.
 */
function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'OWNER';

  /**
   * Handles the user login process by invoking the login function with the provided credentials.
   *
   * @param {string} username - The username of the user attempting to log in.
   * @param {string} password - The password associated with the username.
   * @returns {Promise<any>} A promise that resolves to the result of the login operation.
   *
   * @throws {Error} Throws an error if the login process fails due to invalid credentials or server issues.
   *
   * @example
   * handleLogin('user123', 'securePassword')
   *   .then(result => {
   *     console.log('Login successful:', result);
   *   })
   *   .catch(error => {
   *     console.error('Login failed:', error);
   *   });
   */
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