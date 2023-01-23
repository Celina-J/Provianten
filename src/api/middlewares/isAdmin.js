const DB = require('../../config/db');

const db = new DB();

const verifyAdmin = (req, res, next) => {
    if (!req.locals.uid)
        return res.status(401).send(JSON.stringify('UNAUTHORIZED'));

    db.query('SELECT id FROM `accounts` WHERE id=? AND is_admin=1', [req.locals.uid])
        .then(data => {
            if (data.length === 1)
                return next();

            return res.status(401).send(JSON.stringify('UNAUTHORIZED'));
        })
        .catch(err => res.status(500).send(JSON.stringify(err)));

}

module.exports = verifyAdmin;