const express=require('express')

const {getPosts,createPost,postByUser, postById,isPoster,deletePost, updatePost}=require('../controllers/post')
const {createPostValidator}=require('../validators/index')
const {userById}=require('../controllers/user')

const {requireSignin}=require('../controllers/auth')

const router=express.Router()

router.get('/posts', getPosts)

router.post("/post/new/:userId",requireSignin,createPost,createPostValidator)
    

router.get("/post/by/:userId",postByUser)
router.put("/post/:postId",requireSignin,isPoster,updatePost)
router.delete("/post/:postId",requireSignin,isPoster,deletePost)



router.param("userId",userById) 

router.param("postId",postById)


module.exports=router;