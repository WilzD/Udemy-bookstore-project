const Product = require('../models/product');
const Cart=require('../models/cart')

//using promises to show all products , the function fetchAll from Product model is returning a promise ad we are using that here
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([index0])=>{ // using destructuring -> we are fetching index0 from the recieved data because in database array our products at index0
    res.render('shop/product-list', {
      prods: index0,
      pageTitle: 'All Products',
      path: '/products'
  });
  }).catch(err=>console.log(err))
};

//promise used to show products on shop page which landing page
exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([index0])=>{ 
    res.render('shop/index', {
      prods: index0,
      pageTitle: 'All Products',
      path: '/'
  });
  }).catch(err=>console.log(err))
};

//promise used to show single product on products page
exports.getProduct=(req,res,next)=>{
  const ProdId=req.params.productId
  Product.findById(ProdId).then(([product])=>{
    res.render('shop/product-detail', {
      path: '/products',
      pageTitle:product.title,
      product:product[0]
    });
  }).catch(err=>console.log(err))
}




//this are non working functions on respective page as of now
exports.getCart = (req, res, next) => {
  res.render('/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart=(req,res,next)=>{
  const ProdId=req.body.productId
  Product.findById(ProdId,(product)=>{
   Cart.addProduct(ProdId,product.price)
  })
  console.log(ProdId)
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
