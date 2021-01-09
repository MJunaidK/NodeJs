exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    /*const isLoggedIn = req
        .get('cookie')
        .split(';')[0]
        .trim()
        .split('=')[1]*/
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}