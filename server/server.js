const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();

// DOTENV config
const envPath = process.env.NODE_ENV || '';
require('dotenv').config({path: `${envPath}.env`});

// DB config
const dbConfig = require('./app/config/db.config');
dbConfig.connect();

// cors middleware
app.use(cors({
    origin: '*'
  }));

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


// cookie parser 
app.use(cookieParser());


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/users.routes')(app);
require('./app/routes/products.routes')(app);
require('./app/routes/cart.routes')(app);
require('./app/routes/orders.routes')(app);
require('./app/routes/payment.routes')(app);


// // for render deploying
// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });


const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));