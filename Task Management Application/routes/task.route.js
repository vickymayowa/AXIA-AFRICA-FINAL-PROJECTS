const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const protect = require("../middlewares/authMiddleware");

router.route("/task").post(createTask).get(protect, getTasks);
router.put("/tasks/:taskId", protect, updateTask);
router.delete("/tasks/:taskId", protect, deleteTask);

module.exports = router;
