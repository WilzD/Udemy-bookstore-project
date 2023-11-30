const Product = require('../models/product');
const Cart = require('../models/cart')

//using promises to show all products , the function fetchAll from Product model is returning a promise ad we are using that here
//now using sequelize method to fetch all products
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  }).catch(err => console.log(err))
}


// }).catch(err=>console.log(err))


//promise used to show products on shop page which landing page
exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'All Products',
      path: '/'
    });
  }).catch(err => console.log(err))
};

//promise used to show single product on products page
//now using sequelize to find product there are two way 
// fidnByPk and findAll (in findAll we have to pass where condition and returns an array)
exports.getProduct = (req, res, next) => {
  //using findByPk to fetch a single product using id which is PK in table
  const ProdId = req.params.productId
  Product.findByPk(ProdId).then((product) => {
    res.render('shop/product-detail', {
      path: '/products',
      pageTitle: product.title,
      product: product
    });
  }).catch(err => console.log(err))

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

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};


// this are non working functions on respective page as of now

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

// exports.postCart = (req, res, next) => {
//  const prodId=req.body.productId //here the product id come
//  let fetchedCart; // to store the cart 
//  let newQuantity=1           
//  req.user.getCart()
//  .then(cart=>{    //fetch the cart of that user in cart
//   fetchedCart=cart   //assgning value to fetched cart so that we can use it in other fucntion
//   return cart.getProducts({where:{id:prodId}}) //tracing that single product
//  })
//  .then(products=>{    //got that product 
//    let product;
//    if(products.length>0){ //means that product is already exist
//       console.log(products[0])
//       product=products[0] // assign te product variable the same product we found
//    }
//    if(product){   //means the product is not already the cart , we have to add that
//    const oldQuantity=product.cartItem.quantity
//    const newQuantity=oldQuantity+1
//    return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
//    }
//    return Product.findByPk(prodId) //now finding that product in products table with tthe help of product id
//  })
//  .then(product=>{
//   return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})  // this will add the product to that cart of user
//   //{through:{quantity:newQuantity}} this will increase the quantity in cartItem table for that particular user
// })
// .then(()=>{
//   res.redirect('/cart')
// })
//  .catch(err=>console.log(err))
// }


exports.postCartDeleteProduct=(req,res)=>{
const prodId=req.body.productId
req.user.getCart().then(cart=>{
return cart.getProducts({where:{id:prodId}})
}).then(products=>{
  const product=products[0]
 return  product.cartItem.destroy()
}).then((result)=>{
  res.redirect('/cart')
})
.catch(err=>console.log(err))
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
