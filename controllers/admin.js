const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

//promise used in adding product on add product page
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then(()=>{
    res.redirect('/');
  }).catch(err=>console.log(err));
};

//promise used in showing products on admin products page
exports.getProducts = (req, res, next) =>{
  Product.fetchAll().then(([products])=>{
      res.render('admin/products',{
        prods: products,
        pageTitle: 'Admin Products',
         path: '/admin/products',
      })
  }).catch(err=>console.log(err))
}

// promise used in delete product on admin product page 
exports.deleteProduct=(req,res,next)=>{
  const prodId=req.params.productId
  Product.delete(prodId).then(()=>{
    res.redirect('/admin/products')
  })
}

//promise used on edit button on admin products page
exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const prodId=req.params.productId
  Product.findById(prodId).then(([product])=>{
    if(!product){
      return res.redirect('/')
    }
    else{
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing:editMode,
        product:product[0]
      });
    }
  }).catch(err=>console.log(err))
};
//using promise to update product on admin page
exports.postEditProduct = (req, res, next) => {
  const prodId=req.body.productId

  const updatedTitle=req.body.title
  const updatedPrice=req.body.price
  const updatedDesc=req.body.description
  const updatedImgUrl=req.body.imageUrl

  const updatedProduct={
    prodId,
    updatedTitle,
    updatedImgUrl,
    updatedDesc,
    updatedPrice,
  }
  Product.update(updatedProduct).then(()=>{
    res.redirect('/admin/products')
  }).catch(err=>console.log(err))
};



exports.getCartItems=(req,res,next)=>{
res.send('<h1>your cart</h1>')
}