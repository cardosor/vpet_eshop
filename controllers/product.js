const Product = require('../models/Product');
const routeName = '/api/v1/vpets'
const path = require("path");
const fs = require("fs");

//INDUCES
//index
const product = (req, res) => {
    //Query Model to return fruits
    Product.find({}, (err, allProducts)=>{
        res.render('Index', {products: allProducts})
    });
}


const productTest = (req, res) => {
    //Query Model to return fruits
        Product.findById(req.params.id, (err, foundProduct) => {
            err ? res.status(400).json(err) : res.json(foundProduct);
        });
}

//New
const newProduct =  (req, res) => {
    res.status(200).render('New');
}

// Delete
const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedVpet) => {
        const publicPath = deletedVpet.img;
        const localPath = "../public"+publicPath;
        const targetPath = path.join(__dirname, localPath);
        if(err){
            res.status(400).json(err)
        }else{
            fs.unlink(targetPath, err => {
                err ? res.status(400).json(err) : res.status(200).redirect(routeName);
            });
            
        }     
    })
}

function cleanName(){
    console.log("Hello");
}


//Update
const updateProduct = (req, res) => {

    console.log(req.body);
    console.log(req.file);
    if(req.file){
        const tempPath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLocaleLowerCase();
        //Remove special characters and more than one white space, also remove white space from start and end
        const cleanName = (req.body.name).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
        //Removes white space from string
        const cleanFileName = cleanName.replace(/\s/g, '');
        const publicPath = "/img/"+cleanFileName+Date.now()+fileExt;
        const localPath = "../public"+publicPath;
        const targetPath = path.join(__dirname, localPath);
        if(fileExt === ".png" || fileExt === ".jpg" ){
            fs.rename(tempPath, targetPath, err => {
                if (err){
                    res.status(400).json(err)
                }else{
                    const imgToDeleteURI = path.join(__dirname, "../public"+req.body.imgsrc);
                    fs.unlink(imgToDeleteURI, err => {
                        if(err){
                            fs.unlink(targetPath, err => {
                                err ? console.log("Could not delete temp") : console.log("temp deleted");
                            });
                            res.status(400).json(err)
                        }else{
                            req.body.imgsrc = publicPath;
                            req.body.name = cleanName;
                            Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, productUpdate) => {
                                err ? res.send(err) : res.redirect(routeName);  
                            });
                        }
                    });
                }  
            });
        }else{
            fs.unlink(tempPath, err => {
                err ? res.status(400).json(err) : res.status(200).json({"img":"Only PNG or JPG File."});
            });
        }
    }else{
        Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, productUpdate) => {
            err ? res.send(err) : res.redirect(routeName);  
        });
    }
}

//Create
const createProduct = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const tempPath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLocaleLowerCase();
    //Remove special characters and more than one white space, also remove white space from start and end
    const cleanName = (req.body.name).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
    //Removes white space from string
    const cleanFileName = cleanName.replace(/\s/g, '');
    const publicPath = "/img/"+cleanFileName+Date.now()+fileExt;
    const localPath = "../public"+publicPath;
    const targetPath = path.join(__dirname, localPath);
    if(fileExt === ".png" || fileExt === ".jpg" ){
        fs.rename(tempPath, targetPath, err => {
            if (err){
                res.status(400).json(err)
            }else{
                req.body.imgsrc = publicPath;
                req.body.name = cleanName;
                Product.create(req.body, (err, createdVpet) => {
                    err ? res.send(err) : res.redirect(routeName);  
                })
            }  
        });
    }else{
        fs.unlink(tempPath, err => {
            err ? res.status(400).json(err) : res.status(200).json({"img":"Only PNG or JPG File."});
        });
    }
}

//Create
const createProductJson = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if(req.file){
        const tempPath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLocaleLowerCase();
        //Remove special characters and more than one white space, also remove white space from start and end
        const cleanName = (req.body.name).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
        //Removes white space from string
        const cleanFileName = cleanName.replace(/\s/g, '');
        const publicPath = "/img/"+cleanFileName+Date.now()+fileExt;
        const localPath = "../public"+publicPath;
        const targetPath = path.join(__dirname, localPath);
        if(fileExt === ".png" || fileExt === ".jpg" ){
            fs.rename(tempPath, targetPath, err => {
                if (err){
                    res.json({"error": "Saving File Error!"});
                }else{
                    req.body.imgsrc = publicPath;
                    req.body.name = cleanName;
                    Product.create(req.body, (err, createdVpet) => {
                        console.log(createdVpet);
                        err ? 
                        res.json({"error": "Database CRUD Error!"})
                        : 
                        res.json(createdVpet)
                    })
                }  
            });
        }else{
            fs.unlink(tempPath, err => {
                err ? 
                res.json({"error": "Error Unlink temp file"}) 
                : 
                res.json({"error":"Only PNG or JPG File."});
            });
        }   
    }else{
        res.json({"error": "Image is required!"});
    }   
}


//Edit
const editProduct = (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        err ? res.status(400).json(err) : res.status(200).render('Edit', {product: foundProduct});
    });
}


//Show
const showProduct = (req, res)=> {
    Product.findById(req.params.id, (err, product) => {
        res.render('Show', {product: product});
    });
}



module.exports = {
    product,
    newProduct,
    createProduct,
    deleteProduct,
    productTest,
    editProduct,
    updateProduct,
    showProduct,
    createProductJson
}