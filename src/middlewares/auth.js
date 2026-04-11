const adminAuth = ('/admin', (req, res, next) => {
    const token = 'abc';
    const isAdminAuthorized = token === 'abc';
    if (!isAdminAuthorized){
        res.status(401).send('Unauthorized request');
    }
    else {
        next();
    }
})

const userAuth = ('/admin', (req, res, next) => {
    const token = 'abc';
    const isAdminAuthorized = token === 'abc';
    if (!isAdminAuthorized){
        res.status(401).send('Unauthorized request');
    }
    else {
        next();
    }
})

module.exports = {
    adminAuth,
    userAuth
}