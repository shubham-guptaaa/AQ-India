import React, { useState } from 'react';
import { FaSun, FaMoon, FaFlag } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [section, setSection] = useState('past');
  const [language, setLanguage] = useState('en');

  // const navigate = useNavigate();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const languages = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்' };

  return (
    <nav className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-orange-500 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AQINDIA</h1>
        <div className="space-x-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button className="p-2"><FaFlag /> Indian Standard</button>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="p-2 bg-transparent border rounded"
          >
            <option value="past">Past Data</option>
            <option value="top">Top Affected Cities</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 bg-transparent border rounded"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;