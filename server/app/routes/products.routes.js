const  productsController  = require("../controllers/products.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");

module.exports = (app) => {
    // CREATE PRODUCT
    app.post("/api/products", [verifyToken, verifyAdmin], productsController.addProduct);
    
    // UPDATE PRODUCT
    app.put('/api/products/:id', [verifyToken, verifyAdmin], productsController.updateProduct);

    // DELETE PRODUCT
    app.delete('/api/products/:id', [verifyToken, verifyAdmin], productsController.deleteProduct);

    // GET PRODUCT
    app.get('/api/products/find/:id', productsController.getProduct);

    // GET ALL PRODUCTS
    app.get('/api/products', productsController.getAllProducts);
}
