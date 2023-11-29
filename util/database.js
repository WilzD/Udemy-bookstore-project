//code for the connectivity to database using sql
// const mysql=require('mysql2')
// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'bookstoredb',
//     password:'123456'
// })
// module.exports=pool.promise()


// Sequelize-> it is an express.js package which use mysql to make connection with database,
//why we need -> as we know we are going to make relations between tables, so now we not need  heavy queries to esatblished relations. sequelize can do it for us using mysql
//so in simple word sequelize is writing our hard sql queries 

//making conection with database using sequelize
const Sequelize  = require("sequelize");
                             //DB name,username,password
const sequelize=new Sequelize('bookstoredb','root','123456',{
    dialect:'mysql',  //specifying the sql type
    host:'localhost' //bydefault it is already localhost but we are setting it,that we can specify our host like this 
});

module.exports=sequelize   // as we know it is using using mysql ,so it will also return a promise