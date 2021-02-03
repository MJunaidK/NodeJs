const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

exports.signup = async(req, res, next) => {
    try{
        const errors = validationResult(req);
        if(errors.errors.length > 0){
            const error = new Error('Validation failed, entered data is incorrect');
            error.status = 422;
            error.data = errors.array();
            throw error;        
        }

        const email = req.body.email;
        const name = req.body.name;    
        const password = req.body.password;
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({
                    email: email,
                    password: hashedPw,
                    name: name
        });
        const result= user.save();
        res.status(201).json({ message: 'User created!', userId: result._id});
    }catch(err){    
      if(!err.statusCode){
        err.statusCode = 500;
      }
     next(err);
   };
};


/*exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.errors.length > 0){
        const error = new Error('Validation failed, entered data is incorrect');
        error.status = 422;
        error.data = errors.array();
        throw error;        
    }

    const email = req.body.email;
    const name = req.body.name;    
    const password = req.body.password;
    bcrypt.hash(password, 12).then(
        hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                name: name
            });
            return user.save();
        })
        .then( result => {
            res.status(201).json({ message: 'User created!', userId: result._id})
        })
        .catch( err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}; */

exports.login = async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try{
        const user = await User.findOne({ email: email})
            if(!user){
                    const error = new Error('Validation failed, entered data is incorrect');
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
            }
            loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password)
            if(!isEqual){
                const error = new Error('Validation failed, entered data is incorrect');
                error.status = 422;
                error.data = errors.array();
                throw error;
            }
        const token = jwt.sign(
                    {
                        email: loadedUser.email,
                        userId: loadedUser._id.toString()
                    },
                    'somesupersecretsecret',
                    { expiresIn: '1h'}
        );
            res.status(200).json({ token: token, userId: loadedUser._id.toString()});
    }catch( err){
        if(!err.statusCode){
                err.statusCode = 500;
        }
        next(err);
    };
}

/* exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email})
        .then(user => {
            if(!user){
                const error = new Error('Validation failed, entered data is incorrect');
                error.status = 422;
                error.data = errors.array();
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Validation failed, entered data is incorrect');
                error.status = 422;
                error.data = errors.array();
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecretsecret',
                { expiresIn: '1h'}
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString()});
        })
        .catch( err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

} */

