const { ref } = require('joi');
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}
main().catch((err)=>{console.log(err)})
// Schema for review ....
const reviewSchema = new mongoose.Schema({
    comment:String,
    rating:Number,
    CreatedAt:Date,
    author:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    

});
const review = mongoose.model("review",reviewSchema);
module.exports = review;