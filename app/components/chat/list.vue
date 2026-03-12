<script lang="ts" setup>
const { chats, pending } = useChat();
const route = useRoute();
const currentChatId = computed(() => (route.params.chat ? String(route.params.chat) : null));
</script>

<template>
  <div>
    <aside class="absolute inset-y-12 w-full">
      <ul v-if="!pending" class="space-y-1">
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

      <div v-else class="flex flex-col gap-2">
        <USkeleton class="h-8 w-full rounded-md" />
        <USkeleton class="h-8 w-full rounded-md" />
      </div>
    </aside>
  </div>
</template>
