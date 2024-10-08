import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

export default router;
