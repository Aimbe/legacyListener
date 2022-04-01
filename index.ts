import * as net from 'net';
import s3Logger from './src/db/s3Logger';
import mongodb from './src/db/mongodbConnect';

import aria from './src/middlewares/aria';
import 'dotenv/config';

import routeE from './src/route/ERoute';
import routeJ from './src/route/JRoute';
import routeK from './src/route/KRoute';


const server = net.createServer();
const csmsPort: number = parseInt(<string>process.env.CSMS_PORT, 10);
const maxConnections: number = 
  parseInt(<string>process.env.SOCKET_MAX_CONNECTION, 10) || 100000;
const socketTimeout: number = parseInt(<string>process.env.SOCKET_TIMEOUT, 10);

server.on('close', function () {
  console.log('Server closed');
  s3Logger.s3Write('Server Closed');
});

server.on('connection', function (socket) {
  console.log(`Buffer size : " ${socket.writableLength}`);
  console.log('--------- server details -----------------');
  console.log(
    `Server Local port: ${socket.localPort}, Local IP: ${socket.localAddress}`,
  );
  console.log('--------- remote client info -------------');
  console.log(
    `Remote IP: ${socket.remoteAddress}, Remote port: ${socket.remotePort},  Remote Family: ${socket.remoteFamily}`,
  );
  console.log('------------------------------------------');

  server.getConnections(function (error, count: number) {
    if (error) {
      console.log(`getConnection Error: ${error}`);
      mongodb.insertMongodb('Error', 'index-getConnections', error.message);
    }
    s3Logger.s3Write(
      'Number of concurrent connections to the server : ' + count,
    );
    console.log('Number of concurrent connections to the server : ' + count);
  });
  socket.setEncoding('utf8');

  socket.setTimeout(socketTimeout, function () {
    s3Logger.s3Write('Socket Timed Out !');
    console.log('Socket timed out');
  });

  socket.on('data', function (data: string) {
    let response: string = '';
    const ketSize: number = 128;
    try {
      const dataType: string = data.substring(2, 6);
      if(dataType === '0000'){
        const msgIns: string = data.substring(0, 1);
        console.log( msgIns +" received plain text");
        switch (msgIns) {
          case 'E':
            response = routeE.route(data);
            break;
          case 'J':
            response = routeJ.route(data);
            break;
          case 'K':
            response = routeK.route(data);
            break;
          default:
        }
      } else {
        const decrypted: string = aria.decrypt(data, ketSize);
        const msgIns: string = decrypted.substring(0, 1);
        console.log( msgIns +" received encrypted text");
        switch (msgIns) {
          case 'E':
            response = routeE.route(decrypted);
            break;
          case 'J':
            response = routeJ.route(decrypted);
            break;
          case 'K':
            response = routeK.route(decrypted);
            break;
          default:
        }
      }
      
    } catch (e) {
      if (typeof e === 'string') {
        mongodb.insertMongodb('Error', 'Socket-on', e);
        console.log(e);
      } else if (e instanceof Error) {
        mongodb.insertMongodb('Error', 'Socket-on', e.message);
        console.log(e.message);
      }
    }

    const encrypted = aria.encrypt(response, ketSize);
    console.log(encrypted);
    const is_kernel_buffer_full = socket.write(encrypted);
    if (is_kernel_buffer_full) {
      s3Logger.s3Write(
        'Data was flushed successfully from kernel buffer i.e written successfully.',
      );
      console.log(
        'Data was flushed successfully from kernel buffer i.e written successfully.',
      );
    } else {
      socket.pause();
    }
  });

  socket.on('drain', function () {
    console.log(
      'write buffer is empty now ... You can resume the writable stream',
    );
    socket.resume();
  });

  socket.on('error', function (error: Error) {
    s3Logger.s3Write('Error : ' + error);
    console.log('Error : ' + error);
  });

  socket.on('timeout', function () {
    s3Logger.s3Write('Socket Timed Out.');
    console.log('Socket Timed out');
    socket.end('Socket Timed out');
    // can call socket.destroy() here too.
  });

  socket.on('end', function (data: string) {
    s3Logger.s3Write('Socket ended from other end.');
    console.log('Socket ended from other end!');
    console.log('End data: ' + data);
  });

  socket.on('close', function (error: Error) {
    console.log(
      `Bytes read: ${socket.bytesRead}, Written: ${socket.bytesWritten}`,
    );
    s3Logger.s3Write('Socket Closed.');
    console.log('Socket closed!');
    if (error) {
      console.log('Socket was closed coz of transmission error');
    }
  });
});

server.on('error', function (error: Error) {
  s3Logger.s3Write('Error: ' + error);
  console.log('Error: ' + error);
});

server.on('listening', function () {
  s3Logger.s3Write('Socket Server is listening ...');
  console.log(`Socket Server is listening ...`);
});

server.maxConnections = maxConnections;
server.listen(csmsPort);

const islistening = server.listening;
if (!islistening) {
  s3Logger.s3Write('Server is not listening ...');
  console.log('Server is not listening...');
}
