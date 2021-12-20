const express = require("express");
const router = express.Router();
const PanelUser = require("../../Models/Panel_User/AddPanel_UserTable");

//Add Lead
router.post("/PanelUser",async(req,res) => {
     

    var data= new PanelUser(req.body);
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
router.put("/PanelUser/:id",async (req, res) => { 
    try {
        var data = await PanelUser.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/PanelUser", async (req, res) => {
    try {
        var data = await PanelUser.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/PanelUser/:id", async (req, res) => {
    try {
        const data = await PanelUser.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/PanelUser/delete/:id", async (req, res) => {
    try {
        const data = await PanelUser.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;