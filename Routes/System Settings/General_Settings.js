const express = require("express");
const router = express.Router();
const General_Settings = require("../../Models/System Settings/General_SettingsTable");
const path = require('path')
const multer = require('multer');
var Storage = multer.diskStorage({
    destination:(path.join(__dirname+'../../../public/uploads')),
    filename:(req, file, cb)=>{
       cb(null,file.originalname);
    }
  });
  var upload = multer({ storage: Storage }).array('CompanyLogo',10);
//add 

router.post("/General_Settings", upload, async (req, res) => {

    try {
        if (req.files.length == 0) {
            var data = new General_Settings({
                CompanyLogo: "",
                CompanyName: req.body.CompanyName,
                CompanyAddress: req.body.CompanyAddress,
                PhoneNumber: req.body.PhoneNumber,
                TitleText: req.body.TitleText,
                FooterText: req.body.FooterText,
                DefaultLanguage: req.body.DefaultLanguage,
                LandingPageDisplay: req.body.LandingPageDisplay,
                FooterLinkTitle1: req.body.FooterLinkTitle1,
                FooterLinkhref1: req.body.FooterLinkhref1,
                FooterLinkTitle2: req.body.FooterLinkTitle2,
                FooterLinkhref2: req.body.FooterLinkhref2,
                FooterLinkTitle3: req.body.FooterLinkTitle3,
                FooterLinkhref3: req.body.FooterLinkhref3,
                PusherAppId: req.body.PusherAppId,
                PusherAppKey: req.body.PusherAppKey,
                PusherAppSecret: req.body.PusherAppSecret,
                PusherAppCluster: req.body.PusherAppCluster,
                CurrencySymbol: req.body.CurrencySymbol,
                Currency: req.body.Currency
            });
            if (req.body) {
                await data.save();
                res.json(data);
            }
        }
        else {
            if (req.files) {
                var data = new General_Settings({
                    CompanyLogo: req.files[0].originalname,
                    CompanyName: req.body.CompanyName,
                    CompanyAddress: req.body.CompanyAddress,
                    PhoneNumber: req.body.PhoneNumber,
                    TitleText: req.body.TitleText,
                    FooterText: req.body.FooterText,
                    DefaultLanguage: req.body.DefaultLanguage,
                    LandingPageDisplay: req.body.LandingPageDisplay,
                    FooterLinkTitle1: req.body.FooterLinkTitle1,
                    FooterLinkhref1: req.body.FooterLinkhref1,
                    FooterLinkTitle2: req.body.FooterLinkTitle2,
                    FooterLinkhref2: req.body.FooterLinkhref2,
                    FooterLinkTitle3: req.body.FooterLinkTitle3,
                    FooterLinkhref3: req.body.FooterLinkhref3,
                    PusherAppId: req.body.PusherAppId,
                    PusherAppKey: req.body.PusherAppKey,
                    PusherAppSecret: req.body.PusherAppSecret,
                    PusherAppCluster: req.body.PusherAppCluster,
                    CurrencySymbol: req.body.CurrencySymbol,
                    Currency: req.body.Currency
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
router.put("/General_Settings/:id",upload, async (req, res) => { 
  
try {
    if (req.files.length == 0) {
        var data = await General_Settings.updateMany({ _id: req.params.id }, {
            $set: {
                    CompanyName: req.body.CompanyName,
                    CompanyAddress: req.body.CompanyAddress,
                    PhoneNumber: req.body.PhoneNumber,
                    TitleText: req.body.TitleText,
                    FooterText: req.body.FooterText,
                    DefaultLanguage: req.body.DefaultLanguage,
                    LandingPageDisplay: req.body.LandingPageDisplay,
                    FooterLinkTitle1: req.body.FooterLinkTitle1,
                    FooterLinkhref1: req.body.FooterLinkhref1,
                    FooterLinkTitle2: req.body.FooterLinkTitle2,
                    FooterLinkhref2: req.body.FooterLinkhref2,
                    FooterLinkTitle3: req.body.FooterLinkTitle3,
                    FooterLinkhref3: req.body.FooterLinkhref3,
                    PusherAppId: req.body.PusherAppId,
                    PusherAppKey: req.body.PusherAppKey,
                    PusherAppSecret: req.body.PusherAppSecret,
                    PusherAppCluster: req.body.PusherAppCluster,
                    CurrencySymbol: req.body.CurrencySymbol,
                    Currency: req.body.Currency
            }
            })
        res.json(data)
    }
    else {
        if (req.params.id && req.files) {
            var fs = require('fs');
            var data = await General_Settings.find({ _id: req.params.id })
            var photodelete = data[0].CompanyLogo;
            if (!photodelete) {
                console.log("Photo Delete");
            }
            else {
                fs.unlink(path.join(__dirname + `../../../public/uploads/${photodelete}`), function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
                var data = await General_Settings.updateMany({ _id: req.params.id }, {
                    $set: {
                        CompanyLogo: req.files[0].originalname,
                        CompanyName: req.body.CompanyName,
                        CompanyAddress: req.body.CompanyAddress,
                        PhoneNumber: req.body.PhoneNumber,
                        TitleText: req.body.TitleText,
                        FooterText: req.body.FooterText,
                        DefaultLanguage: req.body.DefaultLanguage,
                        LandingPageDisplay: req.body.LandingPageDisplay,
                        FooterLinkTitle1: req.body.FooterLinkTitle1,
                        FooterLinkhref1: req.body.FooterLinkhref1,
                        FooterLinkTitle2: req.body.FooterLinkTitle2,
                        FooterLinkhref2: req.body.FooterLinkhref2,
                        FooterLinkTitle3: req.body.FooterLinkTitle3,
                        FooterLinkhref3: req.body.FooterLinkhref3,
                        PusherAppId: req.body.PusherAppId,
                        PusherAppKey: req.body.PusherAppKey,
                        PusherAppSecret: req.body.PusherAppSecret,
                        PusherAppCluster: req.body.PusherAppCluster,
                        CurrencySymbol: req.body.CurrencySymbol,
                        Currency: req.body.Currency
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
router.get("/General_Settings", async (req, res) => {
    try {
        var data = await General_Settings.find({isActive:true});
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})


//get particular 
router.get("/General_Settings/:id", async (req, res) => {
    try {
        var data = await General_Settings.findById({_id:req.params.id })
        res.json(data)
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

//delete 
router.put("/General_Settings/delete/:id", async (req, res) => {
    try {
        var data = await General_Settings.findByIdAndUpdate({ _id: req.params.id },{ $set: {isActive:"false"}
        })
        res.json(data);
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
})

module.exports = router;