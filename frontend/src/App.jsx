import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import DonationPage from './components/DonationPage'; // Import DonationPage
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const username = Cookies.get('username');
  return username ? children : <Navigate to="/" />;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        Cookies.set('username', currentUser.displayName || currentUser.email, { expires: 1 });
      } else {
        Cookies.remove('username');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DonationPage />} /> {/* Set DonationPage as the root route */}
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
