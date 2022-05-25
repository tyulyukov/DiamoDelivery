let crypto = require('crypto')
let nodemailer = require('nodemailer')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

const User = require('../database/models/user')
const Token = require('../database/models/token')

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

        if (!user)
            return res.status(400).json({ message: 'User Not Found' })

        if (!user.isEmailVerified)
            return res.status(406).json({ message: 'User`s Email Is Not Verified' })

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

    if (IsNullOrWhiteSpace(email) || IsNullOrWhiteSpace(password) || IsNullOrWhiteSpace(phoneNumber) || IsNullOrWhiteSpace(fullName)) {
        return res.status(400).json({message: 'Fields must be not empty'})
    }

    if (!ValidateEmail(email)) {
        return res.status(405).send({ message: 'This email is incorrect' });
    }

    if (!ValidatePhoneNumber(phoneNumber)) {
        return res.status(406).send({ message: 'This phone number is incorrect' });
    }

    User.findOne( {email: email}, function (err, user) {
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Internal Error'})
        }

        if (user) {
            return res.status(405).json({ message: 'This email is already busy' });
        }

        User.findOne( {phoneNumber: phoneNumber}, function (err, user) {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'Internal Error'})
            }

            if (user) {
                return res.status(406).json({ message: 'This phone number is already busy' });
            }

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(password.match(passwordRegex) == null)
            {
                return res.status(409).json({ message: 'Password is incorrect' });
            }

            const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

            const newUser = new User()
            newUser.email = email
            newUser.phoneNumber = phoneNumber
            newUser.fullName = fullName
            newUser.passwordHash = passwordHash
            newUser.isEmailVerified = false

            newUser.save(function (err) {
                if (err)
                    return res.status(500).json({ message: 'Internal Error' })

                let token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
                token.save(function (err) {
                    if (err)
                        return res.status(500).json({ message: 'Internal Error' });

                    let transporter = nodemailer.createTransport({
                        host: "smtp.ukr.net",
                        port: 2525,
                        secure: true,
                        auth: {
                            user: 'makstyulyukov@ukr.net',
                            pass: '4Xh4fuNlAayqSBp0',
                        },
                    });
                    let mailOptions = { from: 'makstyulyukov@ukr.net', to: newUser.email, subject: 'Подтверждение аккаунта', text: 'Здравствуйте, '+ newUser.fullName + '!\n\n' + 'Подтвердите свой аккаунт переходом по ссылке: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newUser.email + '\/' + token.token + '\n\nСпасибо!\n' };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            console.error(err)
                            return res.status(500).json({ message: 'Internal Error' });
                        }

                        return res.status(200).json('A verification email has been sent');
                    });
                });
            })
        })
    })
}

exports.confirmEmail = function (req, res) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (err)
            return res.status(500).json({ message: 'Internal Error' })

        if (!token)
            return res.status(400).json({ message: 'Your verification link may have expired. Please click on resend for verify your Email.'});

        User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
            if (err)
                return res.status(500).json({ message: 'Internal Error' });

            if (!user)
                return res.status(401).json({ message: 'We were unable to find a user for this verification. Please SignUp!' });

            if (user.isEmailVerified)
                return res.status(200).json({ message: 'User has been already verified. Please Login' });

            user.isEmailVerified = true;
            user.save(function (err) {
                if (err)
                    return res.status(500).json({ message: 'Internal Error' });

                return res.status(200).json({ message: 'Your account has been successfully verified' });
            });
        });
    });
}

exports.resendLink = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err)
            return res.status(500).json({ message: 'Internal Error' });

        if (!user)
            return res.status(400).json({ message: 'We were unable to find a user with that email. Make sure your Email is correct!'});

        if (user.isEmailVerified)
            return res.status(200).json({ message: 'This account has been already verified. Please log in.' });

        let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        token.save(function (err) {
            if (err)
                return res.status(500).json({ message: 'Internal Error' });

            let transporter = nodemailer.createTransport({
                host: "smtp.ukr.net",
                port: 2525,
                secure: true,
                auth: {
                    user: 'makstyulyukov@ukr.net',
                    pass: '4Xh4fuNlAayqSBp0',
                },
            });
            let mailOptions = { from: 'makstyulyukov@ukr.net', to: user.email, subject: 'Подтверждение аккаунта', text: 'Здравствуйте, '+ user.fullName + '!\n\n' + 'Подтвердите свой аккаунт переходом по ссылке: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nСпасибо!\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    console.error(err)
                    return res.status(500).json({ message: 'Internal Error' });
                }

                return res.status(200).json('A verification email has been sent');
            });
        });
    });
}

function IsNullOrWhiteSpace(str) {
    return str == null || str.trim() === ''
}

function ValidateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function ValidatePhoneNumber(phoneNumber) {
    return phoneNumber.match(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    );
}