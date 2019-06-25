const {events} = require('../helpers/eventHelper');
const User = require('../models/user');

exports.transformUser = user => {
    return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };

}
