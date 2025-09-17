const express = require('express');
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

module.exports = router;