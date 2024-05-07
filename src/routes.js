const express = require('express')
const services = require('./services/UserService');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json('teste')
})

router.get('/', (req, res) => {
    return res.json('teste')
})

module.exports = router;