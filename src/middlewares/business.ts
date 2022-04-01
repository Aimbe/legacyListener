import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import { E1, E2, E3, E4, E5, E6, E7, E8, E9 } from '../models/e';
import { J1, J2, J3, J4, J5, J6, J7, J8, J9 } from '../models/j';
import { K1, K2, K3, K4, K5, K6, K7, K8, K9 } from '../models/k';

//const HashMap = require('hashmap');

function testBusiness(text: string) {
    try {
        console.log('testBusiness: ' + text);
    } catch (e) {
        if (typeof e === 'string') {
        mongodb.insertMongodb('Error', 'testBusiness', e);
        } else if (e instanceof Error) {
        mongodb.insertMongodb('Error', 'testBusiness', e.message);
        }
    }
  
}

function setObjectE3(text: string): any {
    let object;
    try {
        object = new E3(text);
        console.log(object);
    } catch (e) {
        if (typeof e === 'string') {
        mongodb.insertMongodb('Error', 'testBusiness', e);
        } else if (e instanceof Error) {
        mongodb.insertMongodb('Error', 'testBusiness', e.message);
        }
    }
    return object;
}

export default { 
    testBusiness,
    setObjectE3,
}