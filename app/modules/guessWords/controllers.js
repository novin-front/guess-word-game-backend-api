const gameModel = require('./model');

const {
    callfamApi
} = require("./callFamApi");
const {
    smsWebApi
} = require("./SmsWebApi");
const {
    shortLinkGenerator
} = require("./shortLinkGenerator");
const {
    createSha256Hash,
    genarateChecksum,
    generatRandomNumber,
    IsValidPhoneNumber,
    IsValidFullName,

} = require("../../middlewares/functions");
const { generatCustomMessage } = require('./generatCustomMessage');
exports.index = async (req, res) => {
    var timestamp = Number(new Date());
    let allGameRow = await gameModel.getAllGameRowData()
    res.send({
        hashcode: createSha256Hash("0919"),
        data: "route is success",
        gameRow: allGameRow,
        ChecksumKey: genarateChecksum("09192018492", timestamp, 60),
    });
};
exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    let userRow = await gameModel.getUserDataByID(userId)
    res.send({
        data: "route is success",
        user: userRow,
    });
};

exports.create = async (req, res) => {
    let {
        mobile,
        fullName,
        gameRate
    } = req.body;
    let message ='برای شرکت در قرعه‌کشی جایزه 50 میلیونی جشنواره "قدردانم" و دهها جایزه دیگر، کافی است اپلیکیشن فام رو نصب کنید.\n تراکنش بیشتر = شانس بیشتر';
    message += "\n لینک دانلود : \n" + "yun.ir/gamefication-fam";
    
    let mobileNumber = mobile;
    let userFullName = fullName;
    let point = gameRate;
    var timestamp = Number(new Date());
    let data = {};
    data.mobile = mobileNumber;
    data.point = gameRate;
    data.time = timestamp;
    data.checksum = genarateChecksum(mobileNumber, timestamp, gameRate);
    let dbData = {
        mobileNumber,
        userFullName,
        point,
        userId: generatRandomNumber(1000000)
    }
    if (IsValidPhoneNumber(mobileNumber) && IsValidFullName(userFullName)) {
        if (IsValidPhoneNumber(mobileNumber)) {

            // https://famepay.ir:6966/api/v1.0/levelPoint/
            try {
                const saveUserDataId = await gameModel.creatGameRow(dbData);
                if(saveUserDataId > 0){

                // const saveShortLinkDb = await gameModel.saveShortLink(dbData.userId, shortLink.data.link);

                const smsResponse = await smsWebApi(mobileNumber, message);
                const saveSmsResponse = await gameModel.saveSmsStatus(dbData.userId, smsResponse.data.result, smsResponse.data.messageids,JSON.stringify(smsResponse.data));
                const famResponse = await callfamApi(
                    "https://famepay.ir:6966/api/v1.0/levelPoint",
                    data
                );
                const saveFamStatueDb = await gameModel.saveFamStatue(dbData.userId, JSON.stringify(famResponse.data));
                
                res.status(200).send({
                    success: true,
                    message: "اطلاعات شما با موفقیت ثبت شد لینک دانلود اپلیکشن از طریق پیامک برای شما ارسال گردید.",
                });

                }else{
                    res.status(200).send({
                        success: false,
                        resMessage: message,
                        message: "این شماره موبایل قبلا استفاده شده است",
                    });
                }
                
            } catch (error) {
                res.status(400).send({
                    success: true,
                    error,
                    message: "خطایی در سمت سرور رخ داده است",
                });
            }
        } else {
            let ErrorMessages = {};
            if (!IsValidPhoneNumber(mobileNumber)) {
                ErrorMessages.mobile = "شماره موبایل شما معتبر نیست";
            }
            if (!IsValidPhoneNumber(mobileNumber)) {
                ErrorMessages.fullName =
                    "نام و نام خانوادگی وارد شده معتبر نیست";
            }
            res.status(400).send({
                success: true,
                messages: ErrorMessages,
            });
        }
    }
};

exports.SaveDearData = async (req, res) => {
    let {
        dearMobile,
        mobileSender,
        wordList,
        fullName
    } = req.body;
    let message ="";

    let dearMobileNumber = dearMobile;
    let referenceMobile =mobileSender;
    let listWord = wordList;
    let nameSender =fullName;
    let data = {};
    let endMessage='پیام قدردانی شما ارسال شد.ما هم به پاس قدردانی از مهر شما، نامتان را در لیست قرعه‌کشی هفتگی ۷ جایزه کارت هدیه ۵۰۰ هزار تومانی قرار دادیم. با دنبال کردن اینستاگرام فام، از قرعه‌کشی و برندگان آن با خبر شوید.'
    endMessage += "\n https://www.instagram.com/fam.epay/";
    data.dearMobileNumber = dearMobileNumber;
    data.referenceMobile = referenceMobile;
    data.listWord = listWord;
    data.nameSender= nameSender;
    data.userId = generatRandomNumber(1000000);
        if (IsValidPhoneNumber(dearMobileNumber) && IsValidPhoneNumber(referenceMobile) && IsValidFullName(nameSender)) {

            try {
                const saveDearUserDataId = await gameModel.creatDearRow(data);
                if(saveDearUserDataId > 0){
                const customMessage = await generatCustomMessage(listWord,nameSender);
                const smsResponse = await smsWebApi(dearMobileNumber, customMessage);
                const saveDearSmsResponse = await gameModel.saveDearSmsStatus(data.userId, smsResponse.data.result, smsResponse.data.messageids,JSON.stringify(smsResponse.data));
                
                const endSmsResponse = await smsWebApi(referenceMobile, endMessage);
                const saveEndSmsResponse = await gameModel.saveEndSmsStatus(referenceMobile, endSmsResponse.data.result, endSmsResponse.data.messageids,JSON.stringify(endSmsResponse.data));

                res.status(200).send({
                    success: true,
                    message: "پیام شما با موفقیت ارسال شد.",
                });

                }else{
                    res.status(200).send({
                        success: false,
                        message: "این شماره موبایل قبلا استفاده شده است",
                    });
                }
                
            } catch (error) {
                res.status(400).send({
                    success: true,
                    error,
                    message: "خطایی در سمت سرور رخ داده است",
                });
            }
        } else {
            res.status(400).send({
                success: true,
                messages: "شماره موبایل شما معتبر نیست",
            });
        }
};
exports.deleteUser = async (req, res) => {
    const uid = req.params.id;
    const deletResult = await usersModel.deletUserById(uid);
    if (deletResult) {
        return res.status(200).send({
            success: deletResult,
            message: "کاربر مورد نظر با موفقیت حدف شد",
        });
    } else {
        res.status(204).send({
            success: deletResult,
            message: "مشکلی در حذف کاربر رخ داده است",
        });
    }
};
exports.getUserForUpdate = async (req, res) => {
    const uid = req.params.id;
    const userUpdateData = await usersModel.getUserById(uid);

    res.send({
        userUpdateData,
    });
};
exports.updateUser = async (req, res) => {
    const userDataForUpdate = req.body;
    const userUpdate = await usersModel.updateUser(userDataForUpdate);
    if (userUpdate) {
        return res.status(200).send({
            success: userUpdate,
            message: "کاربر مورد نظر با موفقیت ویرایش شد",
        });
    } else {
        res.status(204).send({
            success: userUpdate,
            message: "مشکلی در ویرایش کاربر رخ داده است",
        });
    }
};