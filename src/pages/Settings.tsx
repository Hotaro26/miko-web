import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLibrary } from '../context/LibraryContext';
import { useNavigate } from 'react-router-dom';
import { Check, Sun, Moon, LayoutList, LayoutGrid } from 'lucide-react';
import { getRandomManga } from '../api/mangadex';
import { Loading } from '../components/Loading';
import styles from './Settings.module.css';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c3-1 6-1 8 .5"></path><path d="M7 14.5c4-1.5 8-1.5 10 0"></path><path d="M9 8.5c2.5-.5 5.5-.5 7 1"></path></svg>
);

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="22" x2="14" y2="10"></line><path d="M9 10a5 5 0 1 1 5 5c-1.5 0-3-.5-4-1.5L8 22"></path></svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6h-11a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"></path><path d="M8 12h.01"></path><path d="M16 12h.01"></path><path d="M10 15c1.5 1 2.5 1 4 0"></path></svg>
);

export const Settings: React.FC = () => {
  const { 
    currentTheme, 
    setThemeById, 
    themes, 
    isDarkMode, 
    toggleDarkMode,
    homeLayout,
    setHomeLayout
  } = useTheme();
  const { userName, setUserName } = useLibrary();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRandom = async () => {
    setLoading(true);
    try {
      const manga = await getRandomManga();
      navigate(`/manga/${manga.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen message="Loading surprise..." />;

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Settings</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <p className={styles.description}>What should we call you?</p>
        <input 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
          className={styles.nameInput}
          placeholder="Your name"
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Appearance</h2>
        <p className={styles.description}>Choose your mode and accent color</p>

        <div className={styles.modeToggle}>
          <button 
            className={`${styles.modeBtn} ${!isDarkMode ? styles.activeMode : ''}`}
            onClick={toggleDarkMode}
            disabled={!isDarkMode}
          >
            <Sun size={20} /> Light
          </button>
          <button 
            className={`${styles.modeBtn} ${isDarkMode ? styles.activeMode : ''}`}
            onClick={toggleDarkMode}
            disabled={isDarkMode}
          >
            <Moon size={20} /> Dark
          </button>
        </div>
        
        <div className={styles.themeGrid}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`${styles.themeCard} ${currentTheme.id === theme.id ? styles.selected : ''}`}
              onClick={() => setThemeById(theme.id)}
            >
              <div 
                className={styles.colorPreview} 
                style={{ backgroundColor: isDarkMode ? theme.dark.primary : theme.light.primary }}
              >
                {currentTheme.id === theme.id && (
                  <Check size={20} color={isDarkMode ? theme.dark.onPrimary : theme.light.onPrimary} />
                )}
              </div>
              <span className={styles.themeName}>{theme.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Home Layout</h2>
        <p className={styles.description}>Choose how your history is displayed</p>
        
        <div className={styles.modeToggle}>
          <button 
            className={`${styles.modeBtn} ${homeLayout === 'list' ? styles.activeMode : ''}`}
            onClick={() => setHomeLayout('list')}
            disabled={homeLayout === 'list'}
          >
            <LayoutList size={20} /> List
          </button>
          <button 
            className={`${styles.modeBtn} ${homeLayout === 'grid' ? styles.activeMode : ''}`}
            onClick={() => setHomeLayout('grid')}
            disabled={homeLayout === 'grid'}
          >
            <LayoutGrid size={20} /> Grid
          </button>
        </div>
      </section>

      <div className={styles.horizontalGroup}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Developer</h2>
          <div className={styles.devCard}>
            <div className={styles.devHeader}>
              <div className={styles.devAvatar}>
                <img src="https://github.com/Hotaro26.png" alt="hotaro" />
              </div>
              <div className={styles.devInfo}>
                <h3>hotaro</h3>
                <p>@oi.hotaro</p>
              </div>
            </div>
            <div className={styles.devLinks}>
              <a href="https://github.com/Hotaro26" target="_blank" rel="noopener noreferrer" className={styles.devLink}>
                <GithubIcon /> GITHUB
              </a>
              <a href="https://discord.com" onClick={(e) => { e.preventDefault(); alert('Discord ID: oi.hotaro'); }} className={styles.devLink}>
                <DiscordIcon /> DISCORD
              </a>
              <a href="https://open.spotify.com/user/31lx3m76madtoolhoyrmy7d474ym?si=b2c8f8deebff4aad" target="_blank" rel="noopener noreferrer" className={styles.devLink}>
                <SpotifyIcon /> SPOTIFY
              </a>
              <a href="https://pin.it/3SLXHYBbY" target="_blank" rel="noopener noreferrer" className={styles.devLink}>
                <PinterestIcon /> PINTEREST
              </a>
            </div>
            <div className={styles.devProtocol}>
              <span>DEVELOPER_PROTOCOL</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.aboutCard}>
            <p><strong>Miko Web</strong></p>
            <p>A Material 3 Expressive manga reader built with React.</p>
            <p className={styles.version}>Version 1.0.0</p>
            <button className={styles.randomBtn} onClick={handleRandom}>Surprise Me</button>
          </div>
        </section>
      </div>
    </div>
  );
};
