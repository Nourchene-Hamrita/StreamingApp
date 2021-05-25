const UserModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../Utils/errors.util');
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};
module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { login, email, password } = req.body
    try {
        const user = await UserModel.create({ login, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })

    }
};

module.exports.signIn = async (req, res) => {
    const { login, password } = req.body

    try {
        const user = await UserModel.login(login, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id, token: token })
            ;


    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).send({ errors })

    }
};
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}





/*
const newUser = new UserModel({
    login: req.body.login,
    email: req.body.email,
    password: req.body.email
});
try {
    const user = await newUser.save();
    return res.status(201).json(user);
} catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
}
};*/



















