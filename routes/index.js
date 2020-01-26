const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const ApplicationsController = require('../controllers/ApplicationsController');
const DatabaseController = require('../controllers/DatabaseController');

router.get('/',
    DatabaseController.getItems,
    PagesController.home);

router.get('/register', PagesController.register);

router.post('/register',
    ApplicationsController.validateData,
    DatabaseController.insertUser,
    ApplicationsController.signUp);

router.get('/login', PagesController.login);

router.post('/login',
    DatabaseController.validateUser,
    DatabaseController.getItems,
    ApplicationsController.signIn);

module.exports = router;