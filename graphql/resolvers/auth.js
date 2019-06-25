const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: args => {
        return User.findOne({'email': args.userInput.email}).then(result => {
            if (result)
                throw new Error('User already exists');
            return bcrypt.hash(args.userInput.password, 12).then(hashedPassword => {
                const user =  new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save()
                            .then(result => {
                                return {
                                    ...result._doc
                                };
                            })
                            .catch(err =>{
                                console.log(err);
                                throw err;
                            });
            }) 
        })
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({'email': email});
        if (!user){
            throw new Error('User does not exist');
        }
        if (bcrypt.compare(password, user.password)){
            const token = jwt.sign({userId: user.id, email: user.email}, 'secret');
            return {
                userId: user.id,
                email: user.email,
                token: token,
                expirationTime: 1

            };
        }  else {
            throw new Error('Your username or password is not correct');
        }
        
    }

}