let crypto = require('crypto')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

const User = require('../database/models/user')

exports.middlewareAuth = function (req, res, next) {
    if (req.headers.authorization) {
        let tokenParts = req.headers.authorization.split('.')
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64')

        if (signature === tokenParts[2])
            req.user = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf8'))
    }

    return next()
}

exports.authByEmail = async function (req, res){
    const email = req.body.email
    const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');

    User.findOne( {email: email, passwordHash: passwordHash}, function (err, user) {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Error' })
        }

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }

        let head = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'jwt' })).toString('base64')
        let body = Buffer.from(JSON.stringify(user)).toString('base64')
        let signature = crypto.createHmac('SHA256', tokenKey).update(`${head}.${body}`).digest('base64')

        return res.status(200).json({
            user: {
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isEmailVerified: user.isEmailVerified
            },
            token: `${head}.${body}.${signature}`,
        })
    })
}

exports.register = async function (req, res){
    const email = req.body.email
    const password = req.body.password
    const phoneNumber = req.body.phoneNumber
    const fullName = req.body.fullName

    // TODO email, password, etc. validation

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const newUser = new User()
    newUser.email = email
    newUser.phoneNumber = phoneNumber
    newUser.fullName = fullName
    newUser.passwordHash = passwordHash
    newUser.isEmailVerified = false

    newUser.save(function (err) {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Error' })
        }

        // TODO email verifying
        res.status(201).json(newUser)
    })
}