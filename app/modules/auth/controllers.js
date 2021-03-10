const authModel = require('./model');
const {
    validatonRejesterForm,
    validatonLoginForm,
} = require("../../middlewares/functions");
const tokenService = require('./token');
exports.login = async (req, res) => {
    let {
        mobile,
        password,
    } = req.body;
    let data = {};
    data.phoneNumber = mobile;
    data.password = password;
    let validatData = validatonLoginForm(data);
    if (validatData.isValid) {
        return res.status(400).send({
            success: false,
            message: validatData.errorMessage,
        })
    }else{
        // const userResult = await authModel.findUserByCredential(data);
        // if (!userResult) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "کلمه عبور یا شماره موبایل وارد شده اشتباه است"
        //     })
        // }
        // const token = tokenService.generate({
        //     uid: userResult.id,
        //     isadmin: userResult.is_admin
        // })
        // return res.send({
        //     success: true,
        //     message: "با موفقیت وارد شدید",
        //     userResult,
        //     token
        // });
    }
   
}
exports.createUser = async (req, res) => {
    let {
        name,
        family,
        mobile,
        password,
        replacePassword,
    } = req.body;
    let data = {};
    data.firstName = name;
    data.lastName = family;
    data.phoneNumber = mobile;
    data.password = password;
    data.repPassword = replacePassword;

    console.log(data)
    let validatData = validatonRejesterForm(data);

    if (validatData.isValid) {
        return res.status(422).send({
            success: false,
            message: validatData.errorMessage,
        })
    }else{
        const userResult = await authModel.createUser(data);
        if (!userResult) {
            return res.status(422).send({
                success: false,
                message: "کاربری با این مشخصات یافت نشد"
            })
        }
        const token = tokenService.generate({
            uid: userResult.id,
            isadmin: userResult.is_admin
        })
    }
}