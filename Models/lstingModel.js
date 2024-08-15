const mongoose = require('mongoose');
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