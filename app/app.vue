<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();

watch(
  () => colorMode.state,
  (newValue) => {
    const codeBlockTheme = newValue.value === "dark" ? "github-dark" : "github-light";
    updateAppConfig({
      mdc: {
        highlight: {
          theme: codeBlockTheme,
        },
      },
    });
  },
  { immediate: true },
);
</script>
