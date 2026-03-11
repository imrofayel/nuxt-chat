import type { UIMessage } from "ai";
import { streamText, convertToModelMessages, createGateway } from "ai";
import { newMessage } from "#server/database/operations";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().ai.aiGatewayApiKey;

  if (!apiKey) throw new Error("Missing AI Gateway API key");

  const gateway = createGateway({ apiKey });

  return defineEventHandler(async (event) => {
    const { messages, model, chatId }: { messages: UIMessage[]; model: string; chatId: string } =
      await readBody(event);

    // Save the latest user message before streaming
    if (chatId) {
      const lastUserMsg = messages.findLast((m) => m.role === "user");
      if (lastUserMsg) {
        const text = lastUserMsg.parts
          .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
          .map((p) => p.text)
          .join("");
        if (text) await newMessage({ chatId, role: "user", content: text });
      }
    }

    const result = streamText({
      model: gateway(model),
      messages: await convertToModelMessages(messages),
      async onFinish({ text }) {
        if (!chatId || !text) return;
        await newMessage({ chatId, role: "assistant", content: text });
      },
    });

    return result.toUIMessageStreamResponse();
  });
});
