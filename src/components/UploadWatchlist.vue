<template>
  <input
    @change="onUpload"
    type="file"
  />

  <button @click="$emit('completed', cheatValue)">Cheat complete</button>
  {{ movies }}
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import { ref } from 'vue';
import { Movie, MovieIdentifier } from '../types';

const cheatValue: Array<MovieIdentifier> = [
  {
    title: 'oldboy',
    year: '2003',
  },
];

const movies = ref<Array<MovieIdentifier>>();

const emit = defineEmits(['completed', 'error']);

const onUpload = async (f: any) => {
  //TODO: Validate and test user input. File type, size, etc. idk
  const file = f.target.files[0];
  const { data } = await getFileData(file);

  movies.value = getMovieIdentifiers(data);

  if (movies.value.length > 0) {
    emit('completed', movies.value);
  } else {
    emit('error');
  }
};

const getFileData = async (file: Papa.LocalFile): Promise<any> => {
  return new Promise((complete, error) =>
    Papa.parse(file, {
      header: true,
      transformHeader: s => transformHeaders(s),
      complete,
      error,
    })
  );
};

const getMovieIdentifiers = (movieData: Array<Movie>, limit = 10) => {
  return movieData.slice(0, limit).map(movie => ({
    title: movie.title.trim().toLocaleLowerCase(),
    year: movie.year,
  }));
};

const transformHeaders = (header: string) => {
  if (header === 'Runtime (mins)') return 'runtime';

  return toCamelCase(header);
};

const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join('');
};
</script>
