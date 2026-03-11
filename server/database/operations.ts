import { eq } from "drizzle-orm";
import db from "#server/database/db";
import { chats, messages, type Role } from "#server/database/schema";

function newChat({ githubId, firstMessage }: { githubId: string; firstMessage: string }) {
  const response = db
    .insert(chats)
    .values({
      githubId,
      title: firstMessage.trim().slice(0, 25),
    })
    .returning();

  return response;
}

function newMessage({ chatId, role, content }: { chatId: string; role: Role; content: string }) {
  const response = db
    .insert(messages)
    .values({
      chatId,
      role,
      content,
    })
    .returning();

  return response;
}

function getChatsByGithubId(githubId: string) {
  return db.select().from(chats).where(eq(chats.githubId, githubId));
}

function getMessagesByChatId(chatId: string) {
  return db.select().from(messages).where(eq(messages.chatId, chatId));
}

export { newChat, newMessage, getChatsByGithubId, getMessagesByChatId };
