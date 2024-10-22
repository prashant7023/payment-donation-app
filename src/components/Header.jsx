import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const username = Cookies.get('username'); // Retrieve username from cookies

  const handleLogout = () => {
    Cookies.remove('username'); // Clear cookies on logout
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="bg-gray-700 text-white p-4 flex justify-between items-center rounded-b-md bg-gradient-to-b">
      <h1 className="text-2xl font-semibold">Heart Charity</h1>
      <div className="flex items-center gap-4">
        <span>Hello, {username || 'User'}!</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
