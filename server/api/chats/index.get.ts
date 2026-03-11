import { z } from "zod";
import { inputError } from "#server/utils/invalid-input-error";
import { getChatsByGithubId } from "#server/database/operations";

const querySchema = z.object({
  githubId: z.string(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.safeParse);

  if (!query.success) {
    return inputError();
  }

  const response = await getChatsByGithubId(query.data.githubId);

  return response;
});
