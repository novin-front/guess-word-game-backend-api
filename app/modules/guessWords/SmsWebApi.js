var axios = require("axios");
exports.smsWebApi =async (mobile,msg,callback)=>{
// var options = { method: 'POST',
// url: ' http://api.ghasedaksms.com/v2/sms/send/simple ',
// headers:
// {
// apikey: 'uPvulBQDPMQgymPuqpUrZXadekdsjQNIRcfBUYs42W0' },
// form:
// { message: msg,
// sender: '500057504092',
// Receptor: mobile,

// } };
let headers = {
    apikey: 'uPvulBQDPMQgymPuqpUrZXadekdsjQNIRcfBUYs42W0'
}
let data ={ 
    message: msg,
    sender: '30005006005956',
    Receptor: mobile,
    }
let url = "http://api.ghasedaksms.com/v2/sms/send/simple";
return axios.post(url,data,{
    headers: headers
  })
}