const {dateToString} = require('../helpers/dateHelper');
const {user} = require('../helpers/userHelper');
const {singleEvent} = require('../helpers/eventHelper');


exports.transformBooking = booking => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)

    }
}