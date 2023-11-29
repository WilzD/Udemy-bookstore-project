const Product = require('../models/product');


//promise used in showing products on admin products page
//now using sequelize findAll method to get all products
//this is an magic by Sequelize as soon as we make relation some method is automatically created.getProducts() is one of them build by squelize 
exports.getProducts = (req, res, next) =>{
  req.user.getProducts().then((products)=>{ //now only getting products of specific user which are logged in.
      res.render('admin/products',{
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      })
  }).catch(err=>console.log(err))
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

//promise and used in adding product on add product page
//now using sequelize instead of MYSQL to save product in database 
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  //this is an magic by Sequelize as soon as we make relation this method is automatically created. so now this product is added on this perticular user
  //Product is our model name that's why this is made as createProduct
  req.user.createProduct({   
  title:title,   //this title is key name: this title is value of title from variable title
  price:price,
  imageUrl:imageUrl,
  description:description
  }).then((result)=>{
    res.redirect('/admin/products')
}).catch(err=>console.log(err))
};


//promise used on edit button on admin products page
//sequelize findByPk used to het that product data on edit page
//now using sequelize relation method to get product of specific user
exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  const prodId=req.params.productId
  req.user.getProducts({where:{id:prodId}}).then((product)=>{ //using sequelize relation method here
    if(!product){
      return res.redirect('/')
    }
    else{
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing:editMode,
        product:product[0]  //using product[0] because 'where' contdition gives us an array and our desired product at index 0
      });
    }
  }).catch(err=>console.log(err))
};

//using promise to update product on admin page
//now using sequelize save() method to save data
//approach->first we are going to find the product using findByPk and then using save method to save data to database
exports.postEditProduct = (req, res, next) => {
  const prodId=req.body.productId

  const updatedTitle=req.body.title
  const updatedPrice=req.body.price
  const updatedDesc=req.body.description
  const updatedImgUrl=req.body.imageUrl

  Product.findByPk(prodId)
  .then((product)=>{
  product.title=updatedTitle,
  product.price=updatedPrice,
  product.imageUrl=updatedImgUrl,
  product.description=updatedDesc
  return product.save() //this is sequelize method to save data in database, we are returning that to another then condition
  // res.redirect('/admin/products') if we res.redirect here it will not get displayed we have to refresh the page, reason save alson return a promise,thats why we have to use return and another then condition
  })
  .then(()=>res.redirect('/admin/products'))
  .catch(err=>console.log(err))
};

// promise used in delete product on admin product page 
// now using sequelize method destro method to delete the product
//approach->use destro using where condition or we can use findById and then destroy product
exports.deleteProduct=(req,res,next)=>{
  const prodId=req.params.productId
  //first approach
  Product.destroy({where:{id:prodId}})
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))

  //second approach
  // Product.findByPk(prodId).then((productToDel)=>{
  //      productToDel.destroy().then(()=>res.redirect('/admin/products'))
  // })
}

exports.getCartItems=(req,res,next)=>{
res.send('<h1>your cart</h1>')
}