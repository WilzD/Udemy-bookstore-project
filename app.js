const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const sequelizeDB=require('./util/database') // importing the sequelize from our database file, so that we can make table before server is loading

//importing our models to make relations beetween them
const Product=require('./models/product')
const User=require('./models/user')

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
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'}) //this product created by this user, also setting constraints onDelete:"CASCADE" that on delete of this user all products related to him will delete
User.hasMany(Product) // this is one to many relation between creator and products,this is optional but for ensure we can also define that

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
}).then(user=>{
    // console.log(user)
    app.listen(3000)
})
.catch(err=>console.log(err))

