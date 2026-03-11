const MOCK_CHATS = [
  {
    id: 1,
    title: "Can life ever be happy?",
  },
  {
    id: 2,
    title: "Nuxt Environment Setup",
  },
  {
    id: 3,
    title: "JS Framework Extensions",
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
  },
];

const CHAT_MESSAGES = [
  {
    id: 1,
    chatId: 2,
    content: "Hey, how do I set up Nuxt?",
    sender: "user",
  },
  {
    id: 2,
    chatId: 2,
    content: `
You can follow the official documentation to get started.

### UsageCircle.vue

\`\`\`vue
<script setup lang="ts">
import { computed } from "vue"

interface Props {
  value: number
}

const props = defineProps<Props>()

const radius = 8
const circumference = 2 * Math.PI * radius

const offset = computed(() => {
  return circumference - (props.value / 100) * circumference
})
</script>
\`\`\`

### Example Usage

\`\`\`vue
<script setup lang="ts">
import UsageCircle from "@/components/UsageCircle.vue"

const usage = ref(31.3)
</script>

<template>
  <UsageCircle :value="usage" />
</template>
\`\`\`
`,
    sender: "assistant",
  },
];

export const useChat = () => {
  const chats = useState("chats", () => MOCK_CHATS);

  const currentChat = 2;

  function getMessagesForChat(chatId: number) {
    return CHAT_MESSAGES.filter((message) => message.chatId === chatId);
  }

  return { chats, currentChat, getMessagesForChat };
};
