<script lang="ts" setup>
const { chats, currentChat } = useChat();
</script>

<template>
  <div>
    <UIcon name="codicon:list-selection" class="text-large" />

    <aside class="absolute inset-y-0 -left-1 w-full pt-8">
      <ul class="space-y-1">
        <li
          v-for="chat in chats"
          :key="chat.title"
          class="line-clamp-1 cursor-pointer rounded-md p-1.5"
          :class="currentChat === chat.id && 'bg-elevated ring ring-accented ring-inset'"
        >
          {{ chat.title }}
        </li>
      </ul>
    </aside>
  </div>
</template>
