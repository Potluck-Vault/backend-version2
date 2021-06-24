const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config/secret.js');
const Auth = require('../users/users-model.js');



// checks if token is present and checks token secret against config secret.
const restrict = (req,res,next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).json("no token found")
    }else{
        jwt.verify(token, jwtSecret,(err,decoded)=>{
            if(err){
                res.status(401).json(err.message)
            }else{
                req.decodedToken = decoded
                next()
            }
        })
    }
}

// checks username and password presence
const checkCredentials = (req,res,next) => {
    const {username, password} = req.body;
    const valid = Boolean(username && password && typeof password === 'string');

    if(valid) {
        next()
    }else{
        res.status(422).json({message: `Please provide username and password`})
    }
}

// checks if username already exists in database.  sends an error if username already exists.
const checkUserIsUnique = (req,res,next) => {
    const {username} = req.body;
    Users.findByUsername(username)
        .then(user => {
            if(user){
                res.status(401).json(`username must be unique`) //check that this status code is correct
            }else{
                next()
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

// checks if username exists in database and sends an error if it doesnt
const checkUserExists = (req,res,next) => {
    const {username} = req.body;
    Users.findByUsername(username)
        .then(user => {
            if(user){
                next()
            }else{
                res.status(401).json(`user doesn't exist`)
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

module.exports = {
    restrict,
    checkCredentials,
    checkUserIsUnique,
    checkUserExists
}