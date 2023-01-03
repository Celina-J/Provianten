const auth = (req, res, next) => {
    let isLoggedIn = false;
    console.log('This will go for paths with /a');
    
    if(isLoggedIn)
    next();
    else 
    res.status(401).send('Not logged in');
}

module.exports = auth;