"use strict";
exports.__esModule = true;
var net = require("net");
var s3Logger_1 = require("./src/db/s3Logger");
var mongodbConnect_1 = require("./src/db/mongodbConnect");
var aria_1 = require("./src/middlewares/aria");
require("dotenv/config");
var ERoute_1 = require("./src/route/ERoute");
var JRoute_1 = require("./src/route/JRoute");
var KRoute_1 = require("./src/route/KRoute");
var server = net.createServer();
var csmsPort = parseInt(process.env.CSMS_PORT, 10);
var maxConnections = parseInt(process.env.SOCKET_MAX_CONNECTION, 10) || 100000;
var socketTimeout = parseInt(process.env.SOCKET_TIMEOUT, 10);
server.on('close', function () {
    console.log('Server closed');
    s3Logger_1["default"].s3Write('Server Closed');
});
server.on('connection', function (socket) {
    console.log("Buffer size : \" ".concat(socket.writableLength));
    console.log('--------- server details -----------------');
    console.log("Server Local port: ".concat(socket.localPort, ", Local IP: ").concat(socket.localAddress));
    console.log('--------- remote client info -------------');
    console.log("Remote IP: ".concat(socket.remoteAddress, ", Remote port: ").concat(socket.remotePort, ",  Remote Family: ").concat(socket.remoteFamily));
    console.log('------------------------------------------');
    server.getConnections(function (error, count) {
        if (error) {
            console.log("getConnection Error: ".concat(error));
            mongodbConnect_1["default"].insertMongodb('Error', 'index-getConnections', error.message);
        }
        s3Logger_1["default"].s3Write('Number of concurrent connections to the server : ' + count);
        console.log('Number of concurrent connections to the server : ' + count);
    });
    socket.setEncoding('utf8');
    socket.setTimeout(socketTimeout, function () {
        s3Logger_1["default"].s3Write('Socket Timed Out !');
        console.log('Socket timed out');
    });
    socket.on('data', function (data) {
        try {
            //const fs = require('fs');//송수신 결과 검증용
            var dataType = data.substring(2, 6);
            if (dataType === '0000') {
                var msgIns = data.substring(0, 1);
                console.log(msgIns + " received plain text");
                switch (msgIns) {
                    case 'E':
                        JRoute_1["default"].route(data);
                        break;
                    case 'J':
                        ERoute_1["default"].route(data);
                        break;
                    case 'K':
                        KRoute_1["default"].route(data);
                        //fs.appendFileSync("received.txt", data);//송수신 결과 검증용
                        break;
                    default:
                }
            }
            else {
                var ketSize = 128;
                var decrypted = aria_1["default"].decrypt(data, ketSize);
                var msgIns = decrypted.substring(0, 1);
                console.log(msgIns + " received encrypted text");
                switch (msgIns) {
                    case 'E':
                        JRoute_1["default"].route(decrypted);
                        break;
                    case 'J':
                        ERoute_1["default"].route(decrypted);
                        break;
                    case 'K':
                        KRoute_1["default"].route(decrypted);
                        //fs.appendFileSync("received.txt", decrypted + "\n");//송수신 결과 검증용
                        break;
                    default:
                }
            }
        }
        catch (e) {
            if (typeof e === 'string') {
                mongodbConnect_1["default"].insertMongodb('Error', 'Socket-on', e);
                console.log(e);
            }
            else if (e instanceof Error) {
                mongodbConnect_1["default"].insertMongodb('Error', 'Socket-on', e.message);
                console.log(e.message);
            }
        }
        // const result = await db.proc('procName', [userName]);
        var is_kernel_buffer_full = socket.write(data);
        if (is_kernel_buffer_full) {
            s3Logger_1["default"].s3Write('Data was flushed successfully from kernel buffer i.e written successfully.');
            console.log('Data was flushed successfully from kernel buffer i.e written successfully.');
        }
        else {
            socket.pause();
        }
    });
    socket.on('drain', function () {
        console.log('write buffer is empty now ... You can resume the writable stream');
        socket.resume();
    });
    socket.on('error', function (error) {
        s3Logger_1["default"].s3Write('Error : ' + error);
        console.log('Error : ' + error);
    });
    socket.on('timeout', function () {
        s3Logger_1["default"].s3Write('Socket Timed Out.');
        console.log('Socket Timed out');
        socket.end('Socket Timed out');
        // can call socket.destroy() here too.
    });
    socket.on('end', function (data) {
        s3Logger_1["default"].s3Write('Socket ended from other end.');
        console.log('Socket ended from other end!');
        console.log('End data: ' + data);
    });
    socket.on('close', function (error) {
        console.log("Bytes read: ".concat(socket.bytesRead, ", Written: ").concat(socket.bytesWritten));
        s3Logger_1["default"].s3Write('Socket Closed.');
        console.log('Socket closed!');
        if (error) {
            var fs = require('fs'); //송수신 결과 검증용
            fs.appendFileSync("error.txt", error + "\n"); //송수신 결과 검증용
            console.log('Socket was closed coz of transmission error');
        }
    });
});
server.on('error', function (error) {
    s3Logger_1["default"].s3Write('Error: ' + error);
    console.log('Error: ' + error);
});
server.on('listening', function () {
    s3Logger_1["default"].s3Write('Socket Server is listening ...');
    console.log("Socket Server is listening ...");
});
server.maxConnections = maxConnections;
server.listen(csmsPort);
var islistening = server.listening;
if (!islistening) {
    s3Logger_1["default"].s3Write('Server is not listening ...');
    console.log('Server is not listening...');
}
