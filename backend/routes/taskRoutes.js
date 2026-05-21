import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getSingleTask
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getTasks
);

router.post(
  "/",
  protect,
  roleMiddleware("Admin"),
  createTask
);

router.put(
  "/:id",
  protect,
  updateTask
);

router.delete(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  deleteTask
);

router.get(
  "/:id",
  protect,
  getSingleTask
);

export default router;