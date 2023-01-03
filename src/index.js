const express = require('express');
const products = require('./api/routes/products');


const app = express();

//========== Middleware ==========//

app.use(express.json());

//================================//

//========== Routes ==========//

app.use('/products', products);

//============================//

app.listen(3000);
