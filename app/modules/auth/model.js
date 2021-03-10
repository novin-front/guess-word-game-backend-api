const connection = require('../../database/connections/connection');
let db = connection();
exports.findUserByCredential = async (email, password) => {
    // const db = await connection();
    // let [results, fields] = await db.query("SELECT * FROM `users` WHERE email=? and password=? LIMIT 1", [email, password]);
    // if (results.length) {
    //     return results[0];
    // }
    // return false;

}
exports.findUserByCredential = async (data) => {
    const db = await connection();
    // let [results, fields] = await db.query("SELECT * FROM `users` WHERE email=? and password=? LIMIT 1", [email, password]);
    // if (results.length) {
    //     return results[0];
    // }
    // return false;

}