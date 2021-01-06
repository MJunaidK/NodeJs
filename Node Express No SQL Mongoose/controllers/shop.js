const Product = require('../models/product');
const { includes } = require('../util/path');
//const Cart = require('../models/cart');
//const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

/* exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData])=> {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};*/

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //Product.findById(prodId)
  Product.findById(prodId)
  .then( product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
    })
  .catch(err => {
      console.log(err)
    })  
};



/*exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).
    then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      });
  }).catch(err => console.log(err))  
}; */

exports.getIndex = (req, res, next) => {
  Product.find()
    .then( products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err)
    });
};

/*exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData])=> {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};
*/

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
       res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              products: products
            });
    })    
    .catch(error => {
      console.log(error);
    })
}
/*exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
}; */

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product => {
    return req.user.addToCart(product);
  }).then(result => {
    console.log(result);
    res.redirect('/cart');
  })
}

/* exports.postCart = (req, res, next) => {
  let newQuantity = 1;
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId}});
  })
  .then( products => {
      let product;
      if(products.length > 0){
        product = products[0];
      }
      if(product){
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findById(prodId);  
     //return Product.findAll({where: {id: prodId}})
  })
  .then(product => {
        return fetchedCart.addProduct(product, { 
          through : { quantity: newQuantity }
        });
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err))
}*/



/*exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};*/

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .removeFromCart(prodId)
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
}

/* exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}; */


exports.postOrder = (req, resp, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then( result => {
      resp.redirect('/orders');
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user  
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
}  

/* exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};*/

/*exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};*/
