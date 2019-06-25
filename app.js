const express = require('express');

const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');

const { buildSchema } = require('graphql'); 

const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');

const graphQlResolvers = require('./graphql/resolvers/index');

const baseMiddleware = require('./middleware/baseMiddleware');

const app = express();

app.use(bodyParser.json());


// app.get('/', (req, res, next) => {
//     res.send('Hello World');
// })

const Event = require('./models/event')
const User = require('./models/user');

app.use(baseMiddleware);

app.use(
        '/graphql',
        graphqlHttp({
            schema: graphQlSchema,
            rootValue: graphQlResolvers,
            graphiql: true
        })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-hssgu.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
                    .then(() => {
                        app.listen(3000);
                    }).catch(err =>{
                        console.log(err);
                    });

