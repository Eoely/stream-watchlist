<template>
  <h1>Upload your watchlist below :)</h1>
  <h2>csv pl0x</h2>
  <input @change="onUpload" type="file" />
  {{ movieNames }}
</template>

<script setup lang="ts">
import Papa from "papaparse";
import { ref } from "vue";

const movieNames = ref<Array<string>>();

const onUpload = async (f: any) => {
  const file = f.target.files[0];
  const { data } = await getFileData(file);

  movieNames.value = getMovieNames(data);
};

const getFileData = async (file: Papa.LocalFile): Promise<any> => {
  return new Promise((complete, error) =>
    Papa.parse(file, {
      header: true,
      transformHeader: (s) => transformHeaders(s),
      complete,
      error,
    })
  );
};

const getMovieNames = (movieData: Array<Movie>, limit = 10) => {
  return movieData.slice(0, limit).map((movie) => movie.title);
};

const transformHeaders = (header: string) => {
  if (header === "Runtime (mins)") return "runtime";

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
    .join("");
};

interface Movie {
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
</script>
