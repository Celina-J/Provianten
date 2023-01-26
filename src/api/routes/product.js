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


router.post('/a', (req, res) => {
    let productData = {
        id: req.body.id, 
        name: req.body.name,
        short_description: req.body.short_description,
        description: req.body.description,
        table_of_content: req.body.table_of_content,
        price: req.body.price,
        unit_type: req.body.unit_type,
        unit_value: req.body.unit_value
    } 

    db.query('INSERT INTO `products` SET ? ON DUPLICATE KEY UPDATE ?', [productData, productData])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

module.exports = router;