const User = require("../models/user");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            // await User.findById(payload.user_id)
            await User.findOne({
                where : { userId : payload.id }
            })
                .then(user=> {
                    User.findAll()
                    if(user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err=> {
                    return done(null, false);
                });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}