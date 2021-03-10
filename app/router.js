const guessWordsController = require('./modules/guessWords/router')
const authController = require('./modules/auth/router')



module.exports = (app) => {
    // app.use('/api/v1/user/', [auth, isAdmin], userController);
    app.use('/api/v1/guess-words/', guessWordsController);
    app.use('/api/v1/auth/', authController);

}