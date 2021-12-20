const express = require("express");
const router = express.Router();
const Offer_Notifications = require("../../Models/Notifications/Offer_NotificationsTable");

//Add Lead
router.post("/Offer_Notifications",async(req,res) => {
     

    var data= new Offer_Notifications(req.body);
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
router.put("/Offer_Notifications/:id",async (req, res) => { 
    try {
        var data = await Offer_Notifications.updateMany({_id:req.params.id}, { $set: (req.body)})
        res.json({message : "updated Successfully", data})
    } catch {
        if (err) {
            console.log(err);
        }
    }
    
})

//List all Lead
router.get("/Offer_Notifications", async (req, res) => {
    try {
        var data = await Offer_Notifications.find({isActive:true});
        res.send(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//get particular Lead
router.get("/Offer_Notifications/:id", async (req, res) => {
    try {
        const data = await Offer_Notifications.findById({_id:req.params.id })
        res.send( data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete Lead
router.put("/Offer_Notifications/delete/:id", async (req, res) => {
    try {
        const data = await Offer_Notifications.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:false}})
        res.json({ message: "Deleted Successfully",data });
    } 
    catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

    
module.exports = router;