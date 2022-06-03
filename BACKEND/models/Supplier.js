const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({

    supid : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    phone : {
        type : String,
        required: true
    },
    regdate : {
        type : String,
        requir: true
    },
    address : {
        type : String,
        required: true
    },
    category : {
        type : String,
        requir: true
    }
    
})

//mongodb data table name
const Supplier = mongoose.model("Supplier", supplierSchema);

//export the module
module.exports = Supplier;