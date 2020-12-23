const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

/*
app.use((req,res, next) => {
    console.log('In the middleware');
    next(); // Allows the request to continue to the next middleware in line.
});
*/ 

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminData.routes);
app.use(shopRoutes);

/*
app.use('/',(req,res, next) => {
    console.log('This always run');
    next();
});
*/

app.use((req, res, next) => {
    //res.status(404).send('<h1>Page not found</h1>');
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404')
});

app.listen(3000);