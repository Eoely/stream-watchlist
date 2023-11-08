<template>
  <h2>Upload your IMDB list - csv pl0x</h2>

  <input
    @change="onUpload"
    type="file"
  />
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import { ref } from 'vue';
import { ImdbMovie, MovieIdentifier } from '../types';
const movies = ref<Array<MovieIdentifier>>();

const emit = defineEmits(['completed', 'error']);

const onUpload = async (f: any) => {
  //TODO: Validate and test user input. File type, size, etc. idk
  const file = f.target.files[0];
  const { data } = await getFileData(file);

  if (!verifyHeaders(data)) {
    emit('error', 'Invalid headers');
    return;
  }

  movies.value = getMovieIdentifiers(data);

  if (movies.value.length > 0) {
    emit('completed', movies.value);
  } else {
    emit('error', 'Failed to parse file');
  }
};

const verifyHeaders = (data: Array<any>) => {
  const headers = Object.keys(data[0]);
  return (
    headers.includes('const') &&
    headers.includes('title') &&
    headers.includes('titleType')
  );
};

const getFileData = async (file: Papa.LocalFile): Promise<any> => {
  return new Promise((complete, error) =>
    Papa.parse(file, {
      header: true,
      transformHeader: s => transformHeaders(s),
      complete,
      error,
      skipEmptyLines: true,
    })
  );
};

const getMovieIdentifiers = (movieData: Array<ImdbMovie>, limit = 200) => {
  return movieData.slice(0, limit).map(movie => {
    console.log(movie);
    return {
      title: movie.title.trim().toLocaleLowerCase(),
      imdbId: movie.const,
      MovieType: movie.titleType,
    };
  });
};

const transformHeaders = (header: string) => {
  if (header === 'Runtime (mins)') return 'runtime';

  return toCamelCase(header);
};

const toCamelCase = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join('');
</script>
