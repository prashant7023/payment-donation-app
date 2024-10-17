import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Firebase auth & Firestore instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore functions
import Cookies from 'js-cookie'; // Cookies for session management
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Store username for registration
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      if (isLogin) {
        // Login User
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const username = userDoc.data()?.username;
        Cookies.set('username', username, { expires: 1 }); // Store username in cookies
      } else {
        // Register User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), { username, email });
        Cookies.set('username', username, { expires: 1 }); // Store username in cookies
      }
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Authentication Error:', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        {/* Donation Message Section */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-bold mb-2">Support a Cause</h3>
          <p className="text-gray-600">
            Join us in making a difference! Your contributions help fund various charitable projects aimed at improving lives.
            Together, we can create a better tomorrow.
          </p>
          <p className="text-gray-700 mt-2">Consider donating while signing up!</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* Form Section */}
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className={`w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700 active:bg-gray-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-4">
            <span className="loader"></span> {/* Spinner Placeholder */}
            <p className="text-gray-500 mt-2">Redirecting to dashboard...</p>
          </div>
        )}

        <div className="text-center mt-4">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading} // Disable toggle during loading
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
