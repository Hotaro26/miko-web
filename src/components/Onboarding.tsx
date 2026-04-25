import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useTheme } from '../context/ThemeContext';
import { Check, ArrowRight, LayoutList, LayoutGrid } from 'lucide-react';
import styles from './Onboarding.module.css';

export const Onboarding: React.FC = () => {
  const { setUserName, completeOnboarding } = useLibrary();
  const { themes, currentTheme, setThemeById, homeLayout, setHomeLayout, isDarkMode } = useTheme();
  
  const [step, setStep] = useState(1);
  const [name, setNameInput] = useState('');

  const nextStep = () => setStep(step + 1);

  const handleFinish = () => {
    setUserName(name || 'Reader');
    completeOnboarding();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {step === 1 && (
          <div className={styles.step}>
            <div className={styles.iconCircle}>👋</div>
            <h1 className={styles.title}>Welcome to Miko</h1>
            <p className={styles.description}>Let's get started. What should we call you?</p>
            <input 
              type="text" 
              placeholder="Your name" 
              value={name} 
              onChange={(e) => setNameInput(e.target.value)}
              className={styles.input}
              autoFocus
            />
            <button className={styles.nextBtn} onClick={nextStep} disabled={!name.trim()}>
              Continue <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h1 className={styles.title}>Make it yours</h1>
            <p className={styles.description}>Pick a theme and layout that fits you.</p>
            
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Theme Color</p>
              <div className={styles.themeGrid}>
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    className={`${styles.themeChip} ${currentTheme.id === theme.id ? styles.selectedTheme : ''}`}
                    onClick={() => setThemeById(theme.id)}
                  >
                    <div 
                      className={styles.colorCircle} 
                      style={{ backgroundColor: isDarkMode ? theme.dark.primary : theme.light.primary }}
                    >
                      {currentTheme.id === theme.id && <Check size={14} color={isDarkMode ? theme.dark.onPrimary : theme.light.onPrimary} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Home Layout</p>
              <div className={styles.layoutToggle}>
                <button 
                  className={`${styles.layoutBtn} ${homeLayout === 'list' ? styles.activeLayout : ''}`}
                  onClick={() => setHomeLayout('list')}
                >
                  <LayoutList size={18} /> List
                </button>
                <button 
                  className={`${styles.layoutBtn} ${homeLayout === 'grid' ? styles.activeLayout : ''}`}
                  onClick={() => setHomeLayout('grid')}
                >
                  <LayoutGrid size={18} /> Grid
                </button>
              </div>
            </div>

            <button className={styles.nextBtn} onClick={handleFinish}>
              Start Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
