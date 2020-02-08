exports.signUp = (req, res) => {
    const errors = req.flash('errors');
    if (errors.length) {
        res.render('register', {
            errors
        });
    } else {
        req.flash('success_msg', 'Pomyślnie zarejestrowano, możesz się zalogować');
        res.render('login', {
            errors: req.flash('errors'),
            success_msg: req.flash('success_msg')
        });
    }
};

exports.signIn = (req, res) => {
    const errors = req.flash('errors');
    if (errors.length) {
        res.render('login', {
            errors,
            success_msg: ''
        });
    } else {
        const username = req.body.username;
        const basket = {
            items: [],
            numOfItems: 0,
            totalPrice: 0
        };
        req.session.user = { username, basket };
        res.redirect('/');
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
    if (req.session.user) {
        const username = req.session.user.username;
        const basket = req.session.user.basket;
        res.render('basket', {
            basket,
            username
        });
    } else {
        res.redirect('login');
    }

};

exports.addToCart = (req, res) => {
    if (req.session.user) {
        let id = req.params.id - 1;
        const books = req.flash('booksCatalog');
        req.session.user.basket.items.push(books[id]);
        req.session.user.basket.numOfItems++;
        req.session.user.basket.totalPrice += books[id].price;
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
    if (errors.length) {
        req.flash('errors', errors);
    }
    next();
};


exports.search = (req, res, next) => {
    const books = req.flash('certainBooks');
    let username = '';
    if (req.session.user) {
        username = req.session.user.username;
    }
    res.render('home', {
        username,
        books
    });
};