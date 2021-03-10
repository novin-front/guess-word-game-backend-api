const express = require('express');
const authcontrollear = require('./controllers');
const router = express.Router();

router.post('/create-user', authcontrollear.createUser);
router.post('/login', authcontrollear.login);

module.exports = router;