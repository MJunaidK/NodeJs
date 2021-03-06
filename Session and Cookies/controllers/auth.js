const User = require('../models/user'); 

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
    User.findById('5ff525454907e13fa8df347f')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err)  
        res.redirect('/');
      })
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
   req.session.destroy(err => {
       console.log(err);
       res.redirect('/');
   });
};
