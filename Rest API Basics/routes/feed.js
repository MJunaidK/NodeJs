const express = require('express');
const { body } = require('express-validator/check');

const feeedController = require('../controllers/feed');

const router = express.Router();

// GET /feeds/posts
router.get('/posts', feeedController.getPosts);

// POST /feeds/post
router.post('/post', [

    body('title')
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
        .isLength({min: 5}),
], feeedController.createPost);

router.put('/post/:postId',
[
    body('title')
        .trim()
        .isLength({min: 5}),
    body('content')
        .trim()
        .isLength({min: 5}),
],
    feeedController.updatePost
);

module.exports = router;