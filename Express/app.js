const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

/*
app.use((req,res, next) => {
    console.log('In the middleware');
    next(); // Allows the request to continue to the next middleware in line.
});
*/ 

app.use(bodyParser.urlencoded({extended: false}));


app.use(shopRoutes);
app.use(adminRoutes);
/*
app.use('/',(req,res, next) => {
    console.log('This always run');
    next();
});
*/

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);