import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import styles from './Favourites.module.css';

export const Favourites: React.FC = () => {
  const { favourites } = useLibrary();

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Favourites</h1>
      
      {favourites.length === 0 ? (
        <p className={styles.empty}>Your bookmarked manga will appear here</p>
      ) : (
        <div className={styles.grid}>
          {favourites.map((manga) => (
            <Link key={manga.id} to={`/manga/${manga.id}`} className={styles.card}>
              <img src={manga.coverUrl || ''} alt={manga.title} className={styles.cover} />
              <p className={styles.title}>{manga.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
