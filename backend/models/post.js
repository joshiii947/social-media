const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const postSchema=new mongoose.Schema({

    title:{ type:String, required:true, minlength:4,maxlength:15},
    body:{type:String,required:true,minlength:5,maxlength:2000},
    photo:{type:Buffer,contentType:String},
    postedBy:{type:ObjectId,ref:"USER"},
    created:{type:Date,default:Date.now}

})


module.exports=mongoose.model('POST',postSchema);