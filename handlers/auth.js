const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = function() {}

exports.signup = async function(req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let {id, username, profileImageURL} = user;
        let token = jwt.sign({
            id,
            username,
            profileImageURL
        }, 
            process.env.SECRET_KEY
        );

        return res.status(200).json({
            id, 
            username, 
            profileImageURL, 
            token
        })
    }
    catch (err) {
        if(err.code === 11000) { // Validation Failure adjustment
            err.message = 'Sorry, that Username / Email is already taken';
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}