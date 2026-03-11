import type { UIMessage } from "ai";
import { streamText, convertToModelMessages, createGateway } from "ai";
import { countMessagesByGithubId, newMessage } from "#server/database/operations";
import type { GitHubUser } from "#shared/types/user";

const MAX_MESSAGES_PER_USER = 30;

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().ai.aiGatewayApiKey;

  if (!apiKey) throw new Error("Missing AI Gateway API key");

  const gateway = createGateway({ apiKey });

  return defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    const githubId = (session.user as GitHubUser | undefined)?.githubId;

    if (!githubId) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const messageCount = await countMessagesByGithubId(String(githubId));
    if (messageCount >= MAX_MESSAGES_PER_USER) {
      throw createError({
        statusCode: 429,
        statusMessage: `Message limit reached (${MAX_MESSAGES_PER_USER})`,
      });
    }

    const { messages, model, chatId }: { messages: UIMessage[]; model: string; chatId: string } =
      await readBody(event);

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
