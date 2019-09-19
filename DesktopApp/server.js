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
  var filepath = "img/";

  // Save with a buffer as content from a base64 image
  fs.writeFile(
    filepath + "img" + num++ + ".jpg",
    new Buffer(image, "base64"),
    err => {
      if (err) throw err;

      console.log("The file 1 was succesfully saved!");
    }
  );
  io.emit("image", image); // Emitting first image

  setTimeout(() => {}, 1000); // 1s delay to capture two different frames

  const frame1 = wCap.read();
  const image1 = cv.imencode(".jpg", frame1).toString("base64");

  fs.writeFile(
    filepath + "img" + num++ + ".jpg",
    new Buffer(image1, "base64"),
    err => {
      if (err) throw err;
      console.log("The file 2 was succesfully saved!");
    }
  );

  io.emit("image", image1); // Emitting second image

  // Image comparison
  const Rembrandt = require("rembrandt");

  const rembrandt = new Rembrandt({
    // `imageA` and `imageB` can be either Strings (file path on node.js,
    // public url on Browsers) or Buffers
    imageA: "img/img0.jpg",
    imageB: "img/img1.jpg",

    // Needs to be one of Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS
    thresholdType: Rembrandt.THRESHOLD_PERCENT,

    // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
    maxThreshold: 0.01,

    // Maximum color delta (0...255):
    maxDelta: 1,

    // Maximum surrounding pixel offset
    maxOffset: 0,

    renderComposition: true, // Should Rembrandt render a composition image?
    compositionMaskColor: Rembrandt.Color.RED // Color of unmatched pixels
  });

  // Run the comparison
  rembrandt
    .compare()
    .then(function(result) {
      console.log("Passed:", result.passed);
      console.log("Difference:", (result.threshold * 100).toFixed(2), "%");
      console.log("Difference in pixels: ", result.threshold);
      console.log("Composition image buffer:", result.compositionImage);

      // Note that `compositionImage` is an Image when Rembrandt.js is run in the browser environment
    })
    .catch(e => {
      console.error(e);
    });

  num = 0; // Reset counter
}, 1000);

//console.log(typeof(ip));
server.listen(PORT, function() {
  console.log("Express server listening on port ", PORT);
});

// Listening at LAN as well as well as localhost
//app.listen(3000, ip || '127.0.0.1');
