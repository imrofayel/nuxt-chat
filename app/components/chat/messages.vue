<script lang="ts" setup>
import type { UIMessage } from "ai";

defineProps<{
  messages: UIMessage[];
}>();

const getText = (message: UIMessage) =>
  message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
</script>

<template>
  <div class="pb-30">
    <div v-for="message in messages" :key="message.id">
      <div v-if="message.role === 'user'">
        <div class="flex justify-end">
          <div class="rounded-lg bg-elevated px-4 py-2 text-white">
            {{ getText(message) }}
          </div>
        </div>
      </div>

      <MDC v-if="message.role !== 'user'" :value="getText(message)" tag="article" />
    </div>
  </div>
</template>
