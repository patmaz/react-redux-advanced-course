/**
 * Created by patrykmazurkiewicz on 15/06/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//user model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
});

//pre-saving hook
userSchema.pre('save', function (next) {
    const user = this; //instance of user model

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { next(err); }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { next(err); }

            user.password = hash;
            next();
        })

    })
});

userSchema.methods.comparePassword = function(potentialPassword, clb) {
    bcrypt.compare(potentialPassword, this.password, function (err, isMatch) {
        if (err) { clb(err); }

        clb(null, isMatch);
    })
};

//model class
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;

