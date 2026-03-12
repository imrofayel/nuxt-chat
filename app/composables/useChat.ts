import type { SelectChat } from "#server/database/schema";

export const useChat = () => {
  const { info } = useUser();

  const {
    data: chats,
    refresh: refreshChats,
    pending,
  } = useFetch<SelectChat[]>("/api/chats", {
    key: "user-chats",
    query: computed(() => ({ githubId: info.value?.githubId })),
    default: () => [] as SelectChat[],
  });

  async function createChat(firstMessage: string) {
    const result = await $fetch<SelectChat[]>("/api/chats", {
      method: "POST",
      body: {
        githubId: String(info.value!.githubId),
        firstMessage,
      },
    });

    const createdChat = result[0]!;

    void refreshChats();

    void $fetch("/api/chats/title", {
      method: "POST",
      body: {
        chatId: String(createdChat.id),
        firstMessage,
      },
    })
      .then(() => refreshChats())
      .catch(() => {});

    return createdChat;
  }

  return { chats, createChat, refreshChats, pending };
};
