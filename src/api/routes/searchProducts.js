const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const DB = require('../../config/db');

router.use('/a', auth);

const db = new DB();

router.get('/', (req, res) => {

    db.query('SELECT * FROM `products` WHERE `name` LIKE ? LIMIT 8', [`%${req.query.searchTxt}%`])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

module.exports = router;