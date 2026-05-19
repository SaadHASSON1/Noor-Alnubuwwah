import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LS_KEY       = 'noor-bookmarks-v1';
const LS_KEY_PAGES = 'noor-page-bookmarks-v1';

interface BookmarksContextType {
  /* ── Event bookmarks ── */
  bookmarks: Set<number>;
  toggle: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  count: number;
  clear: () => void;
  /* ── Page bookmarks ── */
  pageBookmarks: Map<string, string>;   // path → label
  togglePage: (path: string, label: string) => void;
  isPageBookmarked: (path: string) => boolean;
  pageCount: number;
  clearPages: () => void;
  /* ── Combined ── */
  totalCount: number;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: new Set(),
  toggle: () => {},
  isBookmarked: () => false,
  count: 0,
  clear: () => {},
  pageBookmarks: new Map(),
  togglePage: () => {},
  isPageBookmarked: () => false,
  pageCount: 0,
  clearPages: () => {},
  totalCount: 0,
});

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /* ── Event bookmarks ── */
  const [bookmarks, setBookmarks] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>();
    } catch { return new Set<number>(); }
  });

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify([...bookmarks])); } catch {}
  }, [bookmarks]);

  const toggle = useCallback((id: number) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: number) => bookmarks.has(id), [bookmarks]);
  const clear = useCallback(() => setBookmarks(new Set()), []);

  /* ── Page bookmarks ── */
  const [pageBookmarks, setPageBookmarks] = useState<Map<string, string>>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY_PAGES);
      return stored ? new Map<string, string>(JSON.parse(stored)) : new Map<string, string>();
    } catch { return new Map<string, string>(); }
  });

  useEffect(() => {
    try { localStorage.setItem(LS_KEY_PAGES, JSON.stringify([...pageBookmarks.entries()])); } catch {}
  }, [pageBookmarks]);

  const togglePage = useCallback((path: string, label: string) => {
    setPageBookmarks(prev => {
      const next = new Map(prev);
      if (next.has(path)) next.delete(path); else next.set(path, label);
      return next;
    });
  }, []);

  const isPageBookmarked = useCallback((path: string) => pageBookmarks.has(path), [pageBookmarks]);
  const clearPages = useCallback(() => setPageBookmarks(new Map()), []);

  const totalCount = bookmarks.size + pageBookmarks.size;

  return (
    <BookmarksContext.Provider value={{
      bookmarks, toggle, isBookmarked, count: bookmarks.size, clear,
      pageBookmarks, togglePage, isPageBookmarked, pageCount: pageBookmarks.size, clearPages,
      totalCount,
    }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
