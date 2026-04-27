import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || process.env.POSTGRES_USER,
      password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
      database: process.env.DB_NAME || process.env.POSTGRES_DB
    },
    migrations: {
      directory: './migrations',
      tableName: 'leaderboard_migrations'
    }
  }
};