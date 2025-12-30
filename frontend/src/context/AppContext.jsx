import { createContext, useState, useEffect } from "react";
import i18n from '../i18n';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [crop, setCrop] = useState("Rice");
  const [language, setLanguageState] = useState(() => {
    const stored = localStorage.getItem('language');
    return stored ? stored : 'EN';
  });
  
  // Authentication state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    // initialize i18n language
    i18n.changeLanguage(language.toLowerCase());
    localStorage.setItem('language', language);

    // expose setter for legacy UI pieces (safe fallback)
    try { window.__react_app_setLanguage = (l) => setLanguage(l); } catch {}

    return () => {
      try { delete window.__react_app_setLanguage; } catch {}
    };
  }, [language]);

  const setLanguage = (lang) => {
    const upper = (lang || 'EN').toUpperCase();
    setLanguageState(upper);
    i18n.changeLanguage(upper.toLowerCase());
    localStorage.setItem('language', upper);
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{ 
      crop, 
      setCrop, 
      language, 
      setLanguage,
      user,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};
