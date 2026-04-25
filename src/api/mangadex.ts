const BASE_URL = 'https://api.mangadex.org';

export interface Manga {
  id: string;
  attributes: {
    title: { [key: string]: string };
    description: { [key: string]: string };
  };
  relationships: Array<{
    id: string;
    type: string;
    attributes?: {
      fileName: string;
    };
  }>;
}

export interface Chapter {
  id: string;
  attributes: {
    chapter: string;
    title: string;
  };
}

const fetchWithTimeout = async (url: string, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const getCoverUrl = (manga: Manga) => {
  const coverRel = manga.relationships.find((r) => r.type === 'cover_art');
  const fileName = coverRel?.attributes?.fileName;
  if (!fileName) return null;
  return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;
};

export const searchManga = async (title: string): Promise<Manga[]> => {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/manga?title=${encodeURIComponent(title)}&includes[]=cover_art&limit=20&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Search Manga failed:', err);
    return [];
  }
};

export const getManga = async (id: string): Promise<Manga> => {
  const res = await fetchWithTimeout(`${BASE_URL}/manga/${id}?includes[]=cover_art`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  return json.data;
};

export const getMangaChapters = async (mangaId: string): Promise<Chapter[]> => {
  const res = await fetchWithTimeout(`${BASE_URL}/manga/${mangaId}/feed?translatedLanguage[]=en&order[chapter]=asc&limit=100&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includeExternalVol=0`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  return json.data;
};

export const getRandomManga = async (): Promise<Manga> => {
  const res = await fetchWithTimeout(`${BASE_URL}/manga/random?includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  return json.data;
};

export const getSuggestions = async (): Promise<Manga[]> => {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/manga?limit=20&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&order[latestUploadedChapter]=desc`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Get Suggestions failed:', err);
    return [];
  }
};

export const getChapterImages = async (chapterId: string): Promise<string[]> => {
  const res = await fetchWithTimeout(`${BASE_URL}/at-home/server/${chapterId}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  const { baseUrl, chapter } = json;
  // Use data-saver if standard data fails or for faster loading, but let's stay with standard data for now
  return chapter.data.map((fileName: string) => `${baseUrl}/data/${chapter.hash}/${fileName}`);
};
