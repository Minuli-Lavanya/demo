const router = require("express").Router();
const { response } = require("express");
let Item = require("../models/Item");

//Add Items

router.route("/add").post((req, res)=>{

    const itemcode = req.body.itemcode;
    const itemname = req.body.itemname;
    const supid = req.body.supid;
    const buydate = req.body.buydate;
    const unitprice = req.body.unitprice;
    const qty = req.body.qty;
    const totalpayment = req.body.qty*unitprice;

    const newItem = new Item({

        itemcode,
        itemname,
        supid,
        buydate,
        unitprice,
        qty,
        totalpayment

    })

    newItem.save().then(()=> {
        res.json("New Item Added")

    }).catch((err)=>{
        console.log(err);

    })
})

// fetch data

router.route("/").get((req, res) => {

    Item.find().then((items)=>{
        res.json(items)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    //d structure
    const {itemcode,itemname,supid,buydate,unitprice,qty,totalpayment=unitprice*qty} = req.body;

    const updateItem = {
        itemcode,
        itemname,
        supid,
        buydate,
        unitprice,
        qty,
        totalpayment
    }

    const update = await Item.findByIdAndUpdate(userId, updateItem).then(() => {

        res.status(200).send({status: "item Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message });
    }) 

})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Item.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Item Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete Item !", error:err.message})
    })
})

//get one item's data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const itemdata = await Item.findById(userId).then((item) => {
        res.status(200).send({status: "item fetched", item});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get Item details!", error:err.message});
    })

})

// export the module
module.exports = router;