const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const DB = require('../../config/db');

router.use('/a', auth);

const db = new DB();

router.get('/', (req, res) => {
    db.query('SELECT * FROM `products` WHERE id=?', [req.query.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

router.post('/a/add', (req, res) => {
    //Query mot databasen
    res.send('products data here');
});

module.exports = router;