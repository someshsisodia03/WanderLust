let isLogged = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error","You must be logged-in first!");
        res.redirect("/listing/login");
    }
    else next();
}
module.exports = isLogged;