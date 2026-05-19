import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LS_KEY = 'noor-reading-mode';

interface ReadingModeContextType {
  isReading: boolean;
  toggle: () => void;
}

const ReadingModeContext = createContext<ReadingModeContextType>({
  isReading: false,
  toggle: () => {},
});

export const ReadingModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReading, setIsReading] = useState(() => {
    try { return localStorage.getItem(LS_KEY) === 'true'; } catch { return false; }
  });

  useEffect(() => {
    document.body.classList.toggle('reading-mode', isReading);
    try { localStorage.setItem(LS_KEY, String(isReading)); } catch {}
  }, [isReading]);

  const toggle = useCallback(() => setIsReading(v => !v), []);

  return (
    <ReadingModeContext.Provider value={{ isReading, toggle }}>
      {children}
    </ReadingModeContext.Provider>
  );
};

export const useReadingMode = () => useContext(ReadingModeContext);
