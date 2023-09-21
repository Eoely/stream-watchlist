<template>
  <p
    v-for="result in results"
    :key="result.title"
  >
    {{
      `${result.originalTitle} is available on: ${providerNames(result).join(
        ', '
      )}`
    }}
  </p>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { MovieStreamingInfo } from '../types';

defineProps({
  results: {
    type: Array as PropType<Array<MovieStreamingInfo>>,
    required: true,
  },
});

const providerNames = (result: MovieStreamingInfo) =>
  result.providerContents.map(p => p.provider.name);
</script>

<style scoped>
.ul {
  list-style-type: none;
}
</style>
