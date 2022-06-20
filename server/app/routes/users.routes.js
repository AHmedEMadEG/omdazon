const  usersController  = require("../controllers/users.controller");
const { verifyToken, verifyAdmin, authorization } = require("../middlewares");

module.exports = (app) => {
    // GET USER
    app.get('/api/users/find/:id', [verifyToken, verifyAdmin], usersController.getUser);

    // GET ALL USERS
    app.get('/api/users', [verifyToken, verifyAdmin], usersController.getAllUsers);

    // UPDATE USER
    app.put('/api/users/:id', [verifyToken, authorization], usersController.updateUser);

    // DELETE USER
    app.delete('/api/users/:id', [verifyToken, authorization], usersController.deleteUser);

    // GET /USER/STATS
    app.get('/api/users/stats', [verifyToken, verifyAdmin], usersController.getUserStats);

}
