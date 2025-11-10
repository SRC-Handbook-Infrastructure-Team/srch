// src/App.jsx
import "./App.css";
import { useState, useEffect, createContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import AppRoutes from "./AppRoutes";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

/**
 * Main App Component
 * --------------------------------------------------------------
 * Uses a persistent SidebarLayout so the NavBar + SearchBar
 * remain active on every route (including /search pages).
 */
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // initialize the users system preferencess from localStorage 
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // update body class and localStorage when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ChakraProvider theme={theme}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <AppRoutes />
      </ThemeContext.Provider>
    </ChakraProvider>
  );
}

export default App;
