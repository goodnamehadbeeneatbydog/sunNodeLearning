const CryptoJS  = require("crypto-js");

const aes = CryptoJS.AES;
const md5 = require("md5");
// const text = aes.encrypt("my message","secret1key112312");
// console.log(text.toString());
console.log(md5("court_api_20220901"))
// const det = aes.decrypt(text,"secret1key112312");
// const ori = det.toString(CryptoJS.enc.Utf8);
// console.log(det)
// console.log(ori)
