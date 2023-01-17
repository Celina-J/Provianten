const firebase = require('firebase-admin');
const firebaseCred = require('../../../firebase-admin.json');


const authentication = (req, res, next) => {

    //No cookies :(
    if(!req.cookies.session)
        return res.status(401).send(JSON.stringify('UNAUTHORIZED'));

    
    firebase.auth().verifySessionCookie(req.cookies.session)
    .then(() => {
        return next();
    }).catch(err => {
        console.log('Failed Cookie validation:', err);
        return res.status(401).send(JSON.stringify('UNAUTHORIZED'));
    })
}

module.exports = authentication;