import { Pool } from 'pg';
import 'dotenv/config';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_DB_NAME, process.env.POSTGRESQL_ID, process.env.POSTGRESQL_PASSWORD, {
  dialect: 'postgresql',
  host: process.env.POSTGRESQL_IP_ADDRESS,
  port: parseInt(<string>process.env.POSTGRESQL_PORT, 10),
});

const pool = new Pool({
  host: process.env.POSTGRESQL_IP_ADDRESS,
  user: process.env.POSTGRESQL_ID,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  port: parseInt(<string>process.env.POSTGRESQL_PORT, 10),
  max: parseInt(<string>process.env.POSTRESQL_POOL_MAX, 10),
});


async function testDB(originalData: string) {
  await pool.connect((err: Error, client, release) => {
    if (err) {
      return console.error('PostgreSQL Error acquiring client', err.stack);
    }
    let query = sequelize.query('SELECT * FROM public."receiveTest" rt ');
    console.log(query);
    client.query(query, (err: Error, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }

    });
  });
}

export default { testDB };
