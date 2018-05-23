const passport = require('koa-passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.session = false;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    user = await User.findOne({ _id: jwt_payload.id });
    done(null, user);
  } catch (err) {
    done(null, false);
  }
}));

module.exports = passport;
