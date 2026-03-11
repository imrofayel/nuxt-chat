<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";
import type { UIMessage } from "ai";
import type { SelectMessage } from "#server/database/schema";

const route = useRoute();
const chatId = computed(() => String(route.params.chat));
const { currentModel } = useChatModel();

const { data: dbMessages, error } = await useFetch<SelectMessage[]>(
  `/api/messages/${chatId.value}`,
);

if (error.value || !dbMessages.value?.length) {
  await navigateTo("/chat", { replace: true });
}

const initialMessages: UIMessage[] = (dbMessages.value ?? []).map((m) => ({
  id: String(m.id),
  role: m.role as UIMessage["role"],
  content: m.content,
  parts: [{ type: "text" as const, text: m.content }],
}));

const chat = new Chat({ messages: initialMessages });

const sendMessage = async (message: string) => {
  if (chat.status === "submitted" || chat.status === "streaming") return;

  await chat.sendMessage(
    { text: message },
    {
      body: {
        model: currentModel.value?.value,
        chatId: chatId.value,
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
