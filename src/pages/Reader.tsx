import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Settings, ChevronLeft, ChevronRight, LayoutList, Files } from 'lucide-react';
import { getChapterImages } from '../api/mangadex';
import { useLibrary } from '../context/LibraryContext';
import { Loading } from '../components/Loading';
import styles from './Reader.module.css';

type ReadingMode = 'vertical' | 'paged';

export const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToHistory } = useLibrary();

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => {
    return (localStorage.getItem('miko_reading_mode') as ReadingMode) || 'vertical';
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const query = new URLSearchParams(location.search);
  const mangaId = query.get('mangaId') || '';
  const title = query.get('title') || '';
  const coverUrl = query.get('cover') || '';

  useEffect(() => {
    if (!id) return;
    const fetchImages = async () => {
      try {
        const imageUrls = await getChapterImages(id);
        setImages(imageUrls);
        if (mangaId) {
          addToHistory({
            id: mangaId,
            title,
            coverUrl,
            lastChapterId: id,
            lastChapterNum: '?'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [id, mangaId]);

  useEffect(() => {
    localStorage.setItem('miko_reading_mode', readingMode);
  }, [readingMode]);

  const toggleHeader = () => setShowHeader(!showHeader);

  if (loading) return <Loading fullScreen message="Loading chapter..." />;

  return (
    <div className={styles.container} onClick={toggleHeader}>
      <header className={`${styles.header} ${!showHeader ? styles.headerHidden : ''}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate(-1)} className={styles.iconBtn}><ArrowLeft /></button>
        <div className={styles.chInfo}>{title}</div>
        <button className={styles.iconBtn} onClick={() => setShowSettings(!showSettings)}><Settings /></button>
      </header>

      {showSettings && (
        <div className={styles.settingsMenu} onClick={(e) => e.stopPropagation()}>
          <h3>Reading Mode</h3>
          <div className={styles.modeOptions}>
            <button 
              className={readingMode === 'vertical' ? styles.activeMode : ''} 
              onClick={() => setReadingMode('vertical')}
            >
              <LayoutList size={20} /> Vertical
            </button>
            <button 
              className={readingMode === 'paged' ? styles.activeMode : ''} 
              onClick={() => setReadingMode('paged')}
            >
              <Files size={20} /> Paged
            </button>
          </div>
        </div>
      )}

      {readingMode === 'vertical' ? (
        <div className={styles.verticalContainer}>
          {images.map((url, index) => (
            <img key={index} src={url} alt={`Page ${index + 1}`} className={styles.page} loading="lazy" />
          ))}
        </div>
      ) : (
        <div className={styles.pagedContainer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.pagedContent}>
            <img 
              src={images[currentPage]} 
              alt={`Page ${currentPage + 1}`} 
              className={styles.pagedImage} 
              onClick={toggleHeader}
            />
            
            <button 
              className={`${styles.navZone} ${styles.prevZone}`}
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            >
              <ChevronLeft size={48} />
            </button>
            <button 
              className={`${styles.navZone} ${styles.nextZone}`}
              onClick={() => setCurrentPage(p => Math.min(images.length - 1, p + 1))}
            >
              <ChevronRight size={48} />
            </button>
          </div>
          
          <div className={`${styles.bottomBar} ${!showHeader ? styles.headerHidden : ''}`}>
            <span>{currentPage + 1} / {images.length}</span>
            <input 
              type="range" 
              min="0" 
              max={images.length - 1} 
              value={currentPage} 
              onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};
