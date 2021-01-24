const express = require('express');

const feeedController = require('../controllers/feed');

const router = express.Router();

// GET /feeds/posts
router.get('/posts', feeedController.getPosts);

// POST /feeds/post
router.post('/post', feeedController.createPost);

module.exports = router;