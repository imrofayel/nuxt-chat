<script lang="ts" setup>
defineProps<{
  messages: {
    id: number;
    chatId: number;
    content: string;
    sender: string;
  }[];
}>();
</script>

<template>
  <div class="pb-30">
    <div v-for="message in messages" :key="message.id">
      <div v-if="message.sender === 'user'">
        <div class="flex justify-end">
          <div class="rounded-lg bg-elevated px-4 py-2 text-white">
            {{ message.content }}
          </div>
        </div>
      </div>

      <MDC v-else :value="message.content" tag="article" />
    </div>
  </div>
</template>
