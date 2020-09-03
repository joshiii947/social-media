exports.createPostValidator=(req,res,next)=>{
    req.check('title',"Write a titlae").notEmpty()
    req.check('title','Title must be 4 to 150 character').isLength({
        min:4,
        max:150
    });

    req.check('body',"Write a body").notEmpty()
    req.check('body','Body must be 4 to 150 character').isLength({
        min:4,
        max:2500
    });
    
    // check for errors

    const errors=req.validationErrors()

    // if erro happens
    if(errors){
        const firstError=errors.map((error)=> error.msg)[0]
        return res.status(400).json({error:firstError})
    }

    //

    next()



}