const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const { SECRET } = require('../config');

const userLogin = async (userCreds, res) => {
    const { email, password } = userCreds;
    const user = await User.findOne({ where: { email }});
    if(!user) {
        return res.status(404).json(
            {
                message: `Email not found. Invalid login credentials`,
                success: false,
            })
    } 
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        let token = jwt.sign(
            {
                id: user.userId,
                email: user.email,
                password: user.password
            },
            SECRET, 
            {
                expiresIn: '1 day'
            }
        );
        let result = {
            id: user.userId,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: '7 days',
        };
        return res.status(200).json(
            {
                ...result,
                message: "You are now logged in.",
                success: true,
            }
        );
    }
    else {
        return res.status(403).json(
            {
                message: `Incorrect password`,
                success: false,
            }
        );
    }
};

const userAuth = passport.authenticate("jwt", { session: false });

const serializeUser = (user) => {
    return {
        _id: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
    }
};

module.exports = {
    userLogin,
    userAuth,
    serializeUser
}