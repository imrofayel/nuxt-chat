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

export const useChat = () => {
  const chats = useState("chats", () => MOCK_CHATS);

  const currentChat = 2;

  return { chats, currentChat };
};
