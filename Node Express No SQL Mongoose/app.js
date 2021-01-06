const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConncet;

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findById("5ff525454907e13fa8df347f")
    .then( user => {
        req.user = user;
        next();
    }) 
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://:@cluster0.wxcwk.mongodb.net/shop?retryWrites=true&w=majority')
.then(() => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Mohammad Junaid Khan',
                email: 'junaid@mjk.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
}).catch(err => {
    console.log(err);
})
/*
mongoConnect(() => {
    app.listen(3000);
})*/

