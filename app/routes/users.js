const Router = require('koa-router');
const router = new Router();

// Controller
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.signup);
router.post('/signin', UsersController.signin);

module.exports = router;
