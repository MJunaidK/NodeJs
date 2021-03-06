const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs= require('express-handlebars');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
//const db = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

//app.engine('handlebars', expressHbs({extname:"handlebars", defaultLayout: "main-layout",layoutsDir: "views/layouts/"}));
//app.set('view engine', 'handlebars');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
//Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
/*
app.use((req,res, next) => {
    console.log('In the middleware');
    next(); // Allows the request to continue to the next middleware in line.
});
*/ 

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findAll({where: {id: 1}})
    .then( users => {
        req.user = users[0];
        next();
    })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

/*
app.use('/',(req,res, next) => {
    console.log('This always run');
    next();
});
*/

app.use(errorController.get404);

/*app.use((req, res, next) => {
    //res.status(404).send('<h1>Page not found</h1>');
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not found'});
});*/

sequelize
//.sync({ force: true })
.sync()
.then( result => {
    return User.findAll({where: {id: 1}})
    //console.log(result);
})
.then( users => {
    if(!users[0]){
        return User.create({name: 'Junaid', email: 'test@test.com' })
    }
  return users[0];  
})
.then(user => {
    return user.createCart();
})
.then(cart => {
   // console.log(user);
    app.listen(3000);
})
.catch( err => {
  console.log(err);
})

