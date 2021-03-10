const crypto = require("crypto");
function convertArrayToString(array) {
    return array.join(",").replace(/,/g, "");
}
const enNumberConvertToFa = (phonnumber) => {
    if(phonnumber === ""){
        return;
    }
    let mobilearray = phonnumber.split(''); // empty string separator

    let number_P_E = {
        0: '۰',
        1: '۱',
        2: '۲',
        3: '۳',
        4: '۴',
        5: '۵',
        6: '۶',
        7: '۷',
        8: '۸',
        9: '۹'
    };
    return String(phonnumber).split('').map(number => number_P_E[number] ? number_P_E[number] : number).join('');
}
const sqlDatetime = () => {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
}
// const createSha256Hash = (key) => {
//     const hash = crypto.createHash("sha256").update(key).digest("hex");
//     return hash;
// }
const createSha256Hash = (key) => {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return hash;
}
const genarateChecksum = (phoneNumber, time, point) => {
    const Checksum =
        "hoodad" +
        "!" +
        "Melal@123" +
        "!" +
        `${phoneNumber}` +
        "!" +
        `${point}` +
        "!" +
        `${time}`;
    return createSha256Hash(Checksum);
}

const generatRandomNumber = (end) => {
    return Math.floor(Math.random() * end)
}


const IsValidPhoneNumber = (value)=> {
    return /(0|\+98)?([ ]|,|-|[()]){0,2}9[0-9]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/g.test(
        value
    );
}
const checkPassword =(value)=>{
    return /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{6,}/g.test(value)
}

const IsValidFullName = (value)=> {
    if(value.length < 40){
        return true;
    }
    return false;
    // return /^[a-zA-Z پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/g.test(
    //     value
    // );
}
const IsValidPoint = (point)=>{
    if(typeof(point)  === "number"){
        if(point <= 60 && point >= 0){
            return true;
        }else{
            return false
        }
    }else{
        return false
    }
}
const faNumberConvertToEn = (phonnumber) => {
    if(phonnumber === ""){
        return;
    }
    let mobilearray = phonnumber.split(''); // empty string separator
    let number_P_E = {
        '۰': 0,
        '۱': 1,
        '۲': 2,
        '۳': 3,
        '۴': 4,
        '۵': 5,
        '۶': 6,
        '۷': 7,
        '۸': 8,
        '۹': 9
    };
    let EnArrayNumber = []
    mobilearray.map((number) => {
        if (number_P_E[number] !== undefined) {
            EnArrayNumber.push(number_P_E[number])
        } else {
            EnArrayNumber.push(number)
        }
    });
    return convertArrayToString(EnArrayNumber)
}
const validatonRejesterForm = (data)=>{
    let errorData = {};
    let notValid =false;
    if(Object.keys(data).length == 0){
        return {
            errorMessage : "خطا در داده های ارسالی",
            isValid : true,
        }
    }

    if(data.firstName === "" &&  data.firstName.length <= 2 ){
        errorData.firstName = "فیلد نام نمی تواند خالی باشد";
        notValid = true;
    }
    if(data.lastName === "" &&  data.lastName.length <= 2){
        errorData.lastName = "فیلد نام خانوادگی نمی تواند خالی باشد";
        notValid = true;
    }
    let mobile =faNumberConvertToEn(data.phoneNumber);
    if(!IsValidPhoneNumber(mobile)){
        errorData.phoneNumber = "شماره موبایل وارد شده معتبر نیست";
        notValid = true;
    }
    if(data.phoneNumber == ""){
        errorData.phoneNumber = "فیلد شماره موبایل نمی تواند خالی باشد";
        notValid = true;
    }
    if(data.password.length >= 6){
        if(!checkPassword(data.password)){
            errorData.password = "رمز عبور وارد شده اشتباه است";
            notValid = true;
        }
    }else{
        errorData.password = " رمز عبور کمتر از مقدار 6 کارکتر است";
    }
    if(data.password == ""){
        errorData.password = "فیلد رمز عبور نمی تواند خالی باشد";
        notValid = true;
    }
    if(data.repPassword.length >= 6){
        if(!checkPassword(data.repPassword)){
    
            if(data.repPassword !== data.password){
                errorData.repPassword = "تکرار رمز عبور با رمز عبور برار نیست";
                notValid = true;
            }else{
                errorData.repPassword = "تکرار رمز عبور اشتباه است";
                notValid = true;
            }
        }
        
    }else{
        errorData.repPassword = "تکرار رمز عبور کمتر از مقدار 6 کارکتر است";
        notValid = true;
    }
    if(data.repPassword == ""){
        errorData.repPassword = "تکرار رمز عبور نمی تواند خالی باشد";       
        notValid = true;
    }
    return {
        errorMessage : errorData,
        isValid : notValid,
    }   
}
const validatonLoginForm = (data)=>{
    let errorData = {};
    let notValid =false;
    if(Object.keys(data).length == 0){
        return {
            errorMessage : "خطا در داده های ارسالی",
            isValid : true,
        }
    }
    let mobile =faNumberConvertToEn(data.phoneNumber);
    if(!IsValidPhoneNumber(mobile)){
        errorData.phoneNumber = "شماره موبایل وارد شده معتبر نیست";
        notValid = true;
    }
     if(mobile.length > 12){
        errorData.phoneNumber = "شماره موبایل وارد شده بیشتر از 11 رقم است";
        notValid = true;
    }

    if(data.phoneNumber == ""){
        errorData.phoneNumber = "فیلد شماره موبایل نمی تواند خالی باشد";
        notValid = true;
    }
    if(data.password.length >= 6){
        if(!checkPassword(data.password)){
            errorData.password = "رمز عبور وارد شده اشتباه است";
            notValid = true;
        }
    }else{
        errorData.password = " رمز عبور کمتر از مقدار 6 کارکتر است";
        notValid = true;
    }
    if(data.password == ""){
        errorData.password = "فیلد رمز عبور نمی تواند خالی باشد";
        notValid = true;
    }
    return {
        errorMessage : errorData,
        isValid : notValid,
    }
       
}
exports.enNumberConvertToFa = enNumberConvertToFa;
exports.sqlDatetime = sqlDatetime;
exports.createSha256Hash = createSha256Hash;
exports.genarateChecksum  = genarateChecksum;
exports.generatRandomNumber = generatRandomNumber;
exports.checkPassword = checkPassword;
exports.IsValidPhoneNumber = IsValidPhoneNumber;
exports.IsValidFullName = IsValidFullName;
exports.IsValidPoint =IsValidPoint;
exports.faNumberConvertToEn =faNumberConvertToEn;
exports.validatonRejesterForm = validatonRejesterForm;
exports.validatonLoginForm = validatonLoginForm;