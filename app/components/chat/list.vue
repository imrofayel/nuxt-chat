<script lang="ts" setup>
const { chats } = useChat();
const route = useRoute();
const currentChatId = computed(() => (route.params.chat ? String(route.params.chat) : null));
</script>

<template>
  <div>
    <UIcon name="codicon:list-selection" class="text-large" />

    <aside class="absolute inset-y-0 -left-1 w-full pt-8">
      <ul class="space-y-1">
        <li
          v-for="chat in chats"
          :key="chat.id"
          class="line-clamp-1 cursor-pointer rounded-md p-1.5"
          :class="currentChatId === String(chat.id) && 'bg-elevated ring ring-accented ring-inset'"
          @click="navigateTo(`/chat/${chat.id}`)"
        >
          {{ chat.title }}
        </li>
      </ul>
    </aside>
  </div>
</template>
