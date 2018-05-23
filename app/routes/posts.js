const Router = require('koa-router');
const router = new Router();

// Load controller
const PostsController = require('../controllers/posts');

// User roles
const auth = require('../middlewares/auth');

const authOpts = {
  session: false
};

router.get('/posts/test', auth.authenticate('jwt', authOpts), PostsController.index);

router.get('/posts', PostsController.index);
router.get('/posts/:postId', PostsController.show);
router.post('/posts', auth.authenticate('jwt', authOpts), PostsController.store);
router.put('/posts/:postId', auth.authenticate('jwt', authOpts), PostsController.update);
router.delete('/posts/:postId', auth.authenticate('jwt', authOpts), PostsController.delete);

module.exports = router;
