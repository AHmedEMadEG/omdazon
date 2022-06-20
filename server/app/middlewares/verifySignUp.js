const User = require('../models/user.model')

checkForUsernameAndEmail = (req, res, next) => {
    var query = {$or: [{email: req.body.email},{username: req.body.username}]}
        User.findOne(query, (err,_user) => {
            if(err){
                console.log(err)
                res.status(500).send({msg: err})
                return
            }
            if(_user){
                if(_user.email === req.body.email){
                    res.status(400).send({msg: "this email is already in use!"})
                    return
                }
                else if(_user.username === req.body.username){
                    res.status(400).send({msg: "this username is already in use!"})
                    return
                }
            }
        next()
        }).catch(err => console.log(err))
}

module.exports = checkForUsernameAndEmail