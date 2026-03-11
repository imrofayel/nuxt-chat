import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const config = useRuntimeConfig();

const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken,
});

const db = drizzle(client);

export default db;
