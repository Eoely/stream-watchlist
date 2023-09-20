<template>
  <h1>Upload your watchlist below :)</h1>
  <h2>csv pl0x</h2>
  <UploadWatchlist
    v-if="showFileUpload"
    @completed="getFilmWebIds"
  />

  <h3 v-if="error !== ''">{{ error }}</h3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UploadWatchlist from './components/UploadWatchlist.vue';
import { MovieIdentifier, MovieSearchResult } from './types';

const error = ref('');
const showFileUpload = ref(true);
const getFilmWebIds = async (movies: Array<MovieIdentifier>) => {
  error.value = '';
  showFileUpload.value = false;
  console.log('skjaaa', movies);
  // const movieIds = await Promise.all(
  //   movieNames.map(name => getFilmWebIdByName(name))
  // );
  const movieId = await getFilmWebId(movies[0]);
  console.log('movieId', movieId);
};

//TODO: Somehow await this function better
const getFilmWebId = async (movie: MovieIdentifier) => {
  const searchResults = await searchForMovie(movie.title);
  console.log('data', searchResults);

  const movieId = searchResults.find(
    m =>
      m.title.toLocaleLowerCase() === movie.title &&
      m.productionYear === movie.year
  )?.streamingContentId;

  if (!movieId) {
    setError(`Could not find movie: ${movie.title} (${movie.year})`);
    return;
  }

  console.log('movie', movieId);
  return movieId;
};

const searchForMovie = async (
  name: string,
  limit = 10
): Promise<Array<MovieSearchResult>> => {
  const urlSafeName = encodeURIComponent(name);
  const url = `https://skynet.filmweb.no/MovieInfoQs/graphql?query=query%20searchQuery(%24searchText%3A%20String%2C%20%24streamingOnly%3A%20Boolean%2C%20%24maxNumItems%3A%20Int)%20%7B%0A%20%20searchForWatchableContent(searchText%3A%20%24searchText%2C%20streamingOnly%3A%20%24streamingOnly%2C%20maxNumItems%3A%20%24maxNumItems)%20%7B%0A%20%20%20%20movieId%0A%20%20%20%20streamingContentId%0A%20%20%20%20title%0A%20%20%20%20productionYear%0A%20%20%7D%0A%7D&variables=%7B%22searchText%22%3A%22${urlSafeName}%22%2C%22streamingOnly%22%3Afalse%2C%22maxNumItems%22%3A${limit}%7D`;
  const response = await fetch(url);
  const { data } = await response.json();
  return data.searchForWatchableContent;
};

const setError = (message: string) => {
  error.value = message;
  showFileUpload.value = true;
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
