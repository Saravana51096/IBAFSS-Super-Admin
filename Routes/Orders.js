const express = require("express");
const router = express.Router();
const Orders = require("../Models/OrdersTable");

//Add Lead
router.post("/Orders",async(req,res) => {
     

    var data= new Orders(req.body);
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
router.put("/Orders/:id",async (req, res) => { 
    try {
        var data = await Orders.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/Orders", async (req, res) => {
    try {
        var data = await Orders.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/Orders/:id", async (req, res) => {
    try {
        const data = await Orders.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/Orders/delete/:id", async (req, res) => {
    try {
        const data = await Orders.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;