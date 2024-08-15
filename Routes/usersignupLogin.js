const express = require("express");
const wrapAsync = require("../wrapAsync");
const router = express.Router({mergeParams:true});
const passport = require("passport");
const mongoose = require('mongoose');
const user = require("../Models/user");
const usercontroller = require("../Controllers/jser.js")
const postlogin = require("../postloginmiddleware.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)});

router.get("/listing/signup",wrapAsync(usercontroller.signup))
router.post("/addSignup",wrapAsync (usercontroller.addsignup))
router.get("/listing/login",usercontroller.listingloginone)

router.post("/listing/login",postlogin,
    passport.authenticate('local', {
        failureRedirect: '/listing/login',
        failureFlash: "Invalid Username or Password"
    }),
    usercontroller.listinglogintwo
);
router.get("/logout",usercontroller.logout)

module.exports = router;