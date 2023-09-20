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
  titleType: string;
  url: string;
  year: string;
  yourRating: string;
}

export interface MovieIdentifier {
  title: string;
  year: string;
}

export interface MovieSearchResult {
  movieId: string;
  streamingContentId: string;
  title: string; //Would be nice to have original title
  productionYear: string;
}
export interface MovieStreamingInfo {
  id: string;
  isSeries: boolean;
  title: string;
  //OriginalTitle: string; //Not fetched
  filmwebMovieId: string;
  imdbId: string;
  ratingImdb: number;
  providerContents: ProviderContent[];
}

interface ProviderContent {
  id: string;
  provider: Provider;
  title: string;
  url: string;
}

interface Provider {
  id: string;
  logo: string;
  name: string;
}
