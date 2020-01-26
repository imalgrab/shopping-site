exports.home = (req, res) => {
    res.render('home', {
        books: req.flash('booksCatalog'),
        username: req.session.username
    });
};

exports.register = (req, res) => {
    res.render('register', {
        errors: []
    });
};

exports.login = (req, res) => {
    res.render('login', {
        errors: [],
        success_msg: []
    });
};