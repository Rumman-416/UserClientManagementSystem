// routes/userRoutes.js
const express = require("express");
const { clientController } = require("../../controller");

const router = express.Router();

router.get("/", clientController.getAllClients); // Get all users
router.get("/:id", clientController.getParticularClient); // Get a specific user by ID
router.post("/", clientController.createClient); // Create a new user
router.put("/:id", clientController.updateClient); // Update a user by ID
router.delete("/:id", clientController.deleteClient); // Delete a user by ID

module.exports = router;
