<template>
  <h1>Find out where to stream your movies</h1>

  <UploadWatchlist
    v-if="selectedProviders.length > 0 && results.length === 0 && !loading"
    @completed="getStreamingInfo"
    @error="setError"
  />

  <SelectProviders
    v-if="results.length === 0 && !loading"
    @provider-change="selectedProviders = $event"
  />

  <DisplayResults
    v-if="results.length > 0"
    :results="results"
    :selected-provider-ids="selectedProviders"
  />

  <h3 v-if="loading">Loading...</h3>

  <h3 v-if="error.length > 0">Error: {{ error }}</h3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UploadWatchlist from './components/UploadWatchlist.vue';
import DisplayResults from './components/DisplayResults.vue';
import SelectProviders from './components/SelectProviders.vue';

import { MovieIdentifier, MovieStreamingInfo, MovieType } from './types';

const error = ref('');
const results = ref<Array<MovieStreamingInfo>>([]);
const loading = ref(false);
const selectedProviders = ref<Array<number>>([]);

const getStreamingInfo = async (movies: Array<MovieIdentifier>) => {
  error.value = '';
  loading.value = true;
  const movieData = await Promise.all(
    movies.map(movie => getMovieStreamingData(movie))
  );

  movieData.forEach((movie, index) => {
    movie
      ? handleFoundMovie(movie)
      : console.log(`Failed to find ${movies[index].title}`);
  });
  loading.value = false;
};

const getMovieStreamingData = async (
  movie: MovieIdentifier
): Promise<MovieStreamingInfo | undefined> => {
  const searchResults = await searchForMovie(movie.title);
  if (movie.MovieType === MovieType.Movie) {
    return searchResults.find(m => m.imdbId === movie.imdbId);
  } else {
    return searchResults.find(
      m =>
        m.originalTitle.trim().toLocaleLowerCase() === movie.title && m.isSeries
    );
  }
};

const searchForMovie = async (
  name: string,
  limit = 10
): Promise<Array<MovieStreamingInfo>> => {
  const urlSafeName = encodeURIComponent(name);
  const url = `https://skynet.filmweb.no/MovieInfoQs/graphql?query=query%20searchQuery(%24searchText%3A%20String%2C%20%24numItems%3A%20Int)%20%7B%20streamingQuery%20%7B%20searchForStreamingContent(searchText%3A%20%24searchText%2C%20numItems%3A%20%24numItems)%20%7B%20id%20title%20imdbId%20isSeries%20originalTitle%20ratingImdb%20year%20providerContents%20%7B%20id%20provider%20%7B%20id%20logo%20name%20%7D%20title%20url%20%7D%20%7D%20%7D%20%7D&variables=%7B%22searchText%22%3A%22${urlSafeName}%22%2C%22numItems%22%3A${limit}%7D`;
  const response = await fetch(url);
  const { data } = await response.json();

  return data.streamingQuery.searchForStreamingContent;
};

const handleFoundMovie = (movie: MovieStreamingInfo) => {
  if (movie.providerContents.length === 0) {
    console.log(`${movie.title} is not available on any providers`);
  } else {
    results.value.push(movie);
  }
};

const setError = (message: string) => {
  error.value = message;
};
</script>
