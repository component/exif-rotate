
/**
 * Module dependencies.
 */

var rotate = require('rotate');
var flip = require('flip');

/**
 * Expose `orient`.
 */

module.exports = orient;

/**
 * Orientations.
 */

var orientations = [
  { op: 'none', degrees: 0 },
  { op: 'flip-x', degrees: 0 },
  { op: 'none', degrees: 180 },
  { op: 'flip-y', degrees: 0 },
  { op: 'flip-x', degrees: 90 },
  { op: 'none', degrees: 90 },
  { op: 'flip-x', degrees: -90 },
  { op: 'none', degrees: -90 }
];

/**
 * Rotate `img` with orientation `n` when necessary.
 *
 * The `img` dimensions are updated as necessary to
 * reflect the rotation applied.
 *
 * @param {Image} img
 * @param {Number} n
 * @return {String} data uri
 */

function orient(img, n) {
  var o = orientations[n - 1];

  // canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // dims
  if (rotated(n)) {
    canvas.height = img.width;
    canvas.width = img.height;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }

  // flip
  if ('flip-x' == o.op) flip(canvas, true, false);
  if ('flip-y' == o.op) flip(canvas, false, true);

  // rotate
  if (o.degrees) {
    rotate(ctx, {
      degrees: o.degrees,
      x: canvas.width / 2,
      y: canvas.height / 2
    });

    if (rotated(n)) {
      var d = canvas.width - canvas.height;
      ctx.translate(d / 2, -d / 2);
    }
  }

  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg');
}

/**
 * Check if we need to change dims.
 */

function rotated(n) {
  return !! ~[5,6,7,8].indexOf(n);
}

