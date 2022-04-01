import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import controller from '../controllers/JController';

function route(originalData: string): string {
  let response: string = '';
  try {
    const receivedId = originalData.substring(0, 2);
    const receivedContent = originalData.substring(2);
    switch (receivedId) {
      case 'J1':
        response = controller.responseJ1(originalData);
        break;
      case 'J2':
        response = controller.responseJ2(originalData);
        break;
      case 'J3':
        response = controller.responseJ3(originalData);
        break;
      case 'J4':
        response = controller.responseJ4(originalData);
        break;
      case 'J5':
        response = controller.responseJ5(originalData);
        break;
      case 'J6':
        response = controller.responseJ6(originalData);
        break;
      case 'J7':
        response = controller.responseJ7(originalData);
        break;
      case 'J8':
        response = controller.responseJ8(originalData);
        break;
      case 'J9':
        response = controller.responseJ9(originalData);
        break;
      default:
    }
    s3Logger.s3Write(originalData);
    mongodb.insertMongodb('Error', 'index-socketOn', originalData);
    postgresql.insertDb(receivedId, receivedContent); 

  } catch (e) {
    if (typeof e === 'string') {
      mongodb.insertMongodb('Error', 'allK', e);
      console.log(e);
    } else if (e instanceof Error) {
      mongodb.insertMongodb('Error', 'allK', e.message);
      console.log(e.message);
    }
  }
  return response;
}

export default { route };
