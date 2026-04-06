import { Pool } from "pg";

// Global singleton to prevent creating multiple pools in development
const globalForPg = globalThis as unknown as {
  pool: Pool | undefined;
};

// Create pool only once
export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for Neon
    max: 5, // Limit connections (Neon free tier)
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

// Store pool in global for dev mode
if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}
