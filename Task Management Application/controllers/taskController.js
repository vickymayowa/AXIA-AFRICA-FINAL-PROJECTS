// controllers/taskController.js
const Task = require("../models/taskModel.js");
const User = require("../models/userModel.js");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, category, deadline } = req.body;
    const userId = req.user.id || 3;
    const task = new Task({
      title,
      description,
      category,
      deadline,
      userId,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, category, deadline, status } = req.body;

    const task = await Task.findOne({ _id: taskId, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.category = category;
    task.deadline = deadline;
    task.status = status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOneAndRemove({
      _id: taskId,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
