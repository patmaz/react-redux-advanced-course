/**
 * Created by patrykmazurkiewicz on 15/06/2017.
 */
const Auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const protectAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

    app.post('/signup', Auth.signup);

    app.get('/', protectAuth, function (req, res) {
       res.send('authorized');
    });

    app.post('/signin', requireSignIn, Auth.signin);

};