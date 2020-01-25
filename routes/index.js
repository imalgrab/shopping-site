const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const ApplicationsController = require('../controllers/ApplicationsController');

router.get('/', PagesController.home);

router.get('/register', PagesController.register);

router.post('/register', ApplicationsController.signUp);

router.get('/login', PagesController.login);

router.post('/login', ApplicationsController.signIn);

module.exports = router;