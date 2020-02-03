const pg = require('pg');
const bcrypt = require('bcryptjs');

exports.insertUser = (req, res, next) => {
    const errors = req.body.errors;
    if (errors.length) {
        res.render('register', {
            errors: req.body.errors
        });
    } else {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        let errors = [];

        const pool = new pg.Pool({
            host: 'localhost',
            port: 5432,
            database: 'ShopCatalog',
            user: 'weppo',
            password: 'weppo'
        });
        pool
            .query(`SELECT * FROM users WHERE name = '${username}'`)
            .then(res => {
                if (res.rowCount > 0) {
                    errors.push(`Nazwa ${username} jest zajęta`);
                    req.body.errors = errors;
                    next();
                } else {
                    const hash = bcrypt.hashSync(password, 8);
                    pool
                        .query(`INSERT INTO users (name, email, hash) values ('${username}', '${email}', '${hash}')`)
                        .then()
                        .catch(error => {
                            console.log(error);
                        });
                    req.body.errors = errors;
                    next();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};

exports.insertItem = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const img = req.body.img;
    const price = req.body.price;
    const pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'ShopCatalog',
        user: 'weppo',
        password: 'weppo'
    });
    pool
        .query(`INSERT INTO books (title, author, genre, price, img) values ('${title}', '${author}', '${genre}', '${price}', '${img}')`)
        .then()
        .catch(error => {
            console.log(error);
        });
    next();
};

exports.editItem = (req, res, next) => {
    const id = parseInt(req.params.id) + 1;
    let title = req.body.title;
    let author = req.body.author;
    let genre = req.body.genre;
    let price = req.body.price;
    let img = req.body.img;
    const pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'ShopCatalog',
        user: 'weppo',
        password: 'weppo'
    });
    pool
        .query(`UPDATE books set title = '${title}', author = '${author}', genre = '${genre}', price = '${price}', img = '${img}' where id = '${id}'`)
        .then()
        .catch(error => {
            console.log(error);
        });
    req.flash('success_msg', 'Pomyślnie edytowano przedmiot!');
    next();
};

exports.validateUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let errors = [];

    const pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'ShopCatalog',
        user: 'weppo',
        password: 'weppo'
    });
    pool
        .query(`SELECT hash FROM users WHERE name = '${username}'`)
        .then(res => {
            if (res.rowCount > 0) {
                const hash = res.rows[0].hash;
                if (bcrypt.compareSync(password, hash)) {
                    req.body.errors = errors;
                    next();
                } else {
                    errors.push('Zła nazwa użytkownika lub hasło');
                    req.body.errors = errors;
                    next();
                }
            } else {
                errors.push(`Użytkownik ${username} nie istnieje`);
                req.body.errors = errors;
                next();
            }
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getItems = (req, res, next) => {
    const pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'ShopCatalog',
        user: 'weppo',
        password: 'weppo'
    });
    pool
        .query('SELECT * FROM books ORDER BY id ASC')
        .then(res => {
            let books = [];
            res.rows.forEach(r => {
                books.push({
                    title: r.title,
                    author: r.author,
                    genre: r.genre,
                    price: r.price,
                    img: r.img
                });
            });
            req.flash('booksCatalog', books);
            next();
        })
        .catch(error => {
            console.log(error);
        });
};


exports.getUsers = (req, res, next) => {
    const pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'ShopCatalog',
        user: 'weppo',
        password: 'weppo'
    });
    pool
        .query('SELECT * FROM users')
        .then(res => {
            let users = [];
            res.rows.forEach(r => {
                users.push({
                    name: r.name,
                    email: r.email,
                });
            });
            req.flash('usersCatalog', users);
            next();
        })
        .catch(error => {
            console.log(error);
        });
};
