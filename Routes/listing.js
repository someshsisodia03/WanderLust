const express = require("express");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({storage})
const router = express.Router({mergeParams:true});
const listingSchema = require("../Validations/schemaValidation.js")
const wrapAsync = require("../wrapAsync");
const listData = require("../listData");
const passport = require("passport");
const isLogged = require("../middlewares.js");
const postlogin = require("../postloginmiddleware.js");
const ExpressError = require("../ExpressError.js");
const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)})
let lstData = require("../Models/lstingModel.js")
let review = require("../Models/reviewModel.js");
// const user = require('../Models/user.js');
const { signedCookie } = require("cookie-parser");
const listingController = require("../Controllers/listing.js")


//Initialise the data....

async function initialiseData(){
    await lstData.deleteMany({});
    await lstData.insertMany(listData);
}
initialiseData();

//Validation Schema....

const valid = (req,res,next)=>{
    let result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }
    else next();
}

//Show the listings...
router.get("/listing",wrapAsync(listingController.showlisting))

// Show the form for add the listing...
router.get("/addListingDetail",isLogged,wrapAsync(listingController.createlisting))

//Add the form....
router.post("/addDetail",upload.single("url"),listingController.edit)

// Show the form for update the listing...

router.get("/listing/edit/:id",isLogged,postlogin,wrapAsync(listingController.showedit))

// Update the form
router.patch("/editDetail/:id",upload.single("url"),valid,wrapAsync(listingController.update));

// Delete the listing....
router.delete("/deleteDetail/:id",isLogged,postlogin,wrapAsync(listingController.destroy))

//Particular Listing dikhayega
router.get("/moreabout/:id",wrapAsync(listingController.final));
module.exports = router;
