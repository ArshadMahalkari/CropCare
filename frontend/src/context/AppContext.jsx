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
    // Initialize i18n language
    const langCode = language.toLowerCase();
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', language);
    
    // Update body data attribute for language-specific styling
    document.body.setAttribute('data-lang', langCode);
    
    // Update document direction for RTL languages if needed
    document.documentElement.dir = ['ar', 'ur'].includes(langCode) ? 'rtl' : 'ltr';

    // Expose setter for legacy UI pieces (safe fallback)
    try { 
      window.__react_app_setLanguage = (l) => setLanguage(l); 
    } catch (e) {
      console.warn('Could not set global language setter:', e);
    }

    return () => {
      try { 
        delete window.__react_app_setLanguage; 
      } catch (e) {
        // Silent cleanup
      }
    };
  }, [language]);

  const setLanguage = (lang) => {
    const upper = (lang || 'EN').toUpperCase();
    console.log('Setting language to:', upper);
    setLanguageState(upper);
    
    const langCode = upper.toLowerCase();
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', upper);
    
    // Update body data attribute immediately
    document.body.setAttribute('data-lang', langCode);
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
