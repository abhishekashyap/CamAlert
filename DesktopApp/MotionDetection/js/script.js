var ctx = createCanvas("canvas1"); // sample the colour of every 50 pixels
var sample_size = 50;
function draw() {
  // draw video onto screen
  ctx.drawImage(video, 0, 0, w, h); // get the screen's pixels data
  var data = ctx.getImageData(0, 0, w, h).data; // loop through rows and columns
  for (var y = 0; y < h; y += sample_size) {
    for (var x = 0; x < w; x += sample_size) {
      // the data array is a continuous array of red, blue, green
      // and alpha values, so each pixel takes up four values
      // in the array
      var pos = (x + y * w) * 4;

      // get red, blue and green pixel value
      var r = data[pos];
      var g = data[pos + 1];
      var b = data[pos + 2]; // draw the pixels as blocks of colours
      ctx.fillStyle = rgb(r, g, b);
      ctx.fillRect(x, y, sample_size, sample_size);
    }
  }
}

// make an array to hold our old pixel values
var previous_frame = [];
// choose a brightness threshold, if the old pixel values differs enough then we know there's movement
var threshold = 50;
// sample the colour every 50 pixels
var sample_size = 50;
function draw() {
  ctx.drawImage(video, 0, 0, w, h);
  var data = ctx.getImageData(0, 0, w, h).data;
  ctx.background(0);

  for (var y = 0; y < h; y += sample_size) {
    for (var x = 0; x < w; x += sample_size) {
      var pos = (x + y * w) * 4;
      var r = data[pos];
      var g = data[pos + 1];
      var b = data[pos + 2]; // first check if it's not the first frame, but
      // seeing of when the previous_frame array
      // is not we empty, and then only draw something if there's
      // a significant colour difference
      if (
        previous_frame[pos] &&
        Math.abs(previous_frame[pos] - r) > threshold
      ) {
        ctx.fillStyle = rgb(r, g, b);
        ctx.fillRect(x, y, sample_size, sample_size);
      } // store these colour values to compare to the next frame
      previous_frame[pos] = r;
    }
  }
}
