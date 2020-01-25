exports.signUp = (req, res) => {
    res.redirect('login');
};

exports.signIn = (req, res) => {
    res.render('home');
};