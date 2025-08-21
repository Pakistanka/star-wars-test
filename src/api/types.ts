export interface ICommonProps {
  title?: string;
  name: string;
  films?: string[];
  url: string;
  created: string;
  edited: string;
}

export interface Person extends ICommonProps {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

export interface PeopleResponse extends ICommonProps {
  count: number;
  results: Person[];
}

export interface ICategoryListParams {
  category?: string;
  pageParam: number;
  signal: AbortSignal;
}
