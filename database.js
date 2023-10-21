const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movie-database-new',
  password: '6666',
  port: 5433, // Sesuaikan dengan port PostgreSQL Anda
});

module.exports = pool;
