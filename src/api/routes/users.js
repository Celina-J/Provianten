const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const isAdmin = require('../middlewares/isAdmin');
const DB = require('../../config/db');

router.use('/', auth);
router.use('/', isAdmin);

const db = new DB();

router.get('/', (req, res) => {
    db.query('SELECT * FROM `accounts`')
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

router.post('/', (req, res) => {
   
});

module.exports = router;