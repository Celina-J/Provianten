const express = require('express');
const products = require('./api/routes/products');
const product = require('./api/routes/product');
const sessionLogin = require('./api/routes/sessionLogin');
const categories = require('./api/routes/categories');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

//========== Middleware ==========//

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//================================//

//========== Routes ==========//

app.use('/api/products', products);
app.use('/api/product', product);
app.use('/api/sessionlogin', sessionLogin);
app.use('/api/categories', categories);

//============================//

app.listen(5000);
