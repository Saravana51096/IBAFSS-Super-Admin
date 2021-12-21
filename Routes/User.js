const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/UserTable");   
const Token = require("../models/TokenTable");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')
const otp = require('../Models/otpTable')


router.post('/UserAdmin/Register', async (req, res) => {
    try {
        let user = await User.findOne({ Email: req.body.Email });
        if (user) {
            return res.status(400).send('That user already exists!');
        } else {
            var insertUser = new User({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: req.body.Password,
                PhoneNumber: req.body.PhoneNumber,
                CompanyName: req.body.CompanyName,
               
            });
            const salt = await bcrypt.genSalt(10);
            insertUser.Password = await bcrypt.hash(insertUser.Password, salt);
            insertUser.save();
                    let token = await Token.findOne({ userId: insertUser._id });
                    if (!token) {
                        token = await new Token({
                            userId: insertUser._id,
                            token: crypto.randomBytes(32).toString("hex"),
                        }).save();
                    }
                    token.save(function (err) {
                        if (err) {
                            return res.status(500).send({ msg: err.message });
                        }
                        const link = `http://localhost:4000/UserAdmin/confirmation/${insertUser.Email}/${token.token}`;

                        var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.email, pass: process.env.password } });
                        var mailOptions = { from: process.env.email, to: insertUser.Email, subject: 'Account Verification Link', text: 'Hello ' + insertUser.Name + ',\n\n' + 'Please verify your account by clicking the link:' + link + '\n\nThank You!\n' };
                        
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) {
                                return res.status(500).json({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });
                            }
                            return res.status(200).json('A verification email has been sent to ' + insertUser.Email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                        });
                    });
        }
        
    } catch (err) {
        console.log(err)
    }
});

router.get('/UserAdmin/confirmation/:Email/:token', async (req, res) => {
    try {
        Token.findOne({ token: req.params.token }, function (err, token) {
            if (!token){
                return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
            }
            else{
                User.findOne({Email: req.params.Email }, function (err, user) {
                   
                    // not valid user
                    if (!user){
                        return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                    } 
                    else if (user.isVerified){
                        return res.status(200).send('User has been already verified. Please Login');
                    }
                    else{
                        user.isVerified = true;
                        user.save(function (err) {
                            if(err){
                                return res.status(500).send({msg: err.message});
                            }
                            else {
                                res.json(user)
                            }
                        });
                    }
                });
            }
            
        });
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
 })





router.post("/UserAdmin/login", async (req, res) => {
    const user = await User.findOne({ Email: req.body.Email })
    if (user.isVerified) {

        if (!user) {
            res.json({ result: "error", message: "Email Doesn't exist or Account is inactive" })
        }
        else {

            const isvalid = await bcrypt.compare(req.body.Password, user.Password);
            if (!isvalid) {
                res.json({ result: "error", message: "Password doesn't match" })
                
            }
            else {
                        
                OTP = await new otp({
                    userId: user._id,
                    otpgenerate: otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false })
                }).save();
            
                var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.email, pass: process.env.password } });
                var mailOptions = { from: process.env.email, to: user.Email, subject: 'OTP for Login', html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + OTP.otpgenerate + "</h1>" };
                    
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return res.status(500).json({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });
                    } else {
                        res.json({ message: 'Email sent successfully', data: user._id })
                    }
                });
            }
        }
    } else {
        res.send('User not verified')
    }
})

router.post('/UserAdmin/verify/:id', async (req, res) => {
    
    var data = await otp.findOne({ id: req.params._id })
    if (data) {
        if (req.body.otpgenerate == data.otpgenerate) {
            res.send("You has been successfully registered");
            await data.delete();
        }
        else {
            res.send({message:'Invalid OTP'})
        }
    } else {
        res.send({message:'Click resend button to generate a OTP Mail'})
    }
});


router.post("/UserAdmin/resetpassword", async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        if (!user)
            return res.status(400).send("email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const link = `http://localhost:4000/passwordReset/${user._id}/${token.token}`;
        await sendEmail(user.Email, "Password reset", link);
   
        res.json({ message:"password reset link successfully sent to your email account"});
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


router.post("/reset/:userId/:token", async (req, res) => {

    try {
      
        const user = await User.findById(req.params.userId);

        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        const test = await User.findByIdAndUpdate({ _id: req.params.userId }, { $set: { Password: req.body.Password } })
        const salt = await bcrypt.genSalt(10);
        test.Password = await bcrypt.hash(req.body.Password, salt);
        const isvalid = await bcrypt.compare(req.body.Password, test.Password);
        await test.save();
        await token.delete();
        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


module.exports = router;