const guessWordsController = require('./modules/guessWords/router')



module.exports = (app) => {
    // app.use('/api/v1/user/', [auth, isAdmin], userController);
    app.use('/api/v1/guess-words/', guessWordsController);

}