import type { SelectChat } from "#server/database/schema";

export const useChat = () => {
  const { info } = useUser();

  const { data: chats, refresh: refreshChats } = useFetch<SelectChat[]>("/api/chats", {
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
    return result[0]!;
  }

  return { chats, createChat, refreshChats };
};
