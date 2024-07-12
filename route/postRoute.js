const { authentication } = require('../middlewares/auth.middleware');
const {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
} = require('../controller/postController');

const router = require('express').Router();

router
    .route('/')
    .post(authentication, createPost)
    .get(authentication, getAllPost);

router
    .route('/:id')
    .get(authentication, getPostById)
    .patch(authentication, updatePost)
    .delete(authentication, deletePost);

module.exports = router;
