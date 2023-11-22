const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const productController=require('../controllers/productController')

const router = express.Router();

router.get('/',productController.GetProducts)

module.exports = router;
