<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">TV-show</th>
        <th
          scope="col"
          v-for="{ id, name } in selectedProviders"
          :key="id"
        >
          {{ name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="result in results"
        :key="result.id"
      >
        <td>{{ result.title }}</td>
        <td>{{ result.isSeries ? 'X' : '' }}</td>
        <td
          v-for="provider in selectedProviders"
          :key="provider.id"
        >
          <template
            v-if="
              result.providerContents
                .map(p => p.provider.id)
                .includes(provider.id)
            "
          >
            <a
              :href="result.providerContents.find(p => p.provider.id === provider.id)!.url"
              target="_blank"
            >
              X</a
            ></template
          >
        </td>
      </tr>
    </tbody>
  </table>
  <table class="table"></table>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { MovieStreamingInfo } from '../types';
import { providers } from '../providers';

const props = defineProps({
  results: {
    type: Array as PropType<Array<MovieStreamingInfo>>,
    required: true,
  },

  selectedProviderIds: {
    type: Array as PropType<Array<number>>,
    required: true,
  },
});

const selectedProviders = computed(() =>
  providers.filter(p => props.selectedProviderIds.includes(p.id))
);
</script>

<style scoped>
.ul {
  list-style-type: none;
}
</style>
