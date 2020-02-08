const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const ApplicationsController = require('../controllers/ApplicationsController');
const DatabaseController = require('../controllers/DatabaseController');
const AdminController = require('../controllers/AdminController');

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
    ApplicationsController.signIn
);

router.get('/logout',
    ApplicationsController.logOut);

router.get('/basket',
    ApplicationsController.basket);

router.get('/addToCart/:id',
    DatabaseController.getItems,
    ApplicationsController.addToCart);

router.get('/editItem/:id',
    DatabaseController.getItems,
    AdminController.editItem);

router.post('/editItem/:id',
    DatabaseController.editItem,
    PagesController.home
);

router.post('/search',
    DatabaseController.getCertainItems,
    ApplicationsController.search
);

router.get('/users',
    DatabaseController.getUsers,
    AdminController.showUsers
);

router.get('/orders',
    DatabaseController.getOrders,
    AdminController.showOrders
);

router.get('/additem',
    AdminController.addItem
);

router.post('/additem',
    DatabaseController.insertItem,
    AdminController.addItem
);

router.get('/makeorder',
    DatabaseController.makeOrder
);

module.exports = router;