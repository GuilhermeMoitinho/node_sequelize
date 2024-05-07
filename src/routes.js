const express = require('express')
const services = require('./services/UserService');

const router = express.Router();

router.get('/users', services.index)
router.post('/users', services.store)
router.put('/users/:id', services.update)

module.exports = router;