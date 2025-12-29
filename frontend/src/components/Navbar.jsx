import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/advisory">Advisory</Link></li>
        <li><Link to="/pest">Pest Detect</Link></li>
        <li><Link to="/chat">Chatbot</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
