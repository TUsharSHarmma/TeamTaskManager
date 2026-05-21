import express from "express";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getProjects
);

router.post(
  "/",
  protect,
  roleMiddleware("Admin"),
  createProject
);

router.put(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  updateProject
);

router.delete(
  "/:id",
  protect,
  roleMiddleware("Admin"),
  deleteProject
);

export default router;