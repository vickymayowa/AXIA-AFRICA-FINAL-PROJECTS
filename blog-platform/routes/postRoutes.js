const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  likePost,
  dislikePost,
} = require("../controllers/postController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createPost);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.post("/:id/like", auth, likePost);
router.post("/:id/dislike", auth, dislikePost);

module.exports = router;
