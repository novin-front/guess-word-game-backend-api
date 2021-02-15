const axios = require("axios");
const https = require("https");
axios.defaults.headers.common = {};
let headers = {
  'Accept': 'application/json',
  'connection':null,
  'Accept':null,
  'User-Agent':null,
  'Content-Length':null,
  'Host':null,
  'User-Agent':null,
};

const httpRequest = axios.create({
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'connection':null,
    'Accept':null,
    'User-Agent':null,
    'Content-Length':null,
    'Host':null,
    'User-Agent':null,
    'Content-Type':'application/json'
  },
});
delete headers['Accept'];
delete headers['connection'];
delete headers['User-Agent'];
delete headers['Content-Length'];
delete headers['Host'];

httpRequest.defaults.headers.common['Content-Type'] = 'application/json';

// const httpRequest = require('./httpRequest')
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
exports.callfamApi = (url, data) => {
  return httpRequest.post(`https://famepay.ir:6966/api/v1.0/levelPoint?phoneNumber=${data.mobile}&point=${data.point}&time=${data.time}&checksum=${data.checksum}`, {}, {
    headers : headers
    })
};