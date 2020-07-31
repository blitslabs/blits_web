const User = require('../models/sequelize').User
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-auth').Strategy

passport.use(
    new GoogleStrategy({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
        function (accessToken, refreshToken, profile, done) {
            const { email } = profile._json
            User.findOne({
                where: {
                    email,
                }
            })
                .then((function (user) {
                    // check if user exists
                    if (!user) {
                        return done(null, false, {
                            message: 'El usuario no existe'
                        })
                    }

                    // generate jwt token
                    const token = user.generateJwt()
                    return done(null, token)
                }))
        }
    )
)

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['email', 'name']
        },
        function (accessToken, refreshToken, profile, done) {
            const { email, first_name, last_name } = profile._json
            User.findOne({
                where: {
                    email,
                }
            })
                .then((function (user) {
                    // check if user exists
                    if (!user) {
                        return done(null, false, {
                            message: 'El usuario no existe'
                        })
                    }

                    // generate jwt token
                    const token = user.generateJwt()
                    return done(null, token)
                }))
        }
    )
)



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

                // check email verification
                if (user.phoneVerified === 0) {
                    // check if new verification code must be created
                    return done(null, false, {
                        message: 'Verifica tu teléfono ingresando el código que te enviaremos por SMS'
                    })
                    // send verification code


                }

                // generate jwt token
                const token = user.generateJwt()
                return done(null, token)
            }))
    }
))