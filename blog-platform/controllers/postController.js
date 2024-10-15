const Post = require('../models/postModel');

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({
    title,
    content,
    author: req.user._id,
  });
  res.status(201).json(post);
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username');
  res.json(posts);
};

// Update a post
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() === req.user._id || req.user.role === 'admin') {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.author.toString() === req.user._id || req.user.role === 'admin') {
    await post.remove();
    res.status(200).json({ message: 'Post removed' });
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};
