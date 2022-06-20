verifyAdmin = (req,res,next) => {
    if(req.user.isAdmin){
        next();
    }else{
        res.status(403).send({msg:"only admins can do that"});
    }
}

module.exports = verifyAdmin;