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

exports.addItem = (req, res) => {
    if (req.session.user) {
        if (req.session.user.username == 'admin') {
            const users = req.flash('usersCatalog');
            res.render('additem');
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
            let book = {
                
            }
        }
    } else {
        res.render('login', {
            success_msg: '',
            errors: ['Nie masz uprawnień - zaloguj się jako administrator']
        });
    }
};