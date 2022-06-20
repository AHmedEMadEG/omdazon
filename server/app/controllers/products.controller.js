const Product = require("../models/product.model");

// ADD PRODUCT
exports.addProduct = (req,res) => {
    var product = new Product(req.body);

    product.save()
    .then(() => {
        res.status(200).send(product);
    })
    .catch(err => {
        res.status(500).send({msg:err});
        console.log(err);
    });
}

// UPDATE PRODUCT
exports.updateProduct = (req,res) => {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err,product) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }

        !product && res.status(404).send({msg: "product NOT found"});

        product && res.status(200).send(product);
    });
}

// DELETE PRODUCT
exports.deleteProduct = (req,res) => {
    Product.findByIdAndDelete(req.params.id, (err,product) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }

        !product && res.status(404).send({msg: "product NOT found"});

        product && res.status(200).send({msg: "product has been deleted"});
    });
}

// GET PRODUCT
exports.getProduct = (req,res) => {
    Product.findById(req.params.id, (err,product) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(product);
    });
}

// GET ALL PRODUCTS
exports.getAllProducts = (req,res) => {
    const newQuery = req.query.new;
    const categoryQuery = req.query.category;

    // without any params
    !newQuery && !categoryQuery && Product.find((err,products) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(products);
    });

    // with new param
    newQuery && !categoryQuery && Product.find((err,products) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(products);
    }).sort({createdAt: -1}).limit(2);

    // with category param
    !newQuery && categoryQuery && Product.find({categories: { $in:[categoryQuery] }}, (err,products) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(products);
    });

    // with new and category param
    newQuery && categoryQuery && Product.find({categories: { $in:[categoryQuery] }}, (err,products) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(products);
    }).sort({createdAt: -1}).limit(1);
}