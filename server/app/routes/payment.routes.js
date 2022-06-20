const paymentController = require("../controllers/payment.controller");

module.exports = (app) => {
    app.post("/api/checkout/payment", paymentController);
}