import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(AppContext);

  return (
    <button onClick={toggleLanguage} aria-label="Toggle language">
      {language === 'en' ? 'EN' : language.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
