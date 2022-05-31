const mongoose = require('../config/connection');


const petSchema = new mongoose.Schema({
    name: {type:String, required:true},
    des: {type:String, required:true},
    imgsrc: {type:String, required:true},
    product_id:{type:String, required:true}
});

const Pet = mongoose.model('Pet', petSchema);


module.exports = Pet;