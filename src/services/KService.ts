import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import util from '../middlewares/util';
import bsns from '../middlewares/business';

function responseK1(originalData: string): string {
  let response: string = '3K000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K1');
    console.log('K1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK2(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K2');
    console.log('K2 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK3(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K3');
    console.log('K3 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK4(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K4');
    console.log('K4 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK5(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K5');
    console.log('K5 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK6(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K6');
    console.log('K6 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK7(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K7');
    console.log('K7 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK8(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K8');
    console.log('K8 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

function responseK9(originalData: string): string {
  let response: string = '3K000000003218201044000723';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response K9');
    console.log('K9 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'KService', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'KService', e.message);
    }
  }
  return response;
}

export default { 
    responseK1,
    responseK2,
    responseK3,
    responseK4,
    responseK5,
    responseK6,
    responseK7,
    responseK8,
    responseK9,
  }