const mongoose=require('mongoose')
const { post } = require('../routes/post')

const postSchema=new mongoose.Schema({
    title:{ type:String, required:"Title is required", minlength:4,maxlength:15},
    body:{type:String,required:"Body is required",minlength:5,maxlength:2000},


})


module.exports=mongoose.model('POST',postSchema);