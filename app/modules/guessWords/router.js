const express = require('express');
const guessWordsControllear = require('./controllers');
const router = express.Router();

router.get('/get-all-user', guessWordsControllear.index);
router.post('/', guessWordsControllear.create);
router.get('/:id', guessWordsControllear.getUserById);
router.post('/send-dear-message', guessWordsControllear.SaveDearData);
router.get('/delete/:id', guessWordsControllear.deleteUser);

module.exports = router;