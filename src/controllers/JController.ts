import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import service from '../services/JService';

function responseJ1(originalData: string): string {
  let response: string = '';
  try {
    response = service.responseJ1(originalData);
    console.log('J1 controller : response to terminal');
  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'EController', e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'EController', e.message);
    }
  }
  return response;
}

function responseJ2(originalData: string): string {
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

function responseJ3(originalData: string): string {
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

function responseJ4(originalData: string): string {
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

function responseJ5(originalData: string): string {
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

function responseJ6(originalData: string): string {
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

function responseJ7(originalData: string): string {
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

function responseJ8(originalData: string): string {
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

function responseJ9(originalData: string): string {
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