module.exports = req => {
    if (!req.isAuth){
        throw new Error('Unauthorized');
    }
}