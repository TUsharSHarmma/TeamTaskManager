import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  createMember,
  deleteUser
} from "../controllers/authController.js";

import {
  validateRegister
} from "../middleware/validateMiddleware.js";

import protect from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/users",
  protect,
  roleMiddleware("Admin"),
  getUsers
);

router.post(
  "/create-member",
  protect,
  roleMiddleware("Admin"),
  createMember
);

router.delete(
  "/users/:id",
  protect,
  roleMiddleware("Admin"),
  deleteUser
);

export default router;