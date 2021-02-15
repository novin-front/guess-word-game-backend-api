const express = require('express');
const app = express();
require('./middlewares/middlewares')(app);

require('./router')(app);
require('./middlewares/404')(app);


const runapplication = () => {
    app.listen(1900, () => {
        console.log(`app is running on port 1900`)
    })
}
module.exports = runapplication;