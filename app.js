const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const sequelizeDB=require('./util/database') // importing the sequelize from our database file, so that we can make table before server is loading

//importing our models to make relations beetween them
const Product=require('./models/product')
const User=require('./models/user')
const Cart=require('./models/cart')
const CartItem=require('./models/cart-item')


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//middleware to keep track of user 
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
    req.user=user
    next()
    }).catch(err=>console.log(err))
   })

app.use('/admin', adminRoutes);
app.use(shopRoutes);



//making relation between user and product
//one product can created by multiple user or one user can create multiple products , this is for admin basically he is going to add product
//one to one relation 
//belogsTo defining that one to one relation exist BW Product and User ,and FK being defined in Product table(right side)
//if we use hasOne that also create one to one relation but the FK is being defined in User table(left side)

// Product.belongsTo(User)//this product created by this user, also setting constraints onDelete:"CASCADE" that on delete of this user all products related to him will delete
User.hasMany(Product,{constraints:true,onDelete:'CASCADE'}) // this is one to many relation between creator and products,this is another way of doing one to one relation

//user cart relation which is stored in UserItem table(because M-N relation always need a intermideate table)
User.hasOne(Cart)  //this relation can also be written as Cart.belongsTo(user)
Cart.belongsToMany(Product,{through:CartItem}) //many to many relation , through:CartItem is saying that where these relation going to be stored
// Cart.belongsToMany(Product,{through:CartItem})// another way of witting above M-N relation


//so the sync method ensure that all the tables and relations were made in database, and only after we are running the server
//so we get new table every time the server is loaded?
//ans is no on every load it checks that if table is already exists in database it will not recreate the tables

// .sync({force:true}) //using force true because in DB the product table is already created so this will delete the old table and create this table, if the table is not already exists there dont use this                                           
sequelizeDB.sync()
.then((result)=>{
    return User.findByPk(1) 
}).then((user)=>{
    if(!user){
        return User.create({name:'wilson',email:'admin@gmailcom'})
    }else{
        return user
    }
}).then((user)=>{
    return user.createCart() //as soon as the new user logged a cart is created(this user id will add in cart table)
}).then(app.listen(3000))
.catch(err=>console.log(err))

