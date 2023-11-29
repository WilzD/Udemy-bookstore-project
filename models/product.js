//************operations using pure sql*********** */

// const db=require('../util/database')

// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price) {
//     this.id=id
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   //returning a promise that can be use in admin controller
//   //using ? because we dont want our values to be directly filled it just add a one more security layer to data 
//   save() {
//     return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)',
//     [this.title,this.price,this.description,this.imageUrl])
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products')
//   }

//   static findById(id){
//    return  db.execute('SELECT * FROM products WHERE products.id=?',[id])
//   }


//   static delete(id){
//     return db.execute('DELETE FROM products WHERE products.id=?',[id])
//   }

//   static update(updatedProduct){
//     return db.execute(`UPDATE products SET title =?, price=?,description=?,imageUrl=? WHERE products.id=?`,[updatedProduct.updatedTitle,updatedProduct.updatedPrice,updatedProduct.updatedDesc,updatedProduct.updatedImgUrl,updatedProduct.prodId])
//  }
// }

//*****************operations using sequelize object */
const Sequelize=require('sequelize') //this written a object having methods we can use in our operations

const sequelize=require('../util/database') //imporing our database pool from our database.js file

// creating a model using sequelize 
//product is going to be our table name in database 
const Product=sequelize.define('product',{
  //column name
  id:{
    type:Sequelize.INTEGER, //data type and other config of id
    autoIncrement:true,
    primaryKey:true,
    allowNull:false,
  },

  title: Sequelize.STRING, //single config so we can write like this

  price:{
    type:Sequelize.DOUBLE,
    allowNull:false,
  },

  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }

});

//exporting our product model that can use anywhere now
module.exports=Product