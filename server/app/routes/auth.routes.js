const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    // POST /REGISTER
    app.post('/api/auth/register', verifySignUp, authController.signUp);

    // POST /LOGIN
    app.post('/api/auth/login', authController.logIn);
}