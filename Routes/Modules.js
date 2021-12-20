const express = require("express");
const router = express.Router();
const Modules = require("../Models/ModulesTable");

//Add Lead
router.post("/Modules",async(req,res) => {
     

    var data= new Modules(req.body);
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
router.put("/Modules/:id",async (req, res) => { 
    try {
        var data = await Modules.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/Modules", async (req, res) => {
    try {
        var data = await Modules.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/Modules/:id", async (req, res) => {
    try {
        const data = await Modules.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/Modules/delete/:id", async (req, res) => {
    try {
        const data = await Modules.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;