const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get('/protected',passport.authenticate('jwt', { session: false }),(req, res,next) => {
    res.send({message:"hi"});
    next()
});

app.use(customMiddleware)

function customMiddleware(req, res, next) {
    next();
}

module.exports = app;