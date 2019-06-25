
const {dateToString} = require('../helpers/dateHelper');

exports.transformEvent = event => {
    return {
        ...event._doc,
        date: dateToString(event.date)
    }
}