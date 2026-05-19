import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LS_KEY = 'noor-bookmarks-v1';

interface BookmarksContextType {
  bookmarks: Set<number>;
  toggle: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  count: number;
  clear: () => void;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: new Set(),
  toggle: () => {},
  isBookmarked: () => false,
  count: 0,
  clear: () => {},
});

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>();
    } catch {
      return new Set<number>();
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify([...bookmarks]));
    } catch { /* storage full */ }
  }, [bookmarks]);

  const toggle = useCallback((id: number) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: number) => bookmarks.has(id), [bookmarks]);

  const clear = useCallback(() => setBookmarks(new Set()), []);

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggle, isBookmarked, count: bookmarks.size, clear }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
