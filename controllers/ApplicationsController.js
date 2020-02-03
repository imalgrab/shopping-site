exports.signUp = (req, res) => {
    const errors = req.body.errors;
    if (errors.length) {
        res.render('register', {
            errors: req.body.errors
        });
    } else {
        req.flash('success_msg', 'Pomyślnie zarejestrowano, możesz się zalogować');
        res.render('login', {
            errors: req.flash('errors'),
            success_msg: req.flash('success_msg')
        });
    }
};

exports.signIn = (req, res, next) => {
    const errors = req.body.errors;
    if (errors.length) {
        res.render('login', {
            errors: req.body.errors,
            success_msg: req.flash('success_msg')
        });
    } else {
        const username = req.body.username;
        const basket = [];
        req.session.user = {
            username,
            basket
        };
        let books = req.flash('booksCatalog');
        if (books.length) {
            res.render('home', {
                username,
                books
            });
        } else {
            res.redirect('/');
        }
    }
};

exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
};

exports.basket = (req, res) => {
    const basket = req.session.user.basket;
    const username = req.session.user.username;
    res.render('basket', {
        basket,
        username
    });
};

exports.addToCart = (req, res) => {
    if (req.session.user) {
        let id = req.params.id;
        const books = req.flash('booksCatalog');
        req.session.user.basket.push(books[id]);
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
};

exports.validateData = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let errors = [];

    if (!username.length) {
        errors.push('Nazwa użytkownika wymagana!');
    }
    if (!email.length) {
        errors.push('Adres e-mail wymagany!');
    }
    if (!password.length) {
        errors.push('Hasło wymagane!');
    } else if (password.length < 6) {
        errors.push('Hasło musi być dłuższe niż 6 znaków!');
    }
    req.body.errors = errors;
    next();
};


exports.search = (req, res, next) => {
    var query = req.body.search;
    let certainBooks = [];
    let books = req.flash('booksCatalog');
    let username = '';
    if (req.session.user) {
        username = req.session.user.username;
    }
    books.forEach(book => {
        if (book.title.includes(query) || book.author.includes(query) || book.genre.includes(query)) {
            certainBooks.push(book);
        }
    });
    req.flash('certainBooks', certainBooks);
    res.render('home', {
        username,
        books: certainBooks
    });
};