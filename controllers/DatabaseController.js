const pg = require('pg');
const bcrypt = require('bcryptjs');

const pool = new pg.Pool({
    host: 'ec2-54-246-89-234.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd78gm9kncmi5m7',
    user: 'iuxsfwsvnbrnvi',
    password: '8d04687c4aa6ed0497f24d8e2156d35a0a436bf14c86a55e3ce673aafe705627',
    ssl: true
});

exports.insertUser = (req, res, next) => {
    const errors = req.flash('errors');
    if (errors.length) {
        res.render('register', {
            errors
        });
    } else {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        let errors = [];

        pool
            .query(`SELECT * FROM users WHERE name = '${username}'`)
            .then(res => {
                if (res.rowCount > 0) {
                    errors.push(`Nazwa ${username} jest zajęta`);
                    req.flash('errors', errors);
                    next();
                } else {
                    const hash = bcrypt.hashSync(password, 8);
                    pool
                        .query(`INSERT INTO users (name, email, hash) values ('${username}', '${email}', '${hash}')`)
                        .then()
                        .catch(error => {
                            console.log(error);
                        });
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
    pool
        .query(`UPDATE books set title = '${title}', author = '${author}', genre = '${genre}', price = '${price}', img = '${img}' where id = '${id}'`)
        .then()
        .catch(error => {
            console.log(error);
        });
    next();
};

exports.validateUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let errors = [];
    pool
        .query(`SELECT hash FROM users WHERE name = '${username}'`)
        .then(res => {
            if (res.rowCount > 0) {
                const hash = res.rows[0].hash;
                if (bcrypt.compareSync(password, hash)) {
                    next();
                } else {
                    errors.push('Zła nazwa użytkownika lub hasło');
                    req.flash('errors', errors);
                    next();
                }
            } else {
                errors.push(`Użytkownik ${username} nie istnieje`);
                req.flash('errors', errors);
                next();
            }
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getCertainItems = (req, res, next) => {
    const phrase = req.body.search;
    pool
        .query(`SELECT * FROM books WHERE title LIKE '%${phrase}%' OR author LIKE '%${phrase}%' OR genre LIKE '%${phrase}%' ORDER BY id ASC`)
        .then(res => {
            let books = [];
            res.rows.forEach(r => {
                books.push({
                    id: r.id,
                    title: r.title,
                    author: r.author,
                    genre: r.genre,
                    price: r.price,
                    img: r.img
                });
            });
            if (books.length) {
                req.flash('certainBooks', books);
            }
            next();
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getItems = (req, res, next) => {
    pool
        .query('SELECT * FROM books ORDER BY id ASC')
        .then(res => {
            let books = [];
            res.rows.forEach(r => {
                books.push({
                    id: r.id,
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

exports.getOrders = (req, res, next) => {
    pool
        .query('SELECT * FROM orders')
        .then(res => {
            let orders = [];
            res.rows.forEach(r => {
                orders.push({
                    id: r.id,
                    name: r.name,
                    bookids: r.bookids,
                });
            });
            req.flash('ordersCatalog', orders);
            next();
        })
        .catch(error => {
            console.log(error);
        });
};

exports.makeOrder = (req, res, next) => {
    const booksToOrder = req.session.user.basket.items;
    const username = req.session.user.username;
    let booksToOrderIds = [];
    booksToOrder.forEach(b => {
        booksToOrderIds.push(b.id);
    });

    let booksIdsStr = booksToOrderIds.join(',');
    booksIdsStr = 'ARRAY[' + booksIdsStr + ']';
    pool
        .query(`INSERT INTO orders (name, bookids) VALUES ('${username}', ${booksIdsStr} )`)
        .then()
        .catch(error => {
            console.log(error);
        });
    req.session.user.basket.items = [];
    res.redirect('/');
};