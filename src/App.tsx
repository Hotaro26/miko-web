import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Favourites } from './pages/Favourites';
import { MangaDetail } from './pages/MangaDetail';
import { Reader } from './pages/Reader';
import { Settings } from './pages/Settings';
import { Onboarding } from './components/Onboarding';
import { useLibrary } from './context/LibraryContext';
import './styles/global.css';

function AppContent() {
  const { hasOnboarded } = useLibrary();

  return (
    <>
      {!hasOnboarded && <Onboarding />}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
          </Route>
          <Route path="/reader/:id" element={<Reader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <AppContent />
      </LibraryProvider>
    </ThemeProvider>
  );
}

export default App;
