const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'ejs' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'ejs' });
});


module.exports = router;