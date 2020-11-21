const User = require('../models/sequelize').User
const passport = require('passport')
const localStrategy = require('passport-local').Strategy


passport.use(new localStrategy({
    usernameField: 'email'
},
    function (username, password, done) {
        User.findOne({
            where: {
                email: username
            }
        })
            .then((function (user) {
               
                // check if user exists
                if (!user) {
                    return done(null, false, {
                        message: 'El usuario no existe o la contraseña es incorrecta'
                    })
                }
                // check if password is correct
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'El usuario no existe o la contraseña es incorrecta'
                    })
                }

                // generate jwt token
                const token = user.generateJwt()
                return done(null, token)
            }))
    }
))