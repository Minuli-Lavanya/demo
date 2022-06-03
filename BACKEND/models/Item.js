const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    itemcode : {
        type : String,
        required: true
    },
    itemname : {
        type : String,
        required: true
    },
    supid : {
        type : String,
        required: true
    },
    buydate : {
        type : String,
        requir: true
    },
    unitprice : {
        type : Number,
        required: true
    },
    qty : {
        type : Number,
        required: true
    },
    totalpayment : {
        type : Number,
        required: true
    }

    
})

//mongodb data table name
const Item = mongoose.model("Item", itemSchema);

//export the module
module.exports = Item;