authorization = (req,res,next) => {
    if(req.user.isAdmin || req.user.id === req.params.id){
        next();
    }else{
        res.status(401).send({msg:"you are NOT authorized!"});
    }
}

module.exports = authorization;