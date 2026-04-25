import React, { useState, useEffect } from 'react';
import { Search, X, Bookmark, Dices } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { searchManga, getCoverUrl, getRandomManga, getSuggestions } from '../api/mangadex';
import type { Manga } from '../api/mangadex';
import { Loading } from '../components/Loading';
import styles from './Explore.module.css';

const ShortcutButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button className={styles.shortcutBtn} onClick={onClick}>
    <span className={styles.shortcutIcon}>{icon}</span>
    <span className={styles.shortcutLabel}>{label}</span>
  </button>
);

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [suggestions, setSuggestions] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setMangaList([]);
      return;
    }
    setLoading(true);
    try {
      const results = await searchManga(searchTerm);
      setMangaList(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const results = await getSuggestions();
      setSuggestions(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    } else {
      loadSuggestions();
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
    performSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
    setMangaList([]);
    loadSuggestions();
  };

  const handleRandom = async () => {
    setLoading(true);
    try {
      const manga = await getRandomManga();
      navigate(`/manga/${manga.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const displayList = query ? mangaList : suggestions;

  return (
    <div className={styles.container}>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search manga"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        {query && (
          <button type="button" onClick={handleClear} className={styles.clearBtn}>
            <X size={20} />
          </button>
        )}
      </form>

      {!query && (
        <div className={styles.shortcuts}>
          <div className={styles.shortcutRow}>
            <ShortcutButton 
              icon={<Bookmark size={18} />} 
              label="Bookmarks" 
              onClick={() => navigate('/favourites')}
            />
            <ShortcutButton 
              icon={<Dices size={18} />} 
              label="Random" 
              onClick={handleRandom}
            />
          </div>
        </div>
      )}

      <h2 className={styles.sectionTitle}>
        {query ? `Search results for "${query}"` : 'Suggestions'}
      </h2>

      {loading && displayList.length === 0 ? (
        <Loading message="Fetching manga..." />
      ) : (
        <div className={styles.grid}>
          {displayList.map((manga) => (
            <Link key={manga.id} to={`/manga/${manga.id}`} className={styles.card}>
              <div className={styles.coverWrapper}>
                <img src={getCoverUrl(manga) || ''} alt="" className={styles.cover} />
              </div>
              <p className={styles.title}>{manga.attributes.title.en || Object.values(manga.attributes.title)[0]}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
