/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_pmKJ03hcyoqd@ep-plain-night-a4ovoxkl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
    }
  };