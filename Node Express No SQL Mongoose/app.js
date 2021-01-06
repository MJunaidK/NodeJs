const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConncet;

//const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use((req, res, next) => {
    User.findById("5ff215844ef4dba4afc570b7")
    .then( user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    }) 
}); */

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://:@cluster0.wxcwk.mongodb.net/shop?retryWrites=true&w=majority').then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})
/*
mongoConnect(() => {
    app.listen(3000);
})*/

