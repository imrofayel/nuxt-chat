import { z } from "zod";
import { inputError } from "#server/utils/invalid-input-error";
import { getMessagesByChatId } from "#server/database/operations";

const paramsSchema = z.object({
  chatId: z.string(),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.safeParse);

  if (!params.success) {
    return inputError();
  }

  const response = await getMessagesByChatId(params.data.chatId);

  return response;
});
