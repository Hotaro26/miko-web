import React, { createContext, useContext, useState, useEffect } from 'react';

interface HistoryEntry {
  id: string;
  title: string;
  coverUrl: string | null;
  lastChapterId: string;
  lastChapterNum: string;
  timestamp: number;
}

interface FavouriteManga {
  id: string;
  title: string;
  coverUrl: string | null;
}

interface LibraryContextType {
  history: HistoryEntry[];
  favourites: FavouriteManga[];
  userName: string;
  hasOnboarded: boolean;
  addToHistory: (entry: Omit<HistoryEntry, 'timestamp'>) => void;
  toggleFavourite: (manga: FavouriteManga) => void;
  isFavourite: (id: string) => boolean;
  setUserName: (name: string) => void;
  completeOnboarding: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('miko_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [favourites, setFavourites] = useState<FavouriteManga[]>(() => {
    const saved = localStorage.getItem('miko_favourites');
    return saved ? JSON.parse(saved) : [];
  });

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem('miko_user_name') || '';
  });

  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('miko_onboarded') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('miko_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('miko_favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('miko_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('miko_onboarded', hasOnboarded.toString());
  }, [hasOnboarded]);

  const addToHistory = (entry: Omit<HistoryEntry, 'timestamp'>) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== entry.id);
      return [{ ...entry, timestamp: Date.now() }, ...filtered].slice(0, 50);
    });
  };

  const toggleFavourite = (manga: FavouriteManga) => {
    setFavourites((prev) => {
      const exists = prev.find((f) => f.id === manga.id);
      if (exists) {
        return prev.filter((f) => f.id !== manga.id);
      }
      return [manga, ...prev];
    });
  };

  const isFavourite = (id: string) => favourites.some((f) => f.id === id);

  const setUserName = (name: string) => setUserNameState(name);
  const completeOnboarding = () => setHasOnboarded(true);

  return (
    <ThemeAwareProvider values={{ history, favourites, userName, hasOnboarded, addToHistory, toggleFavourite, isFavourite, setUserName, completeOnboarding }}>
      {children}
    </ThemeAwareProvider>
  );
};

// Internal wrapper to provide the context
const ThemeAwareProvider: React.FC<{ children: React.ReactNode, values: any }> = ({ children, values }) => {
  return (
    <LibraryContext.Provider value={values}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within LibraryProvider');
  return context;
};
