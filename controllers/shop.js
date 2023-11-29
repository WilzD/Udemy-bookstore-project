const Product = require('../models/product');
const Cart=require('../models/cart')

//using promises to show all products , the function fetchAll from Product model is returning a promise ad we are using that here
//now using sequelize method to fetch all products
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  }).catch(err=>console.log(err))
}


  // }).catch(err=>console.log(err))


//promise used to show products on shop page which landing page
exports.getIndex = (req, res, next) => {
  Product.findAll().then((products)=>{ 
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/'
  });
  }).catch(err=>console.log(err))
};

//promise used to show single product on products page
//now using sequelize to find product there are two way 
// fidnByPk and findAll (in findAll we have to pass where condition and returns an array)
exports.getProduct=(req,res,next)=>{
  //using findByPk to fetch a single product using id which is PK in table
  const ProdId=req.params.productId
  Product.findByPk(ProdId).then((product)=>{
    res.render('shop/product-detail', {
      path: '/products',
      pageTitle:product.title,
      product:product
    });
  }).catch(err=>console.log(err))

  //using findAll with where condition
  // Product.findAll({where:{id:ProdId}}).then((product)=>{
  //   console.log(product[0])
  //     res.render('shop/product-detail', {
  //     path: '/products',
  //     pageTitle:product[0].title,
  //     product:product[0]
  //     })
  // }).catch(err=>console.log(err))

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
