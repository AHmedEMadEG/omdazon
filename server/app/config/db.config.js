const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
        const authenticated = DB_USERNAME && DB_PASSWORD;
        const url = authenticated ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        mongoose.connect(url, options)
        .then((db) => console.log(`connected to DB...`))
        .catch(err => console.log(err));
    }
}