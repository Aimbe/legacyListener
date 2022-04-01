import s3Logger from '../db/s3Logger';
import mongodb from '../db/mongodbConnect';
import postgresql from '../db/postgresqlConnect';
import 'dotenv/config';
import controller from '../controllers/KController';

function route(originalData: string): string {
  let response: string = '';
  try {
    const receivedId = originalData.substring(0, 2);
    const receivedContent = originalData.substring(2);
    switch (receivedId) {
      case 'K1':
        response = controller.responseK1(originalData);
        break;
      case 'K2':
        response = controller.responseK2(originalData);
        break;
      case 'K3':
        response = controller.responseK3(originalData);
        break;
      case 'K4':
        response = controller.responseK4(originalData);
        break;
      case 'K5':
        response = controller.responseK5(originalData);
        break;
      case 'K6': // K 전문에서는 존재하지 않음
        response = controller.responseK6(originalData);
        break;
      case 'K7':
        response = controller.responseK7(originalData);
        break;
      case 'K8':
        response = controller.responseK8(originalData);
        break;
      case 'K9':
        response = controller.responseK9(originalData);
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
