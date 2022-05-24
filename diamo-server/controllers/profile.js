let crypto = require('crypto')

const User = require('../database/models/user')

exports.updateProfile = function (req, res) {
    if (!req.user) {
        return res.status(403).json({message: 'Not Authorized'})
    }

    const newEmail = req.body.email
    const newPhoneNumber = req.body.phoneNumber
    const newFullName = req.body.fullName

    if (req.user.email === newEmail && req.user.fullName === newFullName && req.user.phoneNumber === newPhoneNumber)
        return res.status(200).json({
            message: 'Profile contact information did not change',
            user: {
                fullName: newFullName,
                email: newEmail,
                phoneNumber: newPhoneNumber,
                isEmailVerified: req.user.isEmailVerified
            }
        })

    User.findOne({email: newEmail}, function (err, user) {
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Internal Error'})
        }

        if (user)
            if (user._id != req.user._id)
                return res.status(405).send({ message: 'This email is busy' });

        User.findOne({phoneNumber: newPhoneNumber}, function (err, user) {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'Internal Error'})
            }

            if (user)
                if (user._id != req.user._id)
                    return res.status(406).send({ message: 'This phone number is incorrect' });

            if (IsNullOrWhiteSpace(newEmail) || IsNullOrWhiteSpace(newPhoneNumber) || IsNullOrWhiteSpace(newFullName)) {
                return res.status(400).json({message: 'Fields must be not empty'})
            }

            if (!ValidateEmail(newEmail)) {
                return res.status(405).send({ message: 'This email is incorrect' });
            }

            if (!ValidatePhoneNumber(newPhoneNumber)) {
                return res.status(406).send({ message: 'This phone number is incorrect' });
            }

            User.findOneAndUpdate({_id: req.user._id}, {email: newEmail, phoneNumber: newPhoneNumber, fullName: newFullName}, null, function(err) {
                if (err) {
                    console.error(err)
                    return res.status(500).json({message: 'Internal Error'})
                }

                return res.status(200).json({message: 'Profile contact information updated successfully', user: {
                        fullName: newFullName,
                        email: newEmail,
                        phoneNumber: newPhoneNumber,
                        isEmailVerified: req.user.isEmailVerified
                    }})
            })
        })
    })
}

exports.updatePassword = function (req, res) {
    if (!req.user) {
        return res.status(403).json({message: 'Not Authorized'})
    }

    const oldPassword = req.body.oldPassword
    const oldPasswordHash = crypto.createHash('sha256').update(oldPassword).digest('hex');

    if (oldPasswordHash !== req.user.passwordHash)
        return res.status(406).json({ message: 'Old password is incorrect' });

    const newPassword = req.body.newPassword

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(newPassword.match(passwordRegex) == null)
        return res.status(409).json({ message: 'New password is incorrect' });

    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    if (req.user.passwordHash === newPasswordHash)
        return res.status(200).json({
            message: 'Profile security did not change'
        })

    User.findOneAndUpdate({_id: req.user._id}, {passwordHash: newPasswordHash}, null, function(err) {
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Internal Error'})
        }

        return res.status(200).json({message: 'Profile contact information updated successfully'})
    })
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