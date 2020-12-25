const path = require('path');

const rootDir = require('../util/path')

const express = require('express');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product',(req,res, next) => {
    console.log('In another middleware');
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //res.render('add-product', {pageTitle: 'Add Product'})
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true})
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    //console.log(req.body);
    products.push({title: req.body.title})
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
