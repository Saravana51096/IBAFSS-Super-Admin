const express = require("express");
const router = express.Router();
const PlanUpgrade = require("../../Models/Notifications/Add_PlanUpgradeTable");

//Add Lead
router.post("/PlanUpgrade",async(req,res) => {
     

    var data= new PlanUpgrade(req.body);
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
router.put("/PlanUpgrade/:id",async (req, res) => { 
    try {
        var data = await PlanUpgrade.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/PlanUpgrade", async (req, res) => {
    try {
        var data = await PlanUpgrade.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//get particular Lead
router.get("/PlanUpgrade/:id", async (req, res) => {
    try {
        const data = await PlanUpgrade.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/PlanUpgrade/delete/:id", async (req, res) => {
    try {
        const data = await PlanUpgrade.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;