import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { language, setLanguage, isAuthenticated, user, logout } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('home') || 'Home', icon: '🏠' },
    { path: '/advisory', label: t('advisory') || 'Advisory', icon: '🌾' },
    { path: '/pest', label: t('pest_detect') || 'Pest Detect', icon: '🐛' },
    { path: '/chat', label: t('ai_chat') || 'AI Chat', icon: '🤖' },
  ];

  const languageOptions = [
    { code: 'EN', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'HI', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'MR', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'TA', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'TE', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'KN', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
    { code: 'GU', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    { code: 'PA', name: 'Punjabi', flag: '🇮🇳', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'BN', name: 'Bengali', flag: '🇮🇳', nativeName: 'বাংলা' },
  ];

  const handleLanguageChange = (newLanguage) => {
    console.log('Changing language to:', newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          🌾 CropCare
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              
              {isAuthenticated && (
                <li>
                  <Link 
                    to="/history" 
                    className={`navbar-link ${isActive('/history') ? 'active' : ''}`}
                  >
                    <span>📊</span>
                    <span>{t('history') || 'History'}</span>
                  </Link>
                </li>
              )}
            </ul>

            {/* User Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {isAuthenticated ? (
                <>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.5rem 1rem', 
                    background: 'var(--primary-green-100)', 
                    borderRadius: 'var(--radius-xl)',
                    color: 'var(--primary-green)'
                  }}>
                    <span>👤</span>
                    <span style={{ fontWeight: '600' }}>
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline btn-sm"
                  >
                    {t('logout') || 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar-link">
                    {t('sign_in') || 'Sign In'}
                  </Link>
                  <Link to="/signup" className="btn-primary btn-sm">
                    {t('sign_up') || 'Sign Up'}
                  </Link>
                </>
              )}

              {/* Language Selector */}
              <div className="language-selector">
                <select 
                  onChange={(e) => handleLanguageChange(e.target.value)} 
                  value={language}
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Mobile Navigation */}
        {isMobile && isMobileMenuOpen && (
          <div className="mobile-menu-content">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: 'var(--radius-xl)',
                      textDecoration: 'none',
                      background: isActive(link.path) ? 'var(--primary-green-100)' : 'transparent',
                      color: isActive(link.path) ? 'var(--primary-green)' : 'var(--gray-700)',
                      fontWeight: isActive(link.path) ? '600' : '500',
                      transition: 'all 0.3s ease',
                      fontSize: 'var(--text-base)',
                      minHeight: 'var(--touch-target)'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span style={{ fontSize: 'var(--text-xl)' }}>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              
              {isAuthenticated && (
                <li>
                  <Link 
                    to="/history" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: 'var(--radius-xl)',
                      textDecoration: 'none',
                      background: isActive('/history') ? 'var(--primary-green-100)' : 'transparent',
                      color: isActive('/history') ? 'var(--primary-green)' : 'var(--gray-700)',
                      fontWeight: isActive('/history') ? '600' : '500',
                      transition: 'all 0.3s ease',
                      fontSize: 'var(--text-base)',
                      minHeight: 'var(--touch-target)'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span style={{ fontSize: 'var(--text-xl)' }}>📊</span>
                    <span>{t('history') || 'History'}</span>
                  </Link>
                </li>
              )}
            </ul>

            <div style={{ borderTop: '2px solid var(--gray-100)', marginTop: '1.5rem', paddingTop: '1.5rem' }}>
              {isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '1rem', 
                    background: 'var(--primary-green-50)', 
                    borderRadius: 'var(--radius-xl)' 
                  }}>
                    <span style={{ fontSize: 'var(--text-xl)' }}>👤</span>
                    <span style={{ fontWeight: '600', color: 'var(--primary-green)', fontSize: 'var(--text-base)' }}>
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline btn-lg btn-mobile-full"
                  >
                    {t('logout') || 'Logout'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Link 
                    to="/login" 
                    className="btn-secondary btn-lg btn-mobile-full"
                    style={{ textAlign: 'center' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('sign_in') || 'Sign In'}
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn-primary btn-lg btn-mobile-full"
                    style={{ textAlign: 'center' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('sign_up') || 'Sign Up'}
                  </Link>
                </div>
              )}

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 'var(--text-base)', 
                  fontWeight: '600', 
                  color: 'var(--gray-700)', 
                  marginBottom: '0.75rem' 
                }}>
                  {t('language_label') || 'Language'}:
                </label>
                <select 
                  onChange={(e) => handleLanguageChange(e.target.value)} 
                  value={language}
                  className="form-select"
                  style={{ 
                    width: '100%',
                    fontSize: 'var(--text-base)',
                    padding: '1rem'
                  }}
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
