const POST=require('../models/post')


exports.getPosts=(req,res)=>{
    const posts=POST.find()
    .select("_id body title")
    .then((post)=>{
        res.json({
            posts:post
        })
    })
    .catch(err=>console.log(err))


}    


exports.createPost=(req,res)=>{
    const post=new POST(req.body)

    post.save((err,result)=>{
        if(err){
            return res.sendStatus(400).json({
                error:err
            })
        }
        res.json({
            post:result
        })
    })
}





