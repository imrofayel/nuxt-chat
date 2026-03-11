<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";
import type { UIMessage } from "ai";
import type { SelectMessage } from "#server/database/schema";

const route = useRoute();
const chatId = computed(() => String(route.params.chat));
const { currentModel } = useChatModel();

const {
  data: dbMessages,
  error,
  pending,
} = await useFetch<SelectMessage[]>(() => `/api/messages/${chatId.value}`, {
  lazy: true,
  default: () => [] as SelectMessage[],
});

if (error.value) {
  await navigateTo("/chat", { replace: true });
}

const toUIMessages = (messages: SelectMessage[]): UIMessage[] =>
  messages.map((m) => ({
    id: String(m.id),
    role: m.role as UIMessage["role"],
    content: m.content,
    parts: [{ type: "text" as const, text: m.content }],
  }));

const initialMessages = toUIMessages(dbMessages.value ?? []);

const chat = new Chat({ messages: initialMessages });

watch(
  dbMessages,
  (messages) => {
    if (chat.messages.length === 0 && (messages?.length ?? 0) > 0) {
      chat.messages = toUIMessages(messages ?? []);
    }
  },
  { immediate: true },
);

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
    <div v-if="pending" class="flex flex-col gap-4">
      <div
        v-for="i in 2"
        :key="i"
        class="flex w-full"
        :class="i % 2 !== 0 ? 'justify-end' : 'justify-start'"
      >
        <USkeleton class="h-12" :class="i % 2 !== 0 ? 'w-40' : 'w-96'" />
      </div>
    </div>
    <ChatMessages v-else :messages="chat.messages" :streaming="chat.status === 'streaming'" />
    <ChatInput
      :context-usage="34.4"
      :disabled="chat.status === 'submitted' || chat.status === 'streaming'"
      @message:send="sendMessage"
    />
  </div>
</template>
