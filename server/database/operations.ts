import { eq, sql, and, desc } from "drizzle-orm";
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

function updateChatTitle({ chatId, title }: { chatId: string; title: string }) {
  return db
    .update(chats)
    .set({
      title: title.trim().slice(0, 50),
      updatedAt: sql`(unixepoch())`,
    })
    .where(eq(chats.id, Number(chatId)))
    .returning();
}

async function deleteLastAssistantMessage(chatId: string) {
  const [lastMsg] = await db
    .select({ id: messages.id })
    .from(messages)
    .where(and(eq(messages.chatId, chatId), eq(messages.role, "assistant")))
    .orderBy(desc(messages.id))
    .limit(1);

  if (!lastMsg) return;

  return db.delete(messages).where(eq(messages.id, lastMsg.id));
}

export {
  newChat,
  newMessage,
  getChatsByGithubId,
  getMessagesByChatId,
  updateChatTitle,
  deleteLastAssistantMessage,
};
