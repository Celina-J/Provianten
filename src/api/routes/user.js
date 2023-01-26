const express = require('express');
const router = express.Router();
const auth = require('../middlewares/firebase-auth');
const isAdmin = require('../middlewares/isAdmin');
const DB = require('../../config/db');

//Middlewares - checking if logged in or if admin
router.use('/', auth);
router.use('/a', isAdmin);

const db = new DB();

router.get('/a/all-users', (req, res) => {
    db.query('SELECT * FROM `accounts`')
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

//Takes id from url query parameter
router.get('/user', (req, res) => {
    db.query('SELECT * FROM `accounts` WHERE id=?', [req.query.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

//Takes id from body
router.post('/a', (req, res) => {
    db.query('SELECT * FROM `accounts` WHERE id=?', [req.body.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});


router.put('/', (req, res) => {

    db.query('UPDATE `accounts` SET ? WHERE id=?', [req.body.userData, req.body.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(JSON.stringify(err))
        });
});

router.put('/a', (req, res) => {
    db.query('UPDATE `accounts` SET `is_admin`=? WHERE id=?', [req.body.is_admin, req.body.id])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

module.exports = router;