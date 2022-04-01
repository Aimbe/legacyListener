import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import service from '../services/EService';

function responseE1(originalData: string): string {
  let response: string = '';
  try {
    response = service.responseE1(originalData);
    console.log('E1 controller : response to terminal');
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
  let response: string = '';
  try {
    response = service.responseE2(originalData);
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
  let response: string = '';
  try {
    response = service.responseE3(originalData);
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
  let response: string = '';
  try {
    response = service.responseE4(originalData);
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
  let response: string = '';
  try {
    response = service.responseE5(originalData);
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
  let response: string = '';
  try {
    response = service.responseE6(originalData);
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
  let response: string = '';
  try {
    response = service.responseE7(originalData);
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
  let response: string = '';
  try {
    response = service.responseE8(originalData);
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
  let response: string = '';
  try {
    
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