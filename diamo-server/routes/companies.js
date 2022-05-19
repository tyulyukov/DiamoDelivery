let express = require('express')
let router = express.Router()

let controller = require("../controllers/companies")

router.get('/', controller.get)

router.post('/', controller.post)

module.exports = router