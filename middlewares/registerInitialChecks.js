const { emailValidate, passwordValidate } = require("../utils/validate");

const registerInitialChecks = (req, res, next) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    if (
        typeof email=== 'string' &&
        typeof password === 'string' &&
        typeof confirmPassword === 'string' &&
        typeof firstName === 'string' &&
        typeof lastName === 'string' &&
        email.length > 0 &&
        password.length > 8 &&
        password === confirmPassword &&
        emailValidate(email) &&
        passwordValidate(password)
    ) 
    next();
    else 
        res.status(401).send("Initial checks failed");
};

module.exports = registerInitialChecks;