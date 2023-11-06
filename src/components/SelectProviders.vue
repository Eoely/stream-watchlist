<template>
  <h3>Select providers</h3>
  <div
    v-for="{ id, name } in providers"
    :key="id"
    class="checkbox-row"
  >
    <input
      type="checkbox"
      :id="`provider-${id}`"
      :value="id"
      v-model="selectedProviders"
    />
    <label :for="`provider-${id}`">{{ name }}</label>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { providers } from '../providers';
const selectedProviders = ref<Array<number>>([]);

const emit = defineEmits(['providerChange']);

watch(selectedProviders, () => {
  emit('providerChange', selectedProviders.value);
});
</script>
