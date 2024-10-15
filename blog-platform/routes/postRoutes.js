const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { createPost, getAllPosts, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(getAllPosts);

router.route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
