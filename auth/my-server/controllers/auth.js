/**
 * Created by patrykmazurkiewicz on 15/06/2017.
 */
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function getToken(user) {
    const timestamp = new Date().getDate();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
    res.send({ token: getToken(req.user) });
};

exports.signup = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password ) {
        return res.status(422).json({ error: 'provide email and password' });
    }

    User.findOne({ email: email }, function (err, existingUser) {

        if (err) { next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'email in use' });
        }

        const newUser = new User({
            email: email,
            password: password,
        });

        newUser.save(function (err) {
            if (err) { return next(err); }

            res.json({ token: getToken(newUser) });
        });

    });

};