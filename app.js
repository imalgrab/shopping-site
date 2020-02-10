const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}));

app.use(flash());

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.set('port', 2115);

const server = app.listen(process.env.PORT || app.get('port'), () => {
    console.log(`App listening on ${server.address().port}`);
});

module.exports = app;