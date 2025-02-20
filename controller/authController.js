const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const register = async (req, res, next) => {
    const body = req.body;

    const newUser = await user.create({
        username: body.username,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword
    });

    if (!newUser){
        return next(new Error("Failed to create user"))
    }

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id,
    })

    return res.status(201).json({
        status:'Success',
        data:result
    })
};

const login = async (req, res, next) =>{
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new Error('Please provide email and password'));
    }

    const result = await user.findOne({ where: { email } });
    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new Error('Incorrect email or password'));
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: 'success',
        token,
    });
};


module.exports = {register, login}