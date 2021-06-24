const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../secret/secret');
const Auth = require('./auth-model.js');
const {checkCredentials, checkUserExists, checkUserIsUnique} = require('./auth-middleware');


router.post('/register', checkCredentials, checkUserIsUnique,  (req,res,next) => {
    let user = req.body;

    const rounds = process.env.BRCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash

    Auth.add(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(next)
})

router.post('/login', checkCredentials, checkUserExists, (req,res,next) => {
    let {username, password} = req.body;

    Auth.findByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = makeToken(user)
                res.status(200).json({
                    user,
                    token
                })
            }else{
                res.status(401).json(`Username or Password is incorrect`)
            }
        })
        .catch(next)
})

function makeToken(user){
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: '60m'
    }
    return jwt.sign(payload,jwtSecret,options)
  }