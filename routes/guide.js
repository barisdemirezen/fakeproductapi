const express = require('express');

const guide = require('../controllers/guide');

const router = express.Router();

router.get('/', guide.homePage);

module.exports = router;
