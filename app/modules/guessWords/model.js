const connection = require('../../database/connections/connection');
const {
    sqlDatetime,
    generatRandomNumber

} = require("../../middlewares/functions")
exports.creatGameRow = async (gameData) => {

    const db = await connection();
    let id = gameData.userId;
    const alldata = {
        full_name: gameData.userFullName,
        user_id: (id > 0) ? id : (id + generatRandomNumber()),
        mobile: gameData.mobileNumber,
        point: gameData.point,
        sms_status: "",
        sms_id: "",
        fam_api_flag: "",
        short_link: "",
        sms_response_json:"",
        // create_at: "",
    }
    let [results, fields] = await db.query("SELECT * FROM `guessـwords` WHERE mobile=? LIMIT 1", [gameData.mobileNumber]);
    isValidNumber = results.length === 0;
    if (isValidNumber || 
        gameData.mobileNumber == "09192018492" || 
        gameData.mobileNumber == "09124474386" || 
        gameData.mobileNumber == "09124834251" ||
        gameData.mobileNumber == "09302157094" 
        ) {
        let [results, fields] = await db.query("INSERT INTO `guessـwords` SET ?", alldata);
        if (results.affectedRows === 1) {
            return gameData.userId;
        }
    } else {
        return 0;
    }
}
exports.creatDearRow = async (data) => {

    const db = await connection();
    let id = data.userId;
    const alldata = {
        full_name_sender: data.nameSender,
        dear_id: (id > 0) ? id : (id + generatRandomNumber()),
        mobile_referal: data.referenceMobile,
        mobile_dear: data.dearMobileNumber,
        sms_id: "",
        sms_status: "",
        sms_response_json:"",
        // create_at: "",
    }
    let [results, fields] = await db.query("SELECT * FROM `dear_data` WHERE mobile_dear=? LIMIT 1", [data.dearMobileNumber]);
    isValidNumber = results.length === 0;
    if (isValidNumber || 
        data.dearMobileNumber == "09192018492" || 
        data.dearMobileNumber == "09124474386" || 
        data.dearMobileNumber == "09124834251" ||
        data.dearMobileNumber == "09302157094" 
        ) {
        let [results, fields] = await db.query("INSERT INTO `dear_data` SET ?", alldata);
        if (results.affectedRows === 1) {
            return data.userId;
        }
    } else {
        return 0;
    }
}
exports.saveDearSmsStatus = async (userId, status, smsId,jsonSms) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `dear_data` SET `sms_status`=?,`sms_id`=?,`sms_response_json`=? WHERE dear_id=? LIMIT 1", [status, smsId,jsonSms, userId]);
    return results.affectedRows > 0;
}
exports.getAllGameRowData = async () => {
    const db = await connection();
    let [results, fields] = await db.query("SELECT * FROM `guessـwords`");
    return results
}
exports.getUserDataByID = async (userId) => {
    const db = await connection();
    let [results, fields] = await db.query("SELECT * FROM `guessـwords` WHERE user_id=? LIMIT 1", [userId]);
    return results
}
exports.saveShortLink = async (userId, shortLink) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `guessـwords` SET `short_link`=? WHERE user_id=? LIMIT 1", [shortLink, userId]);
    return results.affectedRows > 0;
}
exports.saveSmsStatus = async (userId, status, smsId,jsonSms) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `guessـwords` SET `sms_status`=?,`sms_id`=?,`sms_response_json`=? WHERE user_id=? LIMIT 1", [status, smsId,jsonSms, userId]);
    return results.affectedRows > 0;
}
exports.saveEndSmsStatus = async (userId, status, smsId,jsonSms) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `guessـwords` SET `end_sms_status`=?,`end_sms_id`=?,`end_sms_response_json`=? WHERE mobile=? LIMIT 1", [status, smsId,jsonSms, userId]);
    return results.affectedRows > 0;
}
exports.saveFamStatue = async (userId, status) => {
    const db = await connection();
    let [results, fields] = await db.query("UPDATE `guessـwords` SET `fam_api_flag`=? WHERE user_id=? LIMIT 1", [status, userId]);
    return results.affectedRows > 0;
}
exports.updateGames = async (dataUpdate) => {

    const db = await connection();
    let [results, fields] = await db.query("UPDATE `form_builder` SET `title`=?,`user_id`=?,`form_input`=? WHERE id=? LIMIT 1", [dataUpdate.title, dataUpdate.userId, dataUpdate.formdata, dataUpdate.id]);
    return results.affectedRows > 0;

}
exports.updateGames = async (dataUpdate) => {

    const db = await connection();
    let [results, fields] = await db.query("UPDATE `form_builder` SET `title`=?,`user_id`=?,`form_input`=? WHERE id=? LIMIT 1", [dataUpdate.title, dataUpdate.userId, dataUpdate.formdata, dataUpdate.id]);
    return results.affectedRows > 0;

}