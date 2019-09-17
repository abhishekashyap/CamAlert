const cv = require("opencv4nodejs");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const device = require("express-device");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = 3000;

// Capturing from default camera i.e. webcam
const wCap = new cv.VideoCapture(0);

// Getting local Ip
var ip;
require("dns").lookup(require("os").hostname(), (err, add, fam) => {
  getIp(add);
});

function getIp(add) {
  ip = add;
  console.log(ip);
}

/*
To check from what device server is accessed

app.use('/assets', express.static(__dirname + '/assets'));
app.use(device.capture());
app.get('/hello', function(req, res) {
  res.send('Hi to ' + req.device.type + ' User');
});
var device_type;
if (device_type == 'mobile') {
}
*/

// SERVING HTML PAGES

app.get("/", (req, res) => {
  console.log("accessed");
  res.sendFile(path.join(__dirname, "index.html"));
  //device_type = req.device.type;
});

// DOWNLOADING CAPTURED IMAGES

var num = 0; // Used to initialize image number

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode(".jpg", frame).toString("base64");

  // The absolute path of the new file with its name
  var filepath = "TempImage";

  // Save with a buffer as content from a base64 image
  fs.writeFile(filepath + num++ + ".jpg", new Buffer(image, "base64"), err => {
    if (err) throw err;

    console.log("The file was succesfully saved!");
  });
  io.emit("image", image);
}, 1000);

//console.log(typeof(ip));
server.listen(PORT, function() {
  console.log("Express server listening on port ", PORT);
});

// Listening at LAN as well as well as localhost
//app.listen(3000, ip || '127.0.0.1');
