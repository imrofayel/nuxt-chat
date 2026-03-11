<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "chat",
});
</script>

<template>
  <NuxtPage :key="($route.params.chat as string) ?? 'new'" />
</template>
