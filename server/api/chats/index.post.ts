import { z } from "zod";
import { inputError } from "#server/utils/invalid-input-error";
import { newChat } from "#server/database/operations";

const chatInsertSchema = z.object({
  githubId: z.string(),
  firstMessage: z.string(),
});

export default defineEventHandler(async (event) => {
  const req = await readValidatedBody(event, chatInsertSchema.safeParse);

  if (!req.success) {
    return inputError;
  }

  const response = await newChat(req.data);

  return response;
});
