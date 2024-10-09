const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes.js");
const connectDB = require("./config/db.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const PORT = process.env.PORT || 4000;

connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my Task Management Application server!",
    status: true,
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
