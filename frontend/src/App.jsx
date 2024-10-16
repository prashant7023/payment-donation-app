import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import { auth } from './firebase'; // Ensure this is your Firebase config
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth method
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const username = Cookies.get('username');
  return username ? children : <Navigate to="/" />;
};

const App = () => {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user state when authentication state changes
      if (currentUser) {
        Cookies.set('username', currentUser.displayName || currentUser.email, { expires: 1 }); // Store username in cookies
      } else {
        Cookies.remove('username'); // Clear cookie if user is logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user} /> {/* Pass user to Dashboard */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
