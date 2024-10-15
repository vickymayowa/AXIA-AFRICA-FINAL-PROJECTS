const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const passport = require("passport");
const port = process.env.PORT || 4500;
dotenv.config();

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoute"); // Import Google OAuth routes

// Connect to DB
connectDB();

const app = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
require("./config/passport"); // Passport configuration (Google strategy)
app.use(passport.initialize());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(authRoutes); // Add Google OAuth routes

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
