const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const DB = require('../../config/db');

router.use('/', auth);

const db = new DB();

router.get('/', (req, res) => {
    console.log(req.locals);
    db.query('SELECT * FROM `accounts` WHERE id=?', [req.query.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

router.post('/', (req, res) => {
    console.log('från post');
    db.query('UPDATE `accounts` SET ? WHERE id=?', [req.body.userData, req.body.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

module.exports = router;