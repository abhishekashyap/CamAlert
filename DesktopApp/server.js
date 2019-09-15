const cv = require("opencv4nodejs");
const path = require("path");
const express = require("express");
const app = express();
const device = require('express-device');
const server = require("http").Server(app);
const io = require("socket.io")(server);

// app.use("/assets", express.static(__dirname + '/assets'));
app.use(device.capture());
app.get('/hello',function(req,res) {
    res.send("Hi to "+req.device.type+" User");
  });

var device_type;
app.get("/", (req, res) => {    
    console.log('accessed');
  res.sendFile(path.join(__dirname, "index.html"));
    device_type = req.device.type;
    if (device_type == 'mobile') {
        const cam = new cv.VideoCapture(0);
        setInterval(() => {
          const frame = cam.read();
          const image = cv.imencode(".jpg", frame).toString("base64");
          io.emit("image", image);
        }, 1000); 
    }
});




// app.listen(3000);
// Listening at LAN as well as well as localhost
app.listen(3000, "192.168.0.101" || "127.0.0.1");
