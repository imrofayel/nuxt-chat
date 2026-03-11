import { z } from "zod";
import { inputError } from "#server/utils/invalid-input-error";
import { newMessage } from "#server/database/operations";
import { RoleEnum } from "#server/database/schema";

const messageInsertSchema = z.object({
  chatId: z.string(),
  role: z.enum(RoleEnum),
  content: z.string(),
});

export default defineEventHandler(async (event) => {
  const req = await readValidatedBody(event, messageInsertSchema.safeParse);

  if (!req.success) {
    return inputError();
  }

  const response = await newMessage(req.data);

  return response;
});
