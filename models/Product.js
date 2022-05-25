const mongoose = require('../config/connection');


const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    des: {type:String, required:true},
    imgsrc: {type:String, required:true},
    price: {type:Number, required:true},
    qty: {type:Number, required:true},
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;