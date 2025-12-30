import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { language, setLanguage, isAuthenticated, user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav aria-label="Main Navigation" className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="card-title" style={{ color: 'var(--primary-blue)', cursor: 'pointer' }}>CropCare</div>
      </Link>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center', flexWrap: 'wrap' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/advisory">Advisory</Link></li>
        <li><Link to="/pest">Pest Detect</Link></li>
        <li><Link to="/chat">Chatbot</Link></li>
        {isAuthenticated && <li><Link to="/history">History</Link></li>}
        {isAuthenticated ? (
          <>
            <li style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>
              {user?.name || 'User'}
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--primary-blue)',
                  color: 'var(--primary-blue)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Sign in</Link></li>
        )}
        <li>
          <select onChange={(e) => setLanguage(e.target.value)} aria-label="Language selector" value={language} style={{ padding: 6, borderRadius: 8 }}>
            <option value="EN">EN</option>
            <option value="HI">HI</option>
            <option value="MR">MR</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
