<script lang="ts" setup>
const { currentChat, getMessagesForChat } = useChat();
</script>

<template>
  <div class="">
    <ChatMessages :messages="getMessagesForChat(currentChat)" />
    <ChatInput />
  </div>
</template>
