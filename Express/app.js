const express = require('express');

const app = express();

const bodyParser = require('body-parser');

/*
app.use((req,res, next) => {
    console.log('In the middleware');
    next(); // Allows the request to continue to the next middleware in line.
});
*/ 

app.use(bodyParser.urlencoded({extended: false}));

app.use('/',(req,res, next) => {
    console.log('This always run');
    next();
});

app.use('/add-product',(req,res, next) => {
    console.log('In another middleware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/',(req,res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);