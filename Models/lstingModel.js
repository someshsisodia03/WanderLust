const mongoose = require('mongoose');
const { type } = require('../Validations/schemaValidation');
const { string } = require('joi');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)})
// Schema for listing ....
const userSchema = new mongoose.Schema({
    title:String,
    description:String,
    image:Object,
    price:Number,
    location:String,
    country:String,
    category:{
        type:String,
        enum:["Trending","Rooms","Iconic Cities","Mountains","Castles","Beaches","Camping","Farms","Arctic"]
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    owner:
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        }
    
});
const lstDatas = mongoose.model("lstData",userSchema);
module.exports = lstDatas;