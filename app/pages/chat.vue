<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";

const chat = new Chat({});

const { currentModel } = useChatModel();

const sendMessage = (message: string) => {
  chat.sendMessage(
    { text: message },
    {
      body: {
        model: currentModel.value?.value,
      },
    },
  );
};
</script>

<template>
  <div>
    <ChatMessages :messages="chat.messages" />
    <ChatInput :context-usage="34.4" @message:send="sendMessage" />
  </div>
</template>
