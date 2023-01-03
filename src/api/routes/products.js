const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');

router.use('/a', auth);

router.get('/', (req, res) => {
    //Query mot databasen
    res.send('products data here');
});

router.get('/a/add', (req, res) => {
    //Query mot databasen
    res.send('products data here');
});

module.exports = router;