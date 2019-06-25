const Event = require('../models/event');
const {user} = require('./userHelper');
const {transformEvent} = require('../transformer/eventTransformer');

exports.events  = async eventIds => {
    const events = await Event.find({_id: {$in: eventIds}});
    return events.map(event => {
        return transformEvent(event);
    });
};

exports.singleEvent = async eventId => {
    const event = await Event.findById(eventId);
    return {
        ...event._doc,
        // creator: user.bind(this, event.creator)
    }
}
