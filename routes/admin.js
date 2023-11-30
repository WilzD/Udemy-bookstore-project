

const express = require('express');

const adminController = require('../controllers/admin');
const cartController=require('../controllers/shop')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

///admin/edit-product =>GET
router.get('/edit-product/:productId', adminController.getEditProduct);

//admin/edit-product =>POST
router.post('/edit-product',adminController.postEditProduct)

//admin/delete-product=>delete
router.post('/delete-product/:productId',adminController.deleteProduct)

module.exports = router;

