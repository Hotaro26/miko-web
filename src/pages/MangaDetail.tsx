import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Share2, Play, BookOpen } from 'lucide-react';
import { getManga, getMangaChapters, getCoverUrl } from '../api/mangadex';
import type { Manga, Chapter } from '../api/mangadex';
import { useLibrary } from '../context/LibraryContext';
import { Loading } from '../components/Loading';
import styles from './MangaDetail.module.css';

export const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavourite, isFavourite, history } = useLibrary();
  
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [mangaData, chaptersData] = await Promise.all([
          getManga(id),
          getMangaChapters(id)
        ]);
        setManga(mangaData);
        setChapters(chaptersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading fullScreen message="Fetching details..." />;
  if (!manga) return <div className={styles.center}>Manga not found</div>;

  const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];
  const description = manga.attributes.description.en || Object.values(manga.attributes.description)[0];
  const coverUrl = getCoverUrl(manga);

  const historyEntry = history.find(h => h.id === id);
  const actionChapter = historyEntry 
    ? (chapters.find(c => c.id === historyEntry.lastChapterId) || chapters[0])
    : chapters[0];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.iconBtn}><ArrowLeft /></button>
        <button onClick={() => {
          navigator.share?.({ title, url: window.location.href });
        }} className={styles.iconBtn}><Share2 /></button>
      </header>

      <div className={styles.info}>
        <img src={coverUrl || ''} alt={title} className={styles.cover} />
        <div className={styles.meta}>
          <h1 className={styles.title}>{title}</h1>
          <button
            onClick={() => toggleFavourite({ id: manga.id, title, coverUrl })}
            className={`${styles.favBtn} ${isFavourite(manga.id) ? styles.isFav : ''}`}
          >
            <Heart size={20} fill={isFavourite(manga.id) ? 'currentColor' : 'none'} />
            {isFavourite(manga.id) ? 'Favourited' : 'Favourite'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Description</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.section}>
        <div className={styles.chapterHeader}>
          <h2>Chapters</h2>
          <span>{chapters.length} chapters</span>
        </div>
        <div className={styles.chapterList}>
          {chapters.map((ch) => (
            <Link key={ch.id} to={`/reader/${ch.id}?mangaId=${manga.id}&title=${encodeURIComponent(title)}&cover=${encodeURIComponent(coverUrl || '')}`} className={styles.chapterItem}>
              <span>Chapter {ch.attributes.chapter}</span>
              <span className={styles.chTitle}>{ch.attributes.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {actionChapter && (
        <Link 
          to={`/reader/${actionChapter.id}?mangaId=${manga.id}&title=${encodeURIComponent(title)}&cover=${encodeURIComponent(coverUrl || '')}`}
          className={styles.fab}
        >
          {historyEntry ? <BookOpen size={24} /> : <Play size={24} />}
          <span>{historyEntry ? `Continue Ch. ${actionChapter.attributes.chapter}` : 'Read First Chapter'}</span>
        </Link>
      )}
    </div>
  );
};
