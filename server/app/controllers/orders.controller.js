const Order = require("../models/order.model");

// ADD ORDER
exports.addOrder = (req,res) => {
    var order = new Order(req.body);

    order.save()
    .then(() => {
        res.status(200).send(order);
    })
    .catch(err => {
        res.status(500).send({msg:err});
        console.log(err);
    });
}

// UPDATE ORDER
exports.updateOrder = (req,res) => {
    Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err,order) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }

        !order && res.status(404).send({msg: "order NOT found"});

        order && res.status(200).send(order);
    });
}

// DELETE ORDER
exports.deleteOrder = (req,res) => {
    Order.findByIdAndDelete(req.params.id, (err,deletedOrder) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        !deletedOrder && res.status(404).send({msg: "order NOT found"});

        deletedOrder && res.status(200).send({msg: "order has been deleted"});   
    });
}

// GET USER ORDERS
exports.getUserOrders = (req,res) => {
    Order.find({userId: req.params.id}, (err,orders) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(orders);
    });
}

// GET ALL orderS
exports.getAllOrders = (req,res) => {
    Order.find((err,orders) => {
        if(err){
            res.status(500).send({msg:err});
            console.log(err);
            return;
        }
        res.status(200).send(orders);
    });
}

// GET MONTHLY INCOME
exports.getMonthlyIncome = async (req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const monthBeforeLast = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const pipeline = [
            { $match: { createdAt: { $gte: monthBeforeLast}} },
            { $project:{  
                    month: { $month: "$createdAt"},
                    sales: "$amount"
                }
            },
            { $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ];
        const income = await Order.aggregate(pipeline);   
        res.status(200).send(income);
    }catch(err){
        res.status(500).send({msg:err});
        console.log(err);
    }
}