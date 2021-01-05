const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

 router.get('/cart', shopController.getCart);

 router.post('/cart', shopController.postCart);

 router.post('/cart-delete-item', shopController.postCartDeleteProduct);

 router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);


/* router.get('/',(req,res, next) => {
   // res.send('<h1>Hello from Express!</h1>');
   /*console.log('shop.js', adminData.products);
   res.sendFile(path.join(rootDir, 'views', 'shop.html'));*/
   //res.render('shop', {prods: adminData.products, docTitle: 'Shop'});
/*   res.render('shop', {
      prods: adminData.products, 
      pageTitle: 'Shop', 
      path: '/', 
      hasProducts: adminData.products.length > 0,
      activeShop: true,
      productCSS: true
   });
}); */

module.exports = router;
