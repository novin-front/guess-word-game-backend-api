const crypto = require("crypto");
function convertArrayToString(array) {
    return array.join(",").replace(/,/g, "");
}
exports.enNumberConvertToFa = (phonnumber) => {
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
exports.sqlDatetime = () => {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
}
exports.createSha256Hash = (key) => {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return hash;
}
const createSha256Hash = (key) => {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return hash;
}
exports.genarateChecksum = (phoneNumber, time, point) => {
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

exports.generatRandomNumber = (end) => {
    return Math.floor(Math.random() * end)
}


exports.IsValidPhoneNumber = (value)=> {
    return /(0|\+98)?([ ]|,|-|[()]){0,2}9[0-9]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/g.test(
        value
    );
}

exports.IsValidFullName = (value)=> {
    if(value.length < 40){
        return true;
    }
    return false;
    // return /^[a-zA-Z پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/g.test(
    //     value
    // );
}
exports.IsValidPoint = (point)=>{
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
exports.faNumberConvertToEn = (phonnumber) => {
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