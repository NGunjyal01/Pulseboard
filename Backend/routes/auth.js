const express = require('express');
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const router = express.Router();

router.post('/signup',signup);
router.get('/login',login);
router.get('/logout',logout);

module.exports = router;