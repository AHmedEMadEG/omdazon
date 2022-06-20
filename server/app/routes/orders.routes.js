const  ordersController  = require("../controllers/orders.controller");
const { verifyToken, authorization, verifyAdmin } = require("../middlewares");

module.exports = (app) => {
    // CREATE ORDER
    app.post("/api/orders", verifyToken, ordersController.addOrder);
    
    // UPDATE ORDER
    app.put('/api/orders/:id', [verifyToken, verifyAdmin], ordersController.updateOrder);

    // DELETE ORDER
    app.delete('/api/orders/:id', [verifyToken, verifyAdmin], ordersController.deleteOrder);

    // GET USER ORDERS
    app.get('/api/orders/find/:id', [verifyToken, authorization], ordersController.getUserOrders);

    // GET ALL ORDERS
    app.get('/api/orders', [verifyToken, verifyAdmin], ordersController.getAllOrders);

    // GET MONTHLY INCOME
    app.get('/api/orders/income', [verifyToken, verifyAdmin], ordersController.getMonthlyIncome);
}
