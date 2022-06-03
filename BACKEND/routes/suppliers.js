const router = require("express").Router();
const { response } = require("express");
let Supplier = require("../models/Supplier");

//Add supplier

router.route("/add").post((req, res)=>{

    const supid = req.body.supid;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const regdate = req.body.regdate;
    const address = req.body.address;
    const category = req.body.category;

    const newSupplier = new Supplier({

        supid,
        name,
        email,
        phone,
        regdate,
        address,
        category

    })

    newSupplier.save().then(()=> {
        res.json("Supplier Added")

    }).catch((err)=>{
        console.log(err);

    })
})

// fetch data

router.route("/").get((req, res) => {

    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    //d structure
    const {supid,name, email, phone, regdate, address, category} = req.body;

    const updateSupplier = {
        supid,
        name, 
        email, 
        phone, 
        regdate, 
        address, 
        category
    }

    const update = await Supplier.findByIdAndUpdate(userId, updateSupplier).then(() => {

        res.status(200).send({status: "User Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message });
    }) 

})

//delete

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Supplier.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user !", error:err.message})
    })
})

//get one member's data
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const supplierdata = await Supplier.findById(userId).then((supplier) => {
        res.status(200).send({status: "User fetched", supplier});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user !", error:err.message});
    })

})


// export the module
module.exports = router;