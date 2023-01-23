const express = require('express');
const router = express.Router();
const firebase = require('firebase-admin');
const firebaseCred = require('../../../firebase-admin.json');
const DB = require('../../config/db');

const fb = firebase.initializeApp({
    credential: firebase.credential.cert(firebaseCred)
});

const db = new DB();

router.post('/', (req, res) => {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    fb.auth().createSessionCookie(req.body.token, { expiresIn: expiresIn })
        .then(sessionCookie => {
            const options = {
                maxAge: expiresIn,
                httpOnly: false,
                secure: false
            }
            

            fb.auth().verifyIdToken(req.body.token).then((token) => {
                db.query('INSERT IGNORE INTO `accounts` SET ?', [{ id: token.uid, email: token.email }])
                    .catch(err => console.log(err));

                res.cookie('session', sessionCookie, options);
                res.send(JSON.stringify({session: sessionCookie}));
            })

        }).catch(err => res.status(401).send(err));

});

module.exports = router;