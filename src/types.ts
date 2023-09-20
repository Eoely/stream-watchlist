export interface MovieSearchResult {
  movieId: string;
  streamingContentId: string;
  title: string;
  productionYear: string;
}

export interface Movie {
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
