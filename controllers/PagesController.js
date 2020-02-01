exports.home = (req, res) => {
    let username = '';
    if (req.session.user) {
        username = req.session.user.username;
    }
    res.render('home', {
        books: req.flash('booksCatalog'),
        username
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