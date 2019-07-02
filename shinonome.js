'use strict';

// bitmapフォント
const shinonome12x12 = require('./shinonome12x12.json');

module.exports.createTextBitmap = (text) => {
  // 文字を配列に変換
  let strArray = text.split('');

  let bitmapArray = [];
  let rowBitmapArray = [];

  for (let i = 0; i < strArray.length; i++) {
    // フォントのbitmapを取得
    let fontBitmap = getFontBitmap(strArray[i]);

    // フォントのbitmapを配列に追加
    for (let i = 0; i < fontBitmap.length; i++) {
      // 初期化
      if (!bitmapArray[i]) {
        bitmapArray[i] = [];
      }

      bitmapArray[i].push(fontBitmap[i]);
    }
  }

  // 配列を連結
  for (let i = 0; i < bitmapArray.length; i++) {
    rowBitmapArray.push(bitmapArray[i].join(''));
  }

  return rowBitmapArray;
}

module.exports.rowBitmap2rowImageData = (rowBitmap) => {
  let rowImageData = '';
  // bitmapを反転
  let rowBitmapReversed = reverseBitmap(rowBitmap);
  // bitmapを分割
  let bitmapSplit = splitLength(rowBitmapReversed, 8);

  // bitmapからimageDataに変換
  for (let i = 0; i < bitmapSplit.length; i++) {
    let result = '0x' + zeroPadding(parseInt(bitmapSplit[i], 2).toString(16), 2)
    rowImageData += result + ',';
  }

  return rowImageData;
}

function getFontBitmap (str) {
  if (!shinonome12x12[str]) {
    return;
  }
  return shinonome12x12[str].bitmap;
}

function reverseBitmap (str) {
  return str
    .replace(new RegExp('0', 'g'), '@')
    .replace(new RegExp('1', 'g'), '0')
    .replace(new RegExp('@', 'g'), '1');
}

function splitLength (str, length) {
  let result = [];
  let index = 0;
  let begin = index;
  let end = begin + length;
  while (begin < str.length) {
    result[index] = str.slice(begin, end);
    index++;
    begin = end;
    end = begin + length;
  }
  return result;
}

function zeroPadding (num, length) {
  let zero = '';
  for (let i = 0; i < length; i++) {
    zero += '0';
  }
  return (zero + num).slice(-length);
}
