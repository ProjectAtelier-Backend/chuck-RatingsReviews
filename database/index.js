require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.db_credentials.user,
  host: process.env.db_credentials.host,
  password: process.env.db_credentials.password,
  port: process.env.db_credentials.port,
  database: 'sdc_ratings_and_reviews',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.on('connect', client => {
  console.log(`pool connected to ${client.user}@${client.host} using database ${client.database} on port ${client.port}`)
})

module.exports = pool;