let lstData = require("../Models/lstingModel.js")
let review = require("../Models/reviewModel.js");
module.exports.showlisting = async (req,res)=>{
    let data = await lstData.find({}).populate({path:"owner"});
    res.locals.err = req.flash("error");
    res.locals.msg = req.flash("success");
    res.locals.msge = req.flash("update");
    res.locals.del = req.flash("delete");
    res.render("listData.ejs",{listdata:data});
}
module.exports.createlisting =(req,res)=>{    
    res.render("create.ejs");
}
module.exports.edit = async(req,res)=>{   
    let {title,description,url,price,country,location} = req.body;
    const newplace = new lstData({
        title:title,
        description:description,
        image:{
            filename:"listingimage",
            url:url
        },
        price:price,
        location:location,
        country:country,
    });
    newplace.owner = req.user._id;
    await newplace.save();
    req.flash("success","New Listing has been added!");
    res.redirect("/listing");
}
module.exports.showedit = async(req,res)=>{
    let id = req.params.id;
    const oldDetails = await lstData.findById(id).populate({path:"owner"});
    if(oldDetails.owner._id.equals(req.user._id)){
        res.render("makechange.ejs",{d:oldDetails});        
    }
    else{
        req.flash("error","You are not authenticated user");
        res.redirect("/moreabout/"+id);
    }
    }
    module.exports.update = async (req, res) => {
        let { title, description, url, price, country, location } = req.body;
        const updateFields = {
            title: title,
            description: description,
            image: {
                filename: "listingimage",
                url: url
            },
            price: price,
            location: location,
            country: country
        };
            
            await lstData.updateOne(
                { _id: req.params.id },
                { $set: updateFields }
            );
            req.flash("update","Listing has been updated!");
            res.redirect("/listing");
    };
    module.exports.destroy = async (req,res)=>{
        let id = req.params.id;
        let lst = await lstData.findById(id).populate({path:"owner"});
        if(lst.owner._id.equals(req.user._id)){
        let ids = lst.reviews;
        await review.deleteMany({_id:{$in:ids}});
        await lstData.findByIdAndDelete(id);
        req.flash("delete","Listing has been deleted!")
        res.redirect("/listing");}
        else{
            req.flash("error","You are not authorised to do so");
            res.redirect("/moreabout/"+id);
        }
    }
    module.exports.final = async(req,res)=>{
        let id = req.params.id;
        const details = await lstData.findById(id).populate({
            path: 'reviews',
            populate: { path: 'author' }
        })
        .populate('owner');;
        if(!details){
            req.flash("error","Listing Does not exist!");
            res.redirect("/listing");
        }
        res.locals.review = req.flash("reviewsuccess");
        res.locals.reviewe = req.flash("reviewdeleted");
        res.locals.err = req.flash("error");
        res.render("particular_detail.ejs",{details});
    }