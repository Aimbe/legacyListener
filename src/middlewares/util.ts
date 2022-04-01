import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';

function testConsole(text: string) {
    try {
        console.log('util: ' + text);
    } catch (e) {
        if (typeof e === 'string') {
        mongodb.insertMongodb('Error', 'util', e);
        } else if (e instanceof Error) {
        mongodb.insertMongodb('Error', 'util', e.message);
        }
    }
  
}

export default { 
    testConsole,
}