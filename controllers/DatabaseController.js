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
                    req.flash('userInfo', username);
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