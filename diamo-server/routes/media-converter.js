const express = require('express');
const router = express.Router();

const controller = require("../controllers/media-converter")

router.post('/upload', controller.uploadImage);

module.exports = router;
