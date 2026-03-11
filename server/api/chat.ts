import type { UIMessage } from "ai";
import { streamText, convertToModelMessages, createGateway } from "ai";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().ai.aiGatewayApiKey;

  if (!apiKey) throw new Error("Missing AI Gateway API key");

  const gateway = createGateway({ apiKey });

  return defineEventHandler(async (event) => {
    const { messages, model }: { messages: UIMessage[]; model: string } = await readBody(event);

    const result = streamText({
      model: gateway(model),
      messages: await convertToModelMessages(messages),
    });

    // const uiStream = result.toUIMessageStreamResponse();

    // const usage = await result.totalUsage;
    // uiStream.headers.set(
    //   "X-Total-Tokens",
    //   usage.totalTokens?.toString() || "0",
    // );

    return result.toUIMessageStreamResponse();
  });
});
