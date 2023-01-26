const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const DB = require('../../config/db');

router.use('/a', auth);

const db = new DB();

router.get('/', (req, res) => {
    db.query('SELECT * FROM `categories` WHERE id=?', [req.query.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

router.put('/a', (req, res) => {
    db.query('INSERT INTO `categories` SET ? ON DUPLICATE KEY UPDATE ?', [{id: req.body.id, name: req.body.catName}, {id: req.body.id, name: req.body.catName}])
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        }) 
            
});

module.exports = router;