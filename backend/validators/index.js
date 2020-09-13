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


exports.userSignupValidator=(req,res,next)=>{
    req.check("name","Name is required").notEmpty();

    req.check("email","Email must be between 3 to 32 character")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:2000
    })

    req.check("password","Password is required").notEmpty();

    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 character")
    .matches(/\d/)
    .withMessage("Password must contain a number")


    const errors=req.validationErrors();

    if(errors){
        const firstError=errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError})
    }

    next();
}




