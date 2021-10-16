const User = require("../models/user");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const alreadyExists = await User.findOne({ where: { email }});
        if(alreadyExists) {
            res.status(401).send("Email already exists");
        }
        else {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User(
                { 
                    email: email.toLowerCase(), 
                    password: hash,
                    firstName: firstName,
                    lastName: lastName
                });
            const saveNewUser = await newUser.save();
            console.log(saveNewUser);
            res.status(201).send("User successfully signed up");
        }
    } catch(err) {
        res.status(500).json(
            { 
                Error: `Something went wrong`, 
                message: err,
            });
    }
}

module.exports = register;