const myscql = require('mysql2/promise');

const connection = async () => {
    const db = await myscql.createConnection({
        host: "arthur.iran.liara.ir",
        port:32928,
        user: "root",
        password: "E2SvCLeFr5J2xgWu5oF0HcmQ",
        database:"youthful_greider",
    })
    return db;
    
}
module.exports = connection;