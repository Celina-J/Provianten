const firebase = require('firebase-admin');
const firebaseCred = require('../../../firebase-admin.json');

//Firebase authentication middleware 
const authentication = (req, res, next) => {

    //No cookies :(
    if (!req.headers.sessioncookie || req.headers.sessioncookie.split('session=')[1] === '')
        return res.status(401).send(JSON.stringify('UNAUTHORIZED'));


    firebase.auth().verifySessionCookie(req.headers.sessioncookie.split('session=')[1])
        .then((data) => {
            req.locals = {uid: data.uid};
            return next();
        }).catch(err => {
            console.log('Failed Cookie validation:', err);
            return res.status(401).send(JSON.stringify('UNAUTHORIZED'));
        })
}

module.exports = authentication;