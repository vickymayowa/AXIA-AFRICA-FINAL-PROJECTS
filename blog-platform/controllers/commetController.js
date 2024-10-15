const Comment = require("../models/commetModel");
const Post = require("../models/postModel");

// Create Comment
exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({
      text,
      author: req.user.userId,
      post: post._id,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Comments for a Post
exports.getAllCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username email")
      .populate("post", "title content");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "username email")
      .populate("post", "title content");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
