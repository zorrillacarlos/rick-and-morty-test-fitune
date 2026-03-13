export interface CharacterData {
  id: string;
  name: string;
  species: string;
  status: string;
  image: string;
  origin: { name: string };
}

export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersResponse {
  data: {
    characters: {
      info: PageInfo;
      results: CharacterData[];
    };
  };
}
