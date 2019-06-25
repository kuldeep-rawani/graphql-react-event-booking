const User = require('../models/user');
const {transformUser} = require('../transformer/userTransformer');

exports.user  = async userId => {
    try {
        const user = await User.findById(userId);
        return transformUser(user);
    } catch(err) {
        throw err;
    }
}
