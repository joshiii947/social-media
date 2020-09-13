const express=require('express')

const {getPosts,createPost}=require('../controllers/post')
const {createPostValidator}=require('../validators/index')
const {userById}=require('../controllers/user')

const {requireSignin}=require('../controllers/auth')

const router=express.Router()

router.get('/', getPosts)

router.post('/post',requireSignin,createPostValidator,createPost)

router.param("userId",userById)


module.exports=router;