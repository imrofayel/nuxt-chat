import { z } from "zod";
import { Output, createGateway, generateText } from "ai";
import { updateChatTitle } from "#server/database/operations";
import { inputError } from "#server/utils/invalid-input-error";

const reqSchema = z.object({
  firstMessage: z.string(),
  chatId: z.string(),
});

const titleSchema = z.object({
  title: z
    .string()
    .describe("The generated title for the AI chat with respect to the first message")
    .max(40, "Title must be less than 50 characters"),
});

const apiKey = useRuntimeConfig().ai.aiGatewayApiKey;

if (!apiKey) throw new Error("Missing AI Gateway API key");

const gateway = createGateway({ apiKey });

export default defineEventHandler(async (event) => {
  const req = await readValidatedBody(event, reqSchema.safeParse);

  if (!req.success) {
    return inputError();
  }

  const result = await generateText({
    model: gateway("openai/gpt-5-nano"),
    output: Output.object({ schema: titleSchema }),
    prompt:
      "Generate a concise and perfect title for an AI chat based on the following first message:\n\n" +
      req.data.firstMessage +
      `
      Generate a concise title that summarizes the overall topic of the conversation.

      Guidelines:

      * Maximum length: **40 characters**
      * The title should reflect the **main theme of the entire chat**, not just the first message
      * **Do not include the word "Chat"**
      * **Do not copy phrases directly** from the user's message
      * Write a **natural, complete title**, not keywords or fragments
      * Prefer clarity and readability over cleverness
      * If user just say hi, title should be like "Greetings" or a casual one.

      `,
  });

  const updated = await updateChatTitle({
    chatId: req.data.chatId,
    title: result.output.title,
  });

  return { title: result.output.title, updated };
});
