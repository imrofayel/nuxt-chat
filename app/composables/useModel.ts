const PROVIDERS = [
  {
    label: "Claude Haiku 4.5",
    value: "anthropic/claude-haiku-4.5",
    icon: "logos:claude-icon",
  },
  {
    label: "GPT 4 Nano",
    value: "openai/gpt-5-nano",
    icon: "ri:openai-fill",
  },
  {
    label: "Llama 4 Scout",
    value: "meta/llama-4-scout",
    icon: "logos:meta-icon",
  },
  {
    label: "Gemini 3 Flash",
    value: "google/gemini-3-flash",
    icon: "logos:google-icon",
  },
];

export const useModel = () => {
  const models = useState("models", () => PROVIDERS);
  const currentModel = useState("current-model", () => PROVIDERS[0]);

  return { models, currentModel };
};
