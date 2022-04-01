import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  host: process.env.POSTGRESQL_IP_ADDRESS,
  user: process.env.POSTGRESQL_ID,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  port: parseInt(<string>process.env.POSTGRESQL_PORT, 10),
  max: parseInt(<string>process.env.POSTRESQL_POOL_MAX, 10),
});

async function insertDb(keyId: string, keyData: string) {
  pool.connect((err: Error, client, release) => {
    if (err) {
      return console.error('PostgreSQL Error acquiring client', err.stack);
    }
    client.query('SELECT fc_receive_test($1, $2)', [keyId, keyData], (err: Error, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      const myKey: string = keyId + keyData.substring(2, 1);
      console.log(`${result.rowCount} - ${myKey}`);
    });
  });
}

export default { insertDb };
// module.exports = {
//   insertDb: async function (keyId: string, keyData: string) {
//     pool.connect((err: Error, client, release) => {
//       if (err) {
//         return console.error('Error acquiring client', err.stack);
//       }
//       client.query('SELECT fc_receive_test($1, $2)', [keyId, keyData], (err: Error, result) => {
//         release();
//         if (err) {
//           return console.error('Error executing query', err.stack);
//         }
//         const myKey: string = keyId + keyData.substring(2, 1);
//         console.log(`${result.rowCount} - ${myKey}`);
//       });
//     });
//   },
// };
