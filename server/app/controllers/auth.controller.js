const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.signUp = (req,res) => {
    var user = new User(req.body);
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.save()
            .then((_user) => {
                const { password, ...others} = _user;
                res.status(200).send(others);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({msg: `error: ${err}`});
            })
        });
    });
}

exports.logIn = (req,res) => {
    const query = {$or: [{email:req.body.email}, {username:req.body.username}]}
    User.findOne(query, (err,_user) => {
        if(err){
            console.log(err);
            res.status(500).send({msg: err});
            return;
        }
        if(!_user){
            res.status(404).send({msg: "username or email NOT found"});
            return;
        }
        bcrypt.compare(req.body.password, _user.password, (err,isMatch)=>{
            if(err){
                console.log(err);
                res.status(500).send({msg: err});
                return;
            }
            if(isMatch){
                jwt.sign({id: _user.id, isAdmin: _user.isAdmin}, process.env.JWT_KEY, {expiresIn: "1d"}, (err,token) =>{
                    if(err){
                        res.status(500).send({msg: err});
                        return;
                    }
                    const { password, ...others} = _user._doc;
                    return res.status(200).send({
                        ...others,
                        token
                    });
                });
            }
            else{
                res.status(401).send({msg: "wrong password"});            
            }
        })
    });
}

