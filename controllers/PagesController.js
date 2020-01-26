exports.home = (req, res) => {
    res.render('home');
};

exports.register = (req, res) => {
    res.render('register', {
        errors: req.flash('errors')
    });
};

exports.login = (req, res) => {
    res.render('login', {
        errors: req.flash('errors')
    });
};