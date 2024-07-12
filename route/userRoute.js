const { authentication } = require('../middlewares/auth.middleware');
const { getAllUser } = require('../controller/userController');

const router = require('express').Router();

router.route('/').get(authentication, getAllUser);

module.exports = router;
