const express = require("express");
const router = express.Router();
const Promotional = require("../../Models/Notifications/PromotionalTable");

//Add Lead
router.post("/Promotional",async(req,res) => {
     

    var data= new Promotional(req.body);
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
router.put("/Promotional/:id",async (req, res) => { 
    try {
        var data = await Promotional.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/Promotional", async (req, res) => {
    try {
        var data = await Promotional.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/Promotional/:id", async (req, res) => {
    try {
        const data = await Promotional.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/Promotional/delete/:id", async (req, res) => {
    try {
        const data = await Promotional.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;