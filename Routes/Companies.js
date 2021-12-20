const express = require("express");
const router = express.Router();
const CompaniesTable = require("../Models/CompaniesTable");
const path = require('path')
const multer = require('multer');

var Storage = multer.diskStorage({
    destination:(path.join(__dirname+'../../public/uploads')),
    filename:(req, file, cb)=>{
       cb(null,file.originalname);
    }
  });
  var upload = multer({ storage: Storage }).array('CompanyLogo',10);
//add 

router.post("/Companies", upload, async (req, res) => {

    try {
        if (req.files.length == 0) {
            var data = new CompaniesTable({
                CompanyName: req.body.CompanyName,
                CompanyEmail: req.body.CompanyEmail,
                CompanyPhone: req.body.CompanyPhone,
                Mobile: req.body.Mobile,
                CompanyWebsite: req.body.CompanyWebsite,
                CompanyGST: req.body.CompanyGST,
                CompanyPan: req.body.CompanyPan,
                CompanyType: req.body.CompanyType,
                Date: req.body.Date,
                Username: req.body.Username,
                Password: req.body.Password,
                Package: req.body.Package,
                DepositType: req.body.DepositType,
                Address1: req.body.Address1,
                Address2: req.body.Address2,
                Country: req.body.Country,
                State: req.body.State,
                City: req.body.City,
                Pincode: req.body.Pincode,
                CompanyLogo:"",
                Documents: req.body.Documents,
                LabelName: req.body.LabelName,
                Value: req.body.Value
            });
            if (req.body) {
                await data.save();
                res.json(data);
            }
        }
        else {
            if (req.files) {
                var data = new CompaniesTable({
                    CompanyName: req.body.CompanyName,
                    CompanyEmail: req.body.CompanyEmail,
                    CompanyPhone: req.body.CompanyPhone,
                    Mobile: req.body.Mobile,
                    CompanyWebsite: req.body.CompanyWebsite,
                    CompanyGST: req.body.CompanyGST,
                    CompanyPan: req.body.CompanyPan,
                    CompanyType: req.body.CompanyType,
                    Date: req.body.Date,
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Package: req.body.Package,
                    DepositType: req.body.DepositType,
                    Address1: req.body.Address1,
                    Address2: req.body.Address2,
                    Country: req.body.Country,
                    State: req.body.State,
                    City: req.body.City,
                    Pincode: req.body.Pincode,
                    CompanyLogo: req.files[0].originalname,
                    Documents: req.body.Documents,
                    LabelName: req.body.LabelName,
                    Value: req.body.Value
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
router.put("/Companies/:id",upload, async (req, res) => { 
  
try {
    if (req.files.length == 0) {
        var data = await CompaniesTable.updateMany({ _id: req.params.id }, {
            $set: {
                CompanyName: req.body.CompanyName,
                CompanyEmail: req.body.CompanyEmail,
                CompanyPhone: req.body.CompanyPhone,
                Mobile: req.body.Mobile,
                CompanyWebsite: req.body.CompanyWebsite,
                CompanyGST: req.body.CompanyGST,
                CompanyPan: req.body.CompanyPan,
                CompanyType: req.body.CompanyType,
                Date: req.body.Date,
                Username: req.body.Username,
                Password: req.body.Password,
                Package: req.body.Package,
                DepositType: req.body.DepositType,
                Address1: req.body.Address1,
                Address2: req.body.Address2,
                Country: req.body.Country,
                State: req.body.State,
                City: req.body.City,
                Pincode: req.body.Pincode,
                CompanyLogo: req.files[0].originalname,
                Documents: req.body.Documents,
                LabelName: req.body.LabelName,
                Value: req.body.Value
            }
            })
        res.json(data)
    }
    else {
        if (req.params.id && req.files) {
            var fs = require('fs');
            var data = await CompaniesTable.find({ _id: req.params.id })
            var photodelete = data[0].CompanyLogo;
            if (!photodelete) {
                console.log("Photo Delete");
            }
            else {
                fs.unlink(path.join(__dirname + `../../public/uploads/${photodelete}`), function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
                var data = await CompaniesTable.updateMany({ _id: req.params.id }, {
                    $set: {
                        CompanyName: req.body.CompanyName,
                        CompanyEmail: req.body.CompanyEmail,
                        CompanyPhone: req.body.CompanyPhone,
                        Mobile: req.body.Mobile,
                        CompanyWebsite: req.body.CompanyWebsite,
                        CompanyGST: req.body.CompanyGST,
                        CompanyPan: req.body.CompanyPan,
                        CompanyType: req.body.CompanyType,
                        Date: req.body.Date,
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Package: req.body.Package,
                        DepositType: req.body.DepositType,
                        Address1: req.body.Address1,
                        Address2: req.body.Address2,
                        Country: req.body.Country,
                        State: req.body.State,
                        City: req.body.City,
                        Pincode: req.body.Pincode,
                        Documents: req.body.Documents,
                        LabelName: req.body.LabelName,
                        Value: req.body.Value
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
router.get("/Companies", async (req, res) => {
    try {
        var data = await CompaniesTable.find({isActive:true});
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//get particular 
router.get("/Companies/:id", async (req, res) => {
    try {
        var data = await CompaniesTable.findById({_id:req.params.id })
        res.json(data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete 
router.put("/Companies/delete/:id", async (req, res) => {
    try {
        var data = await CompaniesTable.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:"false"}
        })
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

module.exports = router;