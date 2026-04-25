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

export const getCoverUrl = (manga: Manga) => {
  const coverRel = manga.relationships.find((r) => r.type === 'cover_art');
  const fileName = coverRel?.attributes?.fileName;
  if (!fileName) return null;
  return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;
};

export const searchManga = async (title: string): Promise<Manga[]> => {
  const res = await fetch(`${BASE_URL}/manga?title=${encodeURIComponent(title)}&includes[]=cover_art&limit=20`);
  const json = await res.json();
  return json.data;
};

export const getManga = async (id: string): Promise<Manga> => {
  const res = await fetch(`${BASE_URL}/manga/${id}?includes[]=cover_art`);
  const json = await res.json();
  return json.data;
};

export const getMangaChapters = async (mangaId: string): Promise<Chapter[]> => {
  const res = await fetch(`${BASE_URL}/manga/${mangaId}/feed?translatedLanguage[]=en&order[chapter]=asc&limit=100`);
  const json = await res.json();
  return json.data;
};

export const getRandomManga = async (): Promise<Manga> => {
  const res = await fetch(`${BASE_URL}/manga/random?includes[]=cover_art`);
  const json = await res.json();
  return json.data;
};

export const getSuggestions = async (): Promise<Manga[]> => {
  const res = await fetch(`${BASE_URL}/manga?limit=20&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&order[latestUploadedChapter]=desc`);
  const json = await res.json();
  return json.data;
};

export const getChapterImages = async (chapterId: string): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/at-home/server/${chapterId}`);
  const json = await res.json();
  const { baseUrl, chapter } = json;
  return chapter.data.map((fileName: string) => `${baseUrl}/data/${chapter.hash}/${fileName}`);
};
