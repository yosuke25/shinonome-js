'use strict';

const shinonome = require('./shinonome.js');

let textBitmap = shinonome.createTextBitmap('a')
console.log(textBitmap);

for (let i = 0; i < textBitmap.length; i++) {
  let rowImageData = shinonome.rowBitmap2rowImageData(`0000${textBitmap[i]}0000`);
  console.log(rowImageData);
}
