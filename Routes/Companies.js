const express = require("express");
const router = express.Router();
const CompaniesTable = require("../Models/CompaniesTable");
const path = require('path')
const multer = require('multer');
const fileUpload = require('express-fileupload');


router.post("/Companies", async (req, res) => {
    try {
        //no images
    if (!req.files) {
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
        CompanyLogo: "",
        Documents: "",
        LabelName: req.body.LabelName,
        Value: req.body.Value
    });
    if (req.body) {
    await data.save();
        res.json(data);
    }
    }
    //only CompanyLogo
    else if (req.files.CompanyLogo && !req.files.Documents) {
        var CompanyLogo;
        CompanyLogo = req.files.CompanyLogo;
        CompanyLogo.mv((path.join(__dirname + `../../public/uploads/` + CompanyLogo.name)),(err) =>{
            if (err) {
                res.status(500).send(err);
            }
        });

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
        CompanyLogo: CompanyLogo.name,
        LabelName: req.body.LabelName,
        Value: req.body.Value
    });
    if (req.body) {
    await data.save();
    res.json(data);
}
        // only Documents upload
    }  else if (req.files.Documents && !req.files.CompanyLogo) {
        var Documents;
        Documents = req.files.Documents;
        Documents.mv((path.join(__dirname + `../../public/uploads/` + Documents.name)),(err) =>{
            if (err) {
                res.status(500).send(err);
            }
        });

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
        Documents: Documents.name,
        LabelName: req.body.LabelName,
        Value: req.body.Value
    });
    if (req.body) {
    await data.save();
    res.json(data);
    }
        // 2 images
    } 
    else if (req.files.CompanyLogo && req.files.Documents) {
        var CompanyLogo;
        var Documents;
        
        CompanyLogo = req.files.CompanyLogo;
        Documents = req.files.Documents;

        CompanyLogo.mv((path.join(__dirname + `../../public/uploads/` + CompanyLogo.name)),(err) =>{
            if (err) {
                res.status(500).send(err);
            }
        });
        Documents.mv((path.join(__dirname + `../../public/uploads/` + Documents.name)),(err) =>{
            if (err) {
                res.status(500).send(err);
            }
        });
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
            CompanyLogo: CompanyLogo.name,
            Documents:  Documents.name,
            LabelName: req.body.LabelName,
            Value: req.body.Value   
        });
        if (req.body) {
        await data.save();
            res.json(data);

        }
        }
    } catch (err) {
    if (err) {
    console.log(err)
    }
    }
   })
 
router.put("/Companies/:id",async (req, res) => { 
    try {
        //No files
        if (!req.files) {
            console.log('step 11111111111111')
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
                    LabelName: req.body.LabelName,
                    Value: req.body.Value
               
                }
            })
            res.json(data)
            //only companyLogo
        } else if (req.files.CompanyLogo && !req.files.Documents) {
            var CompanyLogo;
            var fs = require('fs');
            var data = await CompaniesTable.find({ _id: req.params.id })
            var photodelete = data[0].CompanyLogo[0];
            console.log('wwwwwwwwwwwww',photodelete)

            if (photodelete) {
                fs.unlink(path.join(__dirname + `../../public/uploads/${photodelete}`), function (err) {
                    if (err) throw err;
                    console.log('photodelete File deleted!');
                });
            }
            CompanyLogo = req.files.CompanyLogo;

            CompanyLogo.mv((path.join(__dirname + `../../public/uploads/` + CompanyLogo.name)),(err) =>{
                if (err) {
                    res.status(500).send(err);
                }
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
            CompanyLogo: CompanyLogo.name,
            LabelName: req.body.LabelName,
            Value: req.body.Value
                }
            })
            console.log('step 2222222222')

            res.json({ message: "companylogo updated Successfully", data })

        }
            //Only Documents
        else if (req.files.Documents && !req.files.CompanyLogo) {
            var Documents;
            var fs = require('fs');
            var data = await CompaniesTable.find({ _id: req.params.id })
            var photodelete1 = data[0].Documents[0];
            console.log('eeeeeeeee',photodelete1)

            if (photodelete1) {
                fs.unlink(path.join(__dirname + `../../public/uploads/${photodelete1}`), function (err) {
                    if (err) throw err;
                    console.log('photodelete1 File deleted!');
                });
            }
            Documents = req.files.Documents;

            Documents.mv((path.join(__dirname + `../../public/uploads/` + Documents.name)),(err) =>{
                if (err) {
                    res.status(500).send(err);
                }
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
            Documents: Documents.name,
            LabelName: req.body.LabelName,
            Value: req.body.Value
                }
            })
            console.log('step 333333333333')

            res.json({ message: "Documents updated Successfully", data })
        }
            //Both Images
        else {
            if (req.files.Documents && req.files.CompanyLogo) {
                var fs = require('fs');
                var data = await CompaniesTable.find({ _id: req.params.id })
                var photodelete = data[0].CompanyLogo[0];
                var photodelete1 = data[0].Documents[0];
                console.log('kkkkkkkkkk',photodelete)
                console.log('llllllllll',photodelete1)

                    if (photodelete) {
                        fs.unlink(path.join(__dirname + `../../public/uploads/${photodelete}`), function (err) {
                            if (err) throw err;
                            console.log('File deleted!');
                        });
                    }
                    if (photodelete1) {
                        fs.unlink(path.join(__dirname + `../../public/uploads/${photodelete1}`), function (err) {
                            if (err) throw err;
                            console.log('File deleted!');
                        });
                }
                
                var CompanyLogo;
                var Documents;
                
                CompanyLogo = req.files.CompanyLogo;
                Documents = req.files.Documents;

                CompanyLogo.mv((path.join(__dirname + `../../public/uploads/` + CompanyLogo.name)),(err) =>{
                    if (err) {
                        res.status(500).send(err);
                    }
                });
                Documents.mv((path.join(__dirname + `../../public/uploads/` + Documents.name)),(err) =>{
                    if (err) {
                        res.status(500).send(err);
                    }
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
                    CompanyLogo: CompanyLogo.name,
                    Documents: Documents.name,
                    LabelName: req.body.LabelName,
                    Value: req.body.Value


                        }
                    })
                    console.log('step 44444444444444')

                    res.json({ message: "updated Successfully", data })
                
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

router.post('/Companies/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    sampleFile = req.files.sampleFile;
    uploadPath = (path.join(__dirname + `../../public/uploads/` + sampleFile.name));
  console.log(uploadPath)
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });

router.post("/Companies/upload1", function (req, res) {
    var file;
    var sampleFile;
    if (!req.files) {
        res.send("File was not found");
        return;
    }

    file = req.files.file;
    sampleFile = req.files.sampleFile;
    if (req.files) {
        if (req.files.file) {
            uploadPath = (path.join(__dirname + `../../public/uploads/` + file.name));

            file.mv(uploadPath, function (data,err) {
                if (!err) {
                    console.log('1111111111', uploadPath)
                } else {
                    return res.status(500).send(err);
                }
            })
        } else {
            console.log('error')
        }
        if (req.files.sampleFile) {
            uploadPath2 = (path.join(__dirname + `../../public/uploads/` + sampleFile.name));

            sampleFile.mv(uploadPath2, function (data,err) {
                if (!err) {
                    console.log('2222222', uploadPath2)
                } else {
                    return res.status(500).send(err);
                }
                
            })
        } else {
            console.log('error')
        }
        res.send('files uploaded')
    }
})


module.exports = router;