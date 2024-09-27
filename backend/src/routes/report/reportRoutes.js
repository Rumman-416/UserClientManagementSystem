// routes/userRoutes.js
const express = require("express");
const { reportController } = require("../../controller");

const router = express.Router();

router.get("/", reportController.getAllReports); // Get all users
router.get("/:id", reportController.getParticularReport); // Get a specific user by ID
router.post("/", reportController.createReport); // Create a new user
router.put("/:id", reportController.updateReport); // Update a user by ID
router.delete("/:id", reportController.deleteReport); // Delete a user by ID

module.exports = router;
