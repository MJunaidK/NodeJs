const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', productsController.getProducts);


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
