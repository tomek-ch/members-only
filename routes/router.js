const { Router } = require('express');
const router = Router();

const signUpGet = require('../controllers/signUpGet');
const signUpPost = require('../controllers/signUpPost');
const signInGet = require('../controllers/signInGet');
const signInPost = require('../controllers/signInPost');
const mainPage = require('../controllers/mainPage');
const signOut = require('../controllers/signOut');
const messageCreate = require('../controllers/messageCreate');
const authorize = require('../controllers/authorize');
const messageDelete = require('../controllers/messageDelete');

router.get('/', mainPage);
router.post('/', messageCreate);

router.get('/sign-out', signOut);
router.post('/authorize', authorize);
router.post('/delete-message', messageDelete);

router.get('/sign-up', signUpGet);
router.post('/sign-up', signUpPost);

router.get('/sign-in', signInGet);
router.post('/sign-in', signInPost);

module.exports = router;