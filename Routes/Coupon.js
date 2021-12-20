const express = require("express");
const router = express.Router();
const Coupons = require("../Models/CouponTable");

//Add Lead
router.post("/Coupons",async(req,res) => {
     

    var data= new Coupons(req.body);
    try {
        await data.save();
        res.json(data);
         
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
    
})


//Update Lead
router.put("/Coupons/:id",async (req, res) => { 
    try {
        var data = await Coupons.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/Coupons", async (req, res) => {
    try {
        var data = await Coupons.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/Coupons/:id", async (req, res) => {
    try {
        const data = await Coupons.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/Coupons/delete/:id", async (req, res) => {
    try {
        const data = await Coupons.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;