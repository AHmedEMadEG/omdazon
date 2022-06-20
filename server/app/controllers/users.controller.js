const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// GET USER
exports.getUser = (req,res) => {
    User.findById(req.params.id, (err,user) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        const { password, ...others} = user._doc;
        res.status(200).send(others);
    });
}

// GET ALL USERS
exports.getAllUsers = (req,res) => {
    const query = req.query.new;
    
    !query && User.find((err,users) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(users);
    });

    query && User.find((err,users) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(users);
    }).sort({createdAt: -1}).limit(2);
}

// UPDATE USER
exports.updateUser = (req,res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            req.body.password = hash;
        });
    });
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err,user) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        
        !user && res.status(404).send({msg: "user NOT found"});

        user && res.status(200).send(user);
    });
}

// DELETE USER
exports.deleteUser = (req,res) => {
    User.findByIdAndDelete(req.params.id, (err,user) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }

        !user && res.status(404).send({msg: "user NOT found"});

        user && res.status(200).send({msg: "User has been deleted"});
    });
}

// GET USER STATS
exports.getUserStats = async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
}
