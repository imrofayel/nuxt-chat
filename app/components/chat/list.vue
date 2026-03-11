<script lang="ts" setup>
const { chats } = useChat();
const route = useRoute();
const currentChatId = computed(() => (route.params.chat ? String(route.params.chat) : null));
</script>

<template>
  <div>
    <aside class="absolute inset-y-12 w-full">
      <ul class="space-y-1">
        <li v-for="chat in chats" :key="chat.id">
          <NuxtLink
            :to="`/chat/${chat.id}`"
            class="line-clamp-1 block rounded-md p-1.5"
            :class="
              currentChatId === String(chat.id) && 'bg-elevated ring ring-accented ring-inset'
            "
          >
            {{ chat.title }}
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>
