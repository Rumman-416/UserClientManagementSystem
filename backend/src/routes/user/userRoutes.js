// routes/userRoutes.js
const express = require("express");
const { userController } = require("../../controller");

const router = express.Router();

router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getParticularUser); // Get a specific user by ID
router.post("/", userController.createUser); // Create a new user
router.put("/:id", userController.updateUser); // Update a user by ID
router.delete("/:id", userController.deleteUser); // Delete a user by ID

module.exports = router;
