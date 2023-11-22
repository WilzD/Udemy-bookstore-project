const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const ProductController=require('../controllers/productController')

const products = [];

// /admin/add-product => GET
router.get('/add-product',ProductController.ShowProducts)

// /admin/add-product => POST
router.post('/add-product',ProductController.AddProduct )


module.exports=router