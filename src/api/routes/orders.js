const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const isAdmin = require('../middlewares/isAdmin');
const DB = require('../../config/db');

router.use('/', auth);
router.use('/a', isAdmin);

const db = new DB();

router.get('/a', (req, res) => {
    db.query('SELECT * FROM `orders`')
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

router.put('/a', (req, res) => {
    db.query('UPDATE `orders` SET `status`=? WHERE id=?', [req.body.status, req.body.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

router.post('/', (req, res) => {
    let orderData = {
        customer_id: req.body.customer_id,
        street_address: req.body.street_address,
        city: req.body.city,
        zip: req.body.zip,
        co: req.body.co,
        total_price: req.body.total_price
    }

    db.query('INSERT INTO `orders` SET ?', [orderData])
        .then(data => {
            console.log(data.insertId);
            let products = req.body.products.map(p => {
                return {
                    product_id: p.id,
                    order_id: data.insertId,
                    product_name: p.name,
                    product_price: p.price,
                    quantity: p.qty
                }
            });

            db.query('INSERT INTO `orders_products` (product_id, order_id, product_name, product_price, quantity) VALUES ?', [products.map(p => Object.values(p))])
            .then(data => {
                return res.send(data);
            }).catch(err => {
                console.log(err);
                res.status(500).send(JSON.stringify(err))
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(JSON.stringify(err))
        });
    
});

module.exports = router;