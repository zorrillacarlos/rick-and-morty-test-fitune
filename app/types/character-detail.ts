interface CharacterDetail {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
  episode: { id: string }[];
}

export interface CharacterDetailResponse {
  data: { character: CharacterDetail };
}
