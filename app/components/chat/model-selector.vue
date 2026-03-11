<script setup lang="ts">
import type { InputMenuItem } from "@nuxt/ui";

const { models, currentModel } = useChatModel();

const items = computed(() => models.value satisfies InputMenuItem[]);

const value = ref(currentModel.value);

watch(value, (v) => {
  currentModel.value = v;
});
</script>

<template>
  <UInputMenu v-model="value" :icon="value?.icon" :items="items" autocomplete="on" />
</template>
