let express = require('express')
let router = express.Router()

let controller = require("../controllers/profile")

router.patch('/', controller.updateProfile)

router.patch('/password', controller.updatePassword)

module.exports = router