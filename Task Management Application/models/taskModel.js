const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    default: "Incomplete",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
  },
});

module.exports = mongoose.model("Task", taskSchema);
