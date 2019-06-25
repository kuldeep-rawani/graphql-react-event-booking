const Event = require('../../models/event');
const User = require('../../models/user');
const {transformEvent} = require('../../transformer/eventTransformer');
const authentication = require('../../middleware/authentication');

module.exports = {
    events: (args, req) => {
        authentication(req);
        return Event.find().populate('creator')
            .then(events => {
                return events.map(event => {
                    return transformEvent(event);
                });  
            }).catch(err => {
                console.log(err);
                throw err;
            })
    },
    createEvent: (args, req) => {
        authentication(req);
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;
        return event.save().then(result => {
            createdEvent = transformEvent(result);
            return User.findById(req.userId)
        }).then(user => {
            user.createdEvents.push(event);
            user.save();
        })
        .then(result =>{
            return createdEvent;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

}
