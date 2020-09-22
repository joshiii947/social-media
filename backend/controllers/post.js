const POST=require('../models/post')
let uuidv1=require('uuidv1')
const formidable=require('formidable')
const fs=require('fs')
const _=require('lodash')
const { resolveSoa } = require('dns')


exports.postById=(req,res,next,id)=>{
    POST.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({
                error:err
            })
        }

        req.post=post
        next()

    });

};

exports.getPosts=(req,res)=>{
    const posts=POST.find()
    .populate("postedBy","_id name")
    .select("_id body title")
    .then((post)=>{
        res.json({
            posts:post
        })
    })
    .catch(err=>console.log(err))
};



exports.createPost = (req, res, next) => {
    // console.log('HELLO')

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let post = new POST(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });

};



exports.postByUser=(req,res)=>{
    POST.find({postedBy:req.profile._id})
        .populate("postedBy","_id name")
        .sort("_created")
        .exec((err,posts)=>{
            if(err){
                res.status(400).json({
                    error:err
                })
            }
            res.json(posts)
        })
}

exports.isPoster=(req,res,next)=>{
    let isPoster=req.post && req.auth && req.post.postedBy._id===req.auth._id
    if(!isPoster){
        return res.status(400).json({
            error:"User is not authorized"
        })
    }
    next();

}

exports.updatePost=(req,res,next)=>{
    let post=req.post
    post=_.extend(post,req.body)
    post.updated=Date.now()
    post.save((err=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(post)
    }))
}


exports.deletePost=(req,res)=>{
    let post=req.post
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            messasge:"Deleted sucessfully"
        })
    })
}