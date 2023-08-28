const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    // POST /REGISTER
    app.post('/api/auth/register', verifySignUp, authController.signUp);

    // POST /LOGIN
    app.post('/api/auth/login', authController.logIn);


    // GET /LINE-LOGIN
    app.get('/api/auth/lineLogin', authController.lineLogin);


    // GET /AUTH-CALLBACK
    app.get('/api/auth/lineCallback', authController.lineCallback);


    // GET /GOOGLE
    app.get('/api/auth/google', authController.google);
}