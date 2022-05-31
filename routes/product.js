const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const routName = '/api/v1/vpets';

const multer = require('multer');

const upload = multer({
    dest: "../public/img",
    fieldNameSize: 300,
    limits:{fileSize:1048546 //10Mb
    }
});

//INDUCES



//Index Shop
router.get(routName+"/shop", productController.shopIndex);
//Index Buy
router.get(routName+"/shop/:id", productController.buyPet);
//Index Dashboard
router.get(routName+"/dashboard", productController.dashIndex);


//index
router.get(routName, productController.products);

//index Json returns json file with all vpets
router.get(routName+'/json', productController.productsJson);

//index Json returns a HTML page
router.get(routName+'/jsonindex', productController.productsJsonIndex);

//New
router.get(routName+'/new', productController.newProduct);

//Delete
router.delete(routName+'/:id', productController.deleteProduct);

//Delete Json
router.delete(routName+'/json/:id', productController.deleteProductJson);

//update
router.put(routName+'/:id',upload.single("imgsrc"), productController.updateProduct);

//update Json
router.put(routName+'/json/:id',upload.single("imgsrc"), productController.updateProductJson);

//Create
router.post(routName, upload.single("imgsrc"), productController.createProduct);

//Create Json
router.post(routName+"/json", upload.single("imgsrc"), productController.createProductJson);

//Edit
router.get(routName+'/edit/:id', productController.editProduct);

//Show
router.get(routName+'/:id', productController.showProduct);

//Show Json
router.get(routName+'/Json/:id', productController.productJson);

module.exports = router;