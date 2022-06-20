const  cartsController  = require("../controllers/cart.controller");
const { verifyToken, authorization } = require("../middlewares");

module.exports = (app) => {
    // CREATE CART
    app.post("/api/carts", cartsController.createCart);
    
    // UPDATE CART
    app.put('/api/carts/:id', [verifyToken, authorization], cartsController.updateCart);

    // DELETE CART
    app.delete('/api/carts/:id', [verifyToken, authorization], cartsController.deleteCart);

    // GET USER CART
    app.get('/api/carts/find/:id', [verifyToken, authorization], cartsController.getUserCart);

    // GET ALL CARTS
    app.get('/api/carts', cartsController.getAllCarts);
}
