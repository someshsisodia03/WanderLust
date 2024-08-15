const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)});
const passportLocalMongoose = require('passport-local-mongoose');
const userSignupLogin = new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
});
userSignupLogin.plugin(passportLocalMongoose);
const user = mongoose.model("user",userSignupLogin);
module.exports = user;
