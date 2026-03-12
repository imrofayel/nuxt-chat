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
    .max(50, "Title must be less than 50 characters"),
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
      req.data.firstMessage,
  });

  const updated = await updateChatTitle({
    chatId: req.data.chatId,
    title: result.output.title,
  });

  return { title: result.output.title, updated };
});
