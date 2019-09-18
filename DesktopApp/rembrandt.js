const Rembrandt = require('rembrandt');
const fs = require('fs');


const rembrandt = new Rembrandt({
  // `imageA` and `imageB` can be either Strings (file path on node.js,
  // public url on Browsers) or Buffers
  imageA: fs.readFileSync("img/img1.png"),
  imageB: fs.readFileSync("img/img2.png"),

  // Needs to be one of Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS
  thresholdType: Rembrandt.THRESHOLD_PERCENT,

  // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
  maxThreshold: 0.01,

  // Maximum color delta (0...255):
  maxDelta: 20,

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
    console.log("Composition image buffer:", result.compositionImage);

    // Note that `compositionImage` is an Image when Rembrandt.js is run in the browser environment
  })
  .catch(e => {
    console.error(e);
  });
