const express = require('express')
const services = require('./services/UserService');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();

router.get('/users', authMiddleware, services.index)
router.get('/users/:id', services.userById)
router.post('/users', services.store)
router.put('/users/:id', services.update)
router.delete('/users/:id', services.delete)

router.post('/users/login', services.login)

router.use(authMiddleware);

module.exports = router;