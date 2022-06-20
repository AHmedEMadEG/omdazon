const stripe = require("stripe")(process.env.STRIPE_KEY);


module.exports = (req,res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, 
        (stripeErr,stripeRes) => {
            if(stripeErr){
                console.log(stripeErr);
                res.status(500).send({msg: stripeErr});
                return;
            }
            res.status(200).send(stripeRes);
        }
    );
}