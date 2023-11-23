const path=require('path')
const fs=require('fs')
const p=path.join(path.dirname(process.mainModule.filename),
'data',
'cart.json'
)
module.exports=class cart{
   static addProduct(id,prodPrice){
    //fetch the previous cart
    fs.readFile(p,(err,fileContent)=>{
        let cart={products:[],totalPrice:0}
        if(!err){
            cart=JSON.parse(fileContent)
        }
    //analyze cart find =>find existing product
        const existingProductIndex=cart.products.findIndex(prod=> prod.id===id);
        const existingProduct=cart.products[existingProductIndex]
        let updatedProduct;
    //add new product /increase qty
        if(existingProduct){
          updatedProduct={...existingProduct}
          updatedProduct.qty=updatedProduct.qty+ 1
          cart.products=[...cart.products]
          cart.products[existingProductIndex]=updatedProduct
        }
        else{
            updatedProduct={id:id,qty:1}
            cart.products=[...cart.products,updatedProduct]
        }
        cart.totalPrice=cart.totalPrice+ +prodPrice;
        fs.writeFile(p,JSON.stringify(cart),(err)=>{
            console.log(err)
        })
    })
   }
}