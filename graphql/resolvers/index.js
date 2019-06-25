const authResolver = require('../resolvers/auth');
const eventResolver = require('../resolvers/event');
const bookingResolver = require('../resolvers/booking');


const rootResolver  = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver

}

module.exports = rootResolver;

