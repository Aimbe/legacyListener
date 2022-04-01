import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import util from '../middlewares/util';
import bsns from '../middlewares/business';
import dao from '../db/dao/dao';

function responseE1(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    //bsns.testBusiness('business Logig gogo');
    //util.testConsole('response E1');
    //dao.testDB(originalData);
    //console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE2(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE3(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    let object = bsns.setObjectE3(originalData);
    console.log(object);
    //bsns.testBusiness('business Logig gogo');
    //util.testConsole('response E1');
    //console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE4(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE5(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE6(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE7(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE8(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseE9(originalData: string): string {
  let response: string = '3E000000003218201044000723      ';
  try {
    bsns.testBusiness('business Logig gogo');
    util.testConsole('response E1');
    console.log('E1 service res string : ' + response);
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

export default { 
    responseE1,
    responseE2,
    responseE3,
    responseE4,
    responseE5,
    responseE6,
    responseE7,
    responseE8,
    responseE9,
  }