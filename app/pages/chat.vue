<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";

definePageMeta({
  middleware: "auth",
  layout: "chat",
});

const chat = new Chat({});
const { currentModel } = useChatModel();

const sendMessage = async (message: string) => {
  if (chat.status === "submitted" || chat.status === "streaming") return;

  await chat.sendMessage(
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
    <ChatMessages :messages="chat.messages" :streaming="chat.status === 'streaming'" />
    <ChatInput
      :context-usage="34.4"
      :disabled="chat.status === 'submitted' || chat.status === 'streaming'"
      @message:send="sendMessage"
    />
  </div>
</template>
