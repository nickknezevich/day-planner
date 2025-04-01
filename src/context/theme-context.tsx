import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme'; // Import your themes

interface ThemeContextProps {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial theme from localStorage or set to darkTheme by default
  const getInitialTheme = (): Theme => {
    // if(window.localStorage){
    //   const savedTheme = window.localStorage.getItem('currentTheme');
    //   if (savedTheme === 'light') return lightTheme;
    // }
    return darkTheme;
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

  // Toggle theme and update localStorage
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      const newTheme = prevTheme === lightTheme ? darkTheme : lightTheme;
      // if(window){
      //   localStorage.setItem('currentTheme', newTheme === lightTheme ? 'light' : 'dark');
      // }
      return newTheme;
    });
  };

  useEffect(() => {
    // Sync theme with localStorage when component mounts
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme === 'light' && currentTheme !== lightTheme) {
      setCurrentTheme(lightTheme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ currentTheme, toggleTheme }), [currentTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProviderWrapper');
  }
  return context;
};
