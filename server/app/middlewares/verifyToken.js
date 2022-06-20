const jwt = require("jsonwebtoken");

verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        res.status(401).send({msg: "Unauthorized"});
        return;
    }
    const token = bearerHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err){
            res.status(401).send(err);
            return;
        }
        req.user = user;
        next();
    })
}

module.exports = verifyToken;