exports.showUsers = (req, res) => {
    if (req.session.user) {
        if (req.session.user.username == 'admin') {
            const users = req.flash('usersCatalog');
            res.render('users', {
                users
            });
        }
    } else {
        res.render('login', {
            success_msg: '',
            errors: ['Nie masz uprawnień - zaloguj się jako administrator']
        });
    }
};

exports.showOrders = (req, res) => {
    if (req.session.user) {
        if (req.session.user.username == 'admin') {
            const orders = req.flash('ordersCatalog');
            res.render('orders', {
                orders
            });
        }
    } else {
        res.render('login', {
            success_msg: '',
            errors: ['Nie masz uprawnień - zaloguj się jako administrator']
        });
    }
};

exports.addItem = (req, res) => {
    if (req.session.user) {
        if (req.session.user.username == 'admin') {
            res.render('additem');
        }
        else {
            res.render('login', {
                success_msg: '',
                errors: ['Nie masz uprawnień - zaloguj się jako administrator']
            });
        }
    } else {
        res.render('login', {
            success_msg: '',
            errors: ['Nie masz uprawnień - zaloguj się jako administrator']
        });
    }
};

exports.editItem = (req, res) => {
    if (req.session.user) {
        if (req.session.user.username == 'admin') {
            let id = req.params.id;
            const books = req.flash('booksCatalog');
            const book = books[id];
            id++;
            res.render('edititem', {
                book,
                id
            });
        }
    } else {
        res.render('login', {
            success_msg: '',
            errors: ['Nie masz uprawnień - zaloguj się jako administrator']
        });
    }
};