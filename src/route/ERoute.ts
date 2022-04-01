import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import controller from '../controllers/EController';

function route(originalData: string): string {
  let response: string = '';
  try {
    const receivedId = originalData.substring(0, 2);
    const receivedContent = originalData.substring(2);
    switch (receivedId) {
      case 'E1':
        response = controller.responseE1(originalData);
        break;
      case 'E2':
        response = controller.responseE2(originalData);
        break;
      case 'E3':
        response = controller.responseE3(originalData);
        break;
      case 'E4':
        response = controller.responseE4(originalData);
        break;
      case 'E5':
        response = controller.responseE5(originalData);
        break;
      case 'E6':
        response = controller.responseE6(originalData);
        break;
      case 'E7':
        response = controller.responseE7(originalData);
        break;
      case 'E8':
        response = controller.responseE8(originalData);
        break;
      case 'E9':
        response = controller.responseE9(originalData);
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
