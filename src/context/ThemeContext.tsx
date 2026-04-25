import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  background: string;
  outline: string;
}

export interface ThemeOption {
  id: string;
  name: string;
  dark: ThemeColors;
  light: ThemeColors;
}

const themes: ThemeOption[] = [
  {
    id: 'purple',
    name: 'Miko Purple',
    dark: {
      primary: '#d0bcff',
      onPrimary: '#381e72',
      primaryContainer: '#4f378b',
      onPrimaryContainer: '#eaddff',
      secondaryContainer: '#4a4458',
      onSecondaryContainer: '#e8def8',
      surface: '#1c1b1f',
      onSurface: '#e6e1e5',
      surfaceVariant: '#49454f',
      onSurfaceVariant: '#cac4d0',
      background: '#141218',
      outline: '#938f99',
    },
    light: {
      primary: '#6750a4',
      onPrimary: '#ffffff',
      primaryContainer: '#eaddff',
      onPrimaryContainer: '#21005d',
      secondaryContainer: '#e8def8',
      onSecondaryContainer: '#1d192b',
      surface: '#fef7ff',
      onSurface: '#1d1b20',
      surfaceVariant: '#e7e0eb',
      onSurfaceVariant: '#49454f',
      background: '#ffffff',
      outline: '#79747e',
    }
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    dark: {
      primary: '#a1c9ff',
      onPrimary: '#003258',
      primaryContainer: '#00497d',
      onPrimaryContainer: '#d2e4ff',
      secondaryContainer: '#3e4759',
      onSecondaryContainer: '#dbe2f9',
      surface: '#1a1c1e',
      onSurface: '#e2e2e6',
      surfaceVariant: '#43474e',
      onSurfaceVariant: '#c3c7cf',
      background: '#111318',
      outline: '#8d9199',
    },
    light: {
      primary: '#0061a4',
      onPrimary: '#ffffff',
      primaryContainer: '#d2e4ff',
      onPrimaryContainer: '#001d36',
      secondaryContainer: '#dbe2f9',
      onSecondaryContainer: '#151b2c',
      surface: '#fdfbff',
      onSurface: '#1a1c1e',
      surfaceVariant: '#dee3eb',
      onSurfaceVariant: '#43474e',
      background: '#ffffff',
      outline: '#73777f',
    }
  },
  {
    id: 'green',
    name: 'Forest Green',
    dark: {
      primary: '#91d794',
      onPrimary: '#003912',
      primaryContainer: '#00531e',
      onPrimaryContainer: '#ace3af',
      secondaryContainer: '#3d4b3d',
      onSecondaryContainer: '#d9e7d8',
      surface: '#1a1c1a',
      onSurface: '#e2e3df',
      surfaceVariant: '#424940',
      onSurfaceVariant: '#c2c9bd',
      background: '#121412',
      outline: '#8c9388',
    },
    light: {
      primary: '#006d26',
      onPrimary: '#ffffff',
      primaryContainer: '#ace3af',
      onPrimaryContainer: '#002107',
      secondaryContainer: '#d9e7d8',
      onSecondaryContainer: '#131f13',
      surface: '#f7fbf2',
      onSurface: '#191c19',
      surfaceVariant: '#dee5d8',
      onSurfaceVariant: '#424940',
      background: '#ffffff',
      outline: '#72796f',
    }
  },
  {
    id: 'red',
    name: 'Sakura Red',
    dark: {
      primary: '#ffb4ab',
      onPrimary: '#690005',
      primaryContainer: '#93000a',
      onPrimaryContainer: '#ffdad6',
      secondaryContainer: '#534341',
      onSecondaryContainer: '#f5ddda',
      surface: '#201a19',
      onSurface: '#ede0de',
      surfaceVariant: '#534341',
      onSurfaceVariant: '#d8c2bf',
      background: '#141211',
      outline: '#a08c8a',
    },
    light: {
      primary: '#ba1a1a',
      onPrimary: '#ffffff',
      primaryContainer: '#ffdad6',
      onPrimaryContainer: '#410002',
      secondaryContainer: '#f5ddda',
      onSecondaryContainer: '#251918',
      surface: '#fffbff',
      onSurface: '#201a19',
      surfaceVariant: '#f5ddda',
      onSurfaceVariant: '#534341',
      background: '#ffffff',
      outline: '#857370',
    }
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    dark: {
      primary: '#ffb68e',
      onPrimary: '#532200',
      primaryContainer: '#763300',
      onPrimaryContainer: '#ffdbca',
      secondaryContainer: '#52443d',
      onSecondaryContainer: '#f5ded4',
      surface: '#201a17',
      onSurface: '#ece0db',
      surfaceVariant: '#52443d',
      onSurfaceVariant: '#d5c3ba',
      background: '#141211',
      outline: '#9f8d85',
    },
    light: {
      primary: '#9a4500',
      onPrimary: '#ffffff',
      primaryContainer: '#ffdbca',
      onPrimaryContainer: '#311300',
      secondaryContainer: '#f5ded4',
      onSecondaryContainer: '#231a12',
      surface: '#fffbff',
      onSurface: '#201a17',
      surfaceVariant: '#f5ded4',
      onSurfaceVariant: '#52443d',
      background: '#ffffff',
      outline: '#85736b',
    }
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    dark: {
      primary: '#00e5ff',
      onPrimary: '#00363d',
      primaryContainer: '#004f58',
      onPrimaryContainer: '#97f0ff',
      secondaryContainer: '#3d4b4d',
      onSecondaryContainer: '#d8e7e9',
      surface: '#191c1d',
      onSurface: '#e1e3e3',
      surfaceVariant: '#3f484a',
      onSurfaceVariant: '#bfc8ca',
      background: '#111414',
      outline: '#899294',
    },
    light: {
      primary: '#006874',
      onPrimary: '#ffffff',
      primaryContainer: '#97f0ff',
      onPrimaryContainer: '#001f24',
      secondaryContainer: '#d8e7e9',
      onSecondaryContainer: '#001f24',
      surface: '#f4fafb',
      onSurface: '#191c1d',
      surfaceVariant: '#dae4e5',
      onSurfaceVariant: '#3f484a',
      background: '#ffffff',
      outline: '#6f797a',
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    dark: {
      primary: '#ffffff',
      onPrimary: '#000000',
      primaryContainer: '#2b2b2b',
      onPrimaryContainer: '#ffffff',
      secondaryContainer: '#1a1a1a',
      onSecondaryContainer: '#999999',
      surface: '#121212',
      onSurface: '#ffffff',
      surfaceVariant: '#242424',
      onSurfaceVariant: '#a0a0a0',
      background: '#000000',
      outline: '#444444',
    },
    light: {
      primary: '#000000',
      onPrimary: '#ffffff',
      primaryContainer: '#e0e0e0',
      onPrimaryContainer: '#000000',
      secondaryContainer: '#f5f5f5',
      onSecondaryContainer: '#666666',
      surface: '#ffffff',
      onSurface: '#000000',
      surfaceVariant: '#eeeeee',
      onSurfaceVariant: '#444444',
      background: '#fcfcfc',
      outline: '#bbbbbb',
    }
  }
];

export type HomeLayout = 'list' | 'grid';

interface ThemeContextType {
  currentTheme: ThemeOption;
  isDarkMode: boolean;
  homeLayout: HomeLayout;
  setThemeById: (id: string) => void;
  toggleDarkMode: () => void;
  setHomeLayout: (layout: HomeLayout) => void;
  themes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(() => {
    const saved = localStorage.getItem('miko_theme_id');
    return themes.find(t => t.id === saved) || themes[0];
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('miko_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  const [homeLayout, setHomeLayoutState] = useState<HomeLayout>(() => {
    return (localStorage.getItem('miko_home_layout') as HomeLayout) || 'list';
  });

  const applyTheme = (theme: ThemeOption, dark: boolean) => {
    const root = document.documentElement;
    const colors = dark ? theme.dark : theme.light;
    Object.entries(colors).forEach(([key, value]) => {
      const cssKey = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssKey, value as string);
    });
  };

  useEffect(() => {
    applyTheme(currentTheme, isDarkMode);
    localStorage.setItem('miko_theme_id', currentTheme.id);
    localStorage.setItem('miko_dark_mode', isDarkMode.toString());
    localStorage.setItem('miko_home_layout', homeLayout);
  }, [currentTheme, isDarkMode, homeLayout]);

  const setThemeById = (id: string) => {
    const theme = themes.find(t => t.id === id);
    if (theme) setCurrentTheme(theme);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const setHomeLayout = (layout: HomeLayout) => setHomeLayoutState(layout);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      isDarkMode, 
      homeLayout, 
      setThemeById, 
      toggleDarkMode, 
      setHomeLayout,
      themes 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
