import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import service from '../services/KService';

function responseK1(originalData: string): string {
  let response: string = '';
  try {
    response = service.responseK1(originalData);
    console.log('K1 controller : response to terminal');
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseK2(originalData: string): string {
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

function responseK3(originalData: string): string {
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

function responseK4(originalData: string): string {
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

function responseK5(originalData: string): string {
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

function responseK6(originalData: string): string {
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

function responseK7(originalData: string): string {
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

function responseK8(originalData: string): string {
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

function responseK9(originalData: string): string {
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