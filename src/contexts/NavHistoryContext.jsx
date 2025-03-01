import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'


// eslint-disable-next-line react-refresh/only-export-components
export const NavHistoryContext = createContext();

export const NavHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setHistory((prev) => [...prev, location.pathname]);
  }, [location.pathname]);

  return (
    <NavHistoryContext.Provider value={{ history }}>
      {children}
    </NavHistoryContext.Provider>
  );
};