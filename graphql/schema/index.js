const { buildSchema } = require('graphql'); 

module.exports = buildSchema(`

                            type login {
                                email: String!
                                password: String!
                            }
                            type Booking {
                                _id: ID!
                                event: Event!
                                user: User!
                                createdAt: String!
                                updatedAt: String!
                            }

                            type Event {
                                _id: ID!
                                title: String!
                                description: String!
                                price: Float!
                                date: String!
                                creator: User!
                            }
                            type User{
                                _id: ID!
                                email: String!
                                password: String
                                createdEvents: [Event!]
                            }

                            type authData {
                                email: String!
                                token: String!
                                expirationTime: Int!

                            }

                            type RootQuery {
                                login(email: String!, password: String!): authData!
                                events: [Event!]
                                users: [User!]!
                                bookings: [Booking!]!
                            }
                            type RootMutation {
                                createEvent(eventInput:EventInput): Event
                                createUser(userInput:UserInput): User
                                bookEvent(eventId:ID!): Booking!
                                cancelBooking(bookingId:ID!): Event
                            }

                            input UserInput {
                                email: String!
                                password: String!
                            }

                            input EventInput {
                                title: String!
                                description: String!
                                price: Float!
                                date: String!
                            }
                            schema {
                                query: RootQuery 
                                mutation: RootMutation
                            }
        `)