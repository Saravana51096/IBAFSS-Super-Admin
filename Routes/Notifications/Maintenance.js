const express = require("express");
const router = express.Router();
const Maintenance = require("../../Models/Notifications/MaintenanceTable");

//Add Lead
router.post("/Maintenance",async(req,res) => {
     

    var data= new Maintenance(req.body);
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
router.put("/Maintenance/:id",async (req, res) => { 
    try {
        var data = await Maintenance.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/Maintenance", async (req, res) => {
    try {
        var data = await Maintenance.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/Maintenance/:id", async (req, res) => {
    try {
        const data = await Maintenance.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/Maintenance/delete/:id", async (req, res) => {
    try {
        const data = await Maintenance.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;