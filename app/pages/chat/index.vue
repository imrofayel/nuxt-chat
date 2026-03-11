<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";

const chat = new Chat({});
const { currentModel } = useChatModel();
const { createChat, refreshChats } = useChat();

const activeChatId = ref<string | null>(null);

const sendMessage = async (message: string) => {
  if (chat.status === "submitted" || chat.status === "streaming") return;

  let isNewChat = false;

  if (!activeChatId.value) {
    try {
      const created = await createChat(message);
      activeChatId.value = String(created.id);
      await refreshChats();
      isNewChat = true;
    } catch {
      return;
    }
  }

  await chat.sendMessage(
    { text: message },
    {
      body: {
        model: currentModel.value?.value,
        chatId: activeChatId.value,
      },
    },
  );

  if (isNewChat && activeChatId.value) {
    await navigateTo(`/chat/${activeChatId.value}`, { replace: true });
  }
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
