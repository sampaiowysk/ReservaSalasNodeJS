function verifyAuth(req, res, next) {
    if(req.headers.authorization !== "Bearer 75f481ccbe884ad38b9766f35e13d177" && req.method !== "OPTIONS") {
        res.status(401);
        res.send('Token invalido');
    }
    next();
}

module.exports = verifyAuth;