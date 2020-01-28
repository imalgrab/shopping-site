exports.home = (req, res) => {
    let username = '';
    if (req.session.user) {
        username = req.session.user.username;
    }
    // console.log(username);
    // console.log(req.session);
    res.render('home', {
        books: req.flash('booksCatalog'),
        username: username
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