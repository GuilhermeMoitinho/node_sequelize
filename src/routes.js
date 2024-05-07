const express = require('express')
const Userservices = require('./services/UserService');
const AddressService = require('./services/AddressService');
const CourseService = require('./services/CourseService');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();

router.get('/users', authMiddleware, Userservices.index)
router.get('/users/:id', Userservices.userById)
router.post('/users', Userservices.store)
router.put('/users/:id', Userservices.update)
router.delete('/users/:id', Userservices.delete)

router.post('/users/login', Userservices.login)

router.use(authMiddleware);

router.get('/users/:user_id/address', AddressService.index);
router.post('/users/:user_id/address', AddressService.store);
router.delete('/users/:id/address', AddressService.delete);
router.put('/users/:id/address', AddressService.update);

router.get('/users/:user_id/courses', CourseService.index);
router.post('/users/:user_id/courses', CourseService.store);
router.delete('/users/:user_id/courses', CourseService.delete);

module.exports = router;