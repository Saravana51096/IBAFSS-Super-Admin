const express = require("express");
const router = express.Router();
const Plans = require("../Models/PlansTable");
const path = require('path')
const multer = require('multer');

var Storage = multer.diskStorage({
    destination:(path.join(__dirname+'../../public/uploads')),
    filename:(req, file, cb)=>{
       cb(null,file.originalname);
    }
  });
  var upload = multer({ storage: Storage }).array('Documents',10);
//add 

router.post("/Plans", upload, async (req, res) => {

    try {
        if (req.files.length == 0) {
            var data = new Plans({
                PlanName: req.body.PlanName,
                Price: req.body.Price,
                Duration: req.body.Duration,
                MaximumUsers: req.body.MaximumUsers,
                MaximumCustomers: req.body.MaximumCustomers,
                MaximumVendors: req.body.MaximumVendors,
                MaximumClients: req.body.MaximumClients,
                Documents: "",
                Description: req.body.Description,
                CRM: req.body.CRM,
                Project: req.body.Project,
                HRM: req.body.HRM,
                Account: req.body.Account,
                
            });
            if (req.body) {
                await data.save();
                res.json(data);
            }
        }
        else {
            if (req.files) {
                var data = new Plans({
                PlanName: req.body.PlanName,
                Price: req.body.Price,
                Duration: req.body.Duration,
                MaximumUsers: req.body.MaximumUsers,
                MaximumCustomers: req.body.MaximumCustomers,
                MaximumVendors: req.body.MaximumVendors,
                MaximumClients: req.body.MaximumClients,
                Documents: req.files[0].originalname,
                Description: req.body.Description,
                CRM: req.body.CRM,
                Project: req.body.Project,
                HRM: req.body.HRM,
                Account: req.body.Account,
                });
                if (req.body) {
                    await data.save();
                    res.json(data);
                }
            }
        }
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//Update
router.put("/Plans/:id",upload, async (req, res) => { 
  
try {
    if (req.files.length == 0) {
        var data = await Plans.updateMany({ _id: req.params.id }, {
            $set: {
                PlanName: req.body.PlanName,
                Price: req.body.Price,
                Duration: req.body.Duration,
                MaximumUsers: req.body.MaximumUsers,
                MaximumCustomers: req.body.MaximumCustomers,
                MaximumVendors: req.body.MaximumVendors,
                MaximumClients: req.body.MaximumClients,
                Documents: req.files[0].originalname,
                Description: req.body.Description,
                CRM: req.body.CRM,
                Project: req.body.Project,
                HRM: req.body.HRM,
                Account: req.body.Account,
            }
            })
        res.json(data)
    }
    else {
        if (req.params.id && req.files) {
            var fs = require('fs');
            var data = await Plans.find({ _id: req.params.id })
            var photodelete = data[0].Documents;
            if (!photodelete) {
                console.log("Photo Delete");
            }
            else {
                fs.unlink(path.join(__dirname + `../../public/uploads/${photodelete}`), function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
                var data = await Plans.updateMany({ _id: req.params.id }, {
                    $set: {
                        PlanName: req.body.PlanName,
                        Price: req.body.Price,
                        Duration: req.body.Duration,
                        MaximumUsers: req.body.MaximumUsers,
                        MaximumCustomers: req.body.MaximumCustomers,
                        MaximumVendors: req.body.MaximumVendors,
                        MaximumClients: req.body.MaximumClients,
                        Description: req.body.Description,
                        CRM: req.body.CRM,
                        Project: req.body.Project,
                        HRM: req.body.HRM,
                        Account: req.body.Account,
                    }
                    })
                res.json({ message: "updated Successfully", data })
            }
        } else {
            console.log("not deleted")
        }
    }
}catch (err) {
if (err) {
console.log(err)
}
}
})



//List all 
router.get("/Plans", async (req, res) => {
    try {
        var data = await Plans.find({isActive:true});
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//get particular 
router.get("/Plans/:id", async (req, res) => {
    try {
        var data = await Plans.findById({_id:req.params.id })
        res.json(data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete 
router.put("/Plans/delete/:id", async (req, res) => {
    try {
        var data = await Plans.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:"false"}
        })
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

module.exports = router;