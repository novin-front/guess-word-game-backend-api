const crypto = require("crypto");

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
    return /^[a-zA-Z پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/g.test(
        value
    );
}