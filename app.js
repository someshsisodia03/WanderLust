if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser("secret"));
const session = require("express-session");
var flash = require('connect-flash');

const engine = require('ejs-mate');
app.engine('ejs', engine);
const path = require("path");
app.use(express.static(path.join(__dirname,"public")));
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
const ExpressError = require("./ExpressError.js");
const mongoose = require('mongoose');
let listing = require("./Routes/listing.js")
let reviewe = require("./Routes/review.js");
let signLogin = require("./Routes/usersignupLogin.js")
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)});
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require('./Models/user.js');
app.set("view engine","ejs");
app.listen(8080,()=>{
    console.log("I m listening...")
})
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req,res,next)=>{
    res.locals.curruser = req.user;
    next();
})
// app.use((req,res,next)=>{
//     res.locals.fileName = req.file;
//     next();
// })
app.use("/",listing);
app.use("/",reviewe);
app.use("/",signLogin);



app.all("*",(req,res,next)=>{    
    next(new ExpressError(404,"Page Not Found"));
})
app.use((err,req,res,next)=>{
    let {statusCode,message} = err;
    res.render("error.ejs",{message});
})


