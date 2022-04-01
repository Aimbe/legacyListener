import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import util from '../middlewares/util';
import bsns from '../middlewares/business';

function responseJ1(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J1');
    console.log('J1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ2(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J2');
    console.log('J2 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ3(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J3');
    console.log('J3 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ4(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J4');
    console.log('J4 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ5(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J5');
    console.log('J5 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ6(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J6');
    console.log('J6 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ7(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J7');
    console.log('J7 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ8(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J8');
    console.log('J8 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

function responseJ9(originalData: string): string {
  let response: string = '3J000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response J9');
    console.log('J9 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'JService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'JService', e.message);
    }
  }
  return response;
}

export default { 
    responseJ1,
    responseJ2,
    responseJ3,
    responseJ4,
    responseJ5,
    responseJ6,
    responseJ7,
    responseJ8,
    responseJ9,
  }