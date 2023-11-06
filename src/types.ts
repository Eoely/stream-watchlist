export interface ImdbMovie {
  const: string;
  created: string;
  dateRated: string;
  description: string;
  directors: string;
  genres: string;
  imdbRating: string;
  modified: string;
  numVotes: string;
  position: string;
  releaseDate: string;
  runtime: string;
  title: string;
  titleType: MovieType;
  url: string;
  year: string;
  yourRating: string;
}

export enum MovieType {
  Movie = 'movie',
  Series = 'tvSeries',
  MiniSeries = 'tvMiniSeries',
}
export interface MovieIdentifier {
  title: string;
  imdbId: string;
  MovieType: MovieType;
}

export interface MovieStreamingInfo {
  id: string; //TODO: Probably also number
  title: string;
  imdbId: string;
  isSeries: boolean;
  originalTitle: string;
  ratingImdb: number;
  year: number; //string?
  providerContents: ProviderContent[];
}

interface ProviderContent {
  id: number;
  provider: Provider;
  title: string;
  url: string;
}

export interface Provider {
  id: number;
  logo: string;
  name: string;
}
