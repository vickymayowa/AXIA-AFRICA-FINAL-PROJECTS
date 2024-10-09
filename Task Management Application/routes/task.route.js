const express = require("express");
const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");
const protect = require("../middlewares/authMiddleware");

router.route("/tasks").post(protect, createTask).get(protect, getTasks);

module.exports = router;
