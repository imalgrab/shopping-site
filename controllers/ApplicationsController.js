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

exports.signIn = (req, res) => {
    const errors = req.body.errors;
    if (errors.length) {
        res.render('login', {
            errors: req.body.errors,
            success_msg: req.flash('success_msg')
        });
    } else {
        req.session.username = req.body.username;
        res.render('home', {
            books: req.flash('booksCatalog'),
            username: req.session.username
        });
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