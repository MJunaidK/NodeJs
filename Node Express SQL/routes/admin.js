const path = require('path');

const rootDir = require('../util/path')

const adminController = require('../controllers/admin');

const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products',adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

/*router.get('/add-product',(req,res, next) => {
    console.log('In another middleware');
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //res.render('add-product', {pageTitle: 'Add Product'})
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true})
}); */



// /admin/add-product => POST

router.post('/add-product', adminController.postAddProduct);

/* router.post('/add-product', (req, res, next) => {
    //console.log(req.body);
    products.push({title: req.body.title})
    res.redirect('/');
});*/

module.exports = router;

