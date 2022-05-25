const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const routName = '/api/v1/vpets';

const multer = require('multer')
const upload = multer({
    dest: "../public/img",
    fieldNameSize: 300,
    limits:{fileSize:1048546 //10Mb
    }
});

//index
router.get(routName, productController.product);

//TEST
router.get(routName+'/test', productController.productTest);

//New
router.get(routName+'/new', productController.newProduct);

//Delete
router.delete(routName+'/:id', productController.deleteProduct);

//update
router.put(routName+'/:id',upload.single("imgupdate"), productController.updateProduct);

//Create
router.post(routName, upload.single("imgsrc"), productController.createProduct);

//Edit
router.get(routName+'/edit/:id', productController.editProduct);

module.exports = router;