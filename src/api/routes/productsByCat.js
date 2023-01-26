const express = require('express');
const router = express.Router();
const DB = require('../../config/db');

const db = new DB();

router.get('/', (req, res) => {

    let page = (req.query.page > 0) ? req.query.page : 1;
    let productsPerPage = 20;
    let pageStart = (page - 1) * productsPerPage;

    db.query('CALL get_prod_by_cat(?,?,?)', [req.query.id, pageStart, productsPerPage])
        .then(data => {
            return res.send(data);
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));
});

module.exports = router;