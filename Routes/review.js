const express = require("express");
const router = express.Router({mergeParams:true});
const reviewsSchema = require("../Validations/reviewValidation.js");
const isLogged = require("../middlewares.js");

const wrapAsync = require("../wrapAsync");
const ExpressError = require("../ExpressError.js");
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)})
const reviewcontroller = require("../Controllers/review.js")
let lstData = require("../Models/lstingModel.js")
let review = require("../Models/reviewModel.js")
const reviewValid = (req,res,next)=>{
    let result = reviewsSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(401,result.error);
    }
    else next();
}

router.post("/delete/:id/review/:reviewid",isLogged,wrapAsync(reviewcontroller.destroy))

router.post("/listing/:id/review",isLogged,reviewValid,wrapAsync(reviewcontroller.add))
module.exports = router;