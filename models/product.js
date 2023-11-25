const db=require('../util/database')

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //returning a promise that can be use in admin controller
  //using ? because we dont want our values to be directly filled it just add a one more security layer to data 
  save() {
    return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id){
   return  db.execute('SELECT * FROM products WHERE products.id=?',[id])
  }


  static delete(id){
    return db.execute('DELETE FROM products WHERE products.id=?',[id])
  }

  static update(updatedProduct){
    return db.execute(`UPDATE products SET title =?, price=?,description=?,imageUrl=? WHERE products.id=?`,[updatedProduct.updatedTitle,updatedProduct.updatedPrice,updatedProduct.updatedDesc,updatedProduct.updatedImgUrl,updatedProduct.prodId])
 }
}

