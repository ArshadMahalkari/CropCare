import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [crop, setCrop] = useState("Rice");
  const [language, setLanguage] = useState("EN");

  return (
    <AppContext.Provider value={{ crop, setCrop, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
