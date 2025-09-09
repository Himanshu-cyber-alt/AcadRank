import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'acadrank',
  password: 'Hemant@786',
  port: 5432,
});
