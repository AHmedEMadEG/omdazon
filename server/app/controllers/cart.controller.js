const Cart = require("../models/cart.model");

// CREATE CART
exports.createCart = (req,res) => {
    var cart = new Cart();
    cart.userId = req.body.userId;
    cart.save()
    .then(() => {
        res.status(200).send(cart);
    })
    .catch(err => {
        res.status(500).send({msg:err});
        console.log(err);
    });
}

// UPDATE CART
exports.updateCart = (req,res) => {
    Cart.findOneAndUpdate({userId:req.params.id}, {$set: req.body}, {new: true, useFindAndModify: true}, (err,cart) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        !cart && res.status(404).send({msg: "cart NOT found"});

        cart && res.status(200).send(cart);
    });
}

// DELETE CART
exports.deleteCart = (req,res) => {
    Cart.findByIdAndDelete(req.params.id, (err,cart) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }

        !cart && res.status(404).send({msg: "cart NOT found"});

        cart && res.status(200).send({msg: "cart has been deleted"});
    });
}

// GET USER CART
exports.getUserCart = (req,res) => {
    Cart.findOne({userId:req.params.id}, (err,cart) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }

        !cart && res.status(404).send({msg: "cart NOT found"});

        cart && res.status(200).send(cart);
    });
}

// GET ALL CARTS
exports.getAllCarts = (req,res) => {
    Cart.find((err,carts) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(carts);
    });
}