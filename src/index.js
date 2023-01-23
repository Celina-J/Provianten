const express = require('express');
const products = require('./api/routes/products');
const product = require('./api/routes/product');
const sessionLogin = require('./api/routes/sessionLogin');
const categories = require('./api/routes/categories');
const productsByCat = require('./api/routes/productsByCat');
const category = require('./api/routes/category');
const randomProducts = require('./api/routes/randomProducts');
const getProductsByIds = require('./api/routes/getProductsByIds');
const users = require('./api/routes/users');
const user = require('./api/routes/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

//========== Middleware ==========//

app.use(express.json());
app.use(cors({credentials: true}));
app.use(cookieParser());

//================================//

//========== Routes ==========//

app.use('/api/products', products);
app.use('/api/product', product);
app.use('/api/sessionlogin', sessionLogin);
app.use('/api/categories', categories);
app.use('/api/products-by-cat', productsByCat);
app.use('/api/category', category);
app.use('/api/randomProducts', randomProducts);
app.use('/api/get-products-by-ids', getProductsByIds);
app.use('/api/user', user);
app.use('/api/users', users);
app.use(express.static(__dirname + '/public'));

//============================//

app.listen(5000);
