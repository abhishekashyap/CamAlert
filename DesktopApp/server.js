const cv = require('opencv4nodejs');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const device = require('express-device');
const server = require('http').Server(app);
const io = require('socket.io')(server);


const wCap = new cv.VideoCapture(0);

// Getting local Ip
var ip;
require('dns').lookup(require('os').hostname(), (err, add, fam) => {
  getIp(add);
});

function getIp(add) {
  ip = add;
  console.log(ip);
}


// app.use('/assets', express.static(__dirname + '/assets'));
// app.use(device.capture());
// app.get('/hello', function(req, res) {
//   res.send('Hi to ' + req.device.type + ' User');
// });

// var device_type;
// if (device_type == 'mobile') {
//}
app.get('/', (req, res) => {
  console.log('accessed');
  res.sendFile(path.join(__dirname, 'index.html'));
  //device_type = req.device.type;
  
});



setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode('.jpg', frame).toString('base64');
  io.emit('image', image);
}, 1000);


//console.log(typeof(ip));
server.listen(3000);
// Listening at LAN as well as well as localhost
//app.listen(3000, ip || '127.0.0.1');
