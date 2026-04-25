import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { useTheme } from '../context/ThemeContext';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const { history, userName } = useLibrary();
  const { homeLayout } = useTheme();
  const lastRead = history[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Hello, {userName}</h1>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Continue Reading</h2>
        {history.length === 0 ? (
          <p className={styles.empty}>Your recent manga will appear here</p>
        ) : homeLayout === 'list' ? (
          <div className={styles.historyList}>
            {history.map((entry) => (
              <Link key={entry.id} to={`/manga/${entry.id}`} className={styles.historyItem}>
                <img src={entry.coverUrl || ''} alt={entry.title} className={styles.cover} />
                <div className={styles.info}>
                  <p className={styles.title}>{entry.title}</p>
                  <p className={styles.subtitle}>Continue reading</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.historyGrid}>
            {history.map((entry) => (
              <Link key={entry.id} to={`/manga/${entry.id}`} className={styles.gridItem}>
                <div className={styles.gridCoverWrapper}>
                  <img src={entry.coverUrl || ''} alt={entry.title} className={styles.gridCover} />
                </div>
                <p className={styles.gridTitle}>{entry.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {lastRead && (
        <Link 
          to={`/reader/${lastRead.lastChapterId}?mangaId=${lastRead.id}&title=${encodeURIComponent(lastRead.title)}&cover=${encodeURIComponent(lastRead.coverUrl || '')}`} 
          className={styles.fab}
          title={`Resume ${lastRead.title}`}
        >
          <BookOpen size={24} />
          <span className={styles.fabLabel}>Resume</span>
        </Link>
      )}
    </div>
  );
};
