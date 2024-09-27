const { User } = require("../../models");
const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "User name is required",
    "any.required": "User name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  phone: Joi.string().length(10).required().messages({
    "string.length": "Phone number must be exactly 10 digit long",
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),
  pan: Joi.string().length(10).alphanum().required().messages({
    "string.length": "PAN must be exactly 10 characters long",
    "string.alphanum": "PAN must contain only alphanumeric characters",
    "any.required": "PAN is required",
  }),
});

const validateUserData = (data) => {
  const { error } = userSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      if (!users || users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No users found",
        });
      }
      res.status(200).json({
        data: users,
        success: true,
        message: "All users fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Get a particular user by ID
  async getParticularUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        data: user,
        success: true,
        message: "User fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const { name, email, phone, pan } = req.body;

      // Validate all fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "User name is required",
        });
      }

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      if (!phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required",
        });
      }

      if (!pan) {
        return res.status(400).json({
          success: false,
          message: "PAN is required",
        });
      }

      validateUserData(req.body);

      const userData = { ...req.body };
      const user = await User.create(userData);
      res.status(201).json({
        data: user,
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error);

      if (error.name === "MongoServerError" && error.code === 11000) {
        const duplicateKey = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
        return res.status(400).json({
          success: false,
          message: `The provided ${duplicateKey} is already in use. Please use a different one.`,
        });
      }

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update an existing user by ID
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }
      const { name, email, phone, pan } = req.body;

      // Validate all fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "User name is required",
        });
      }

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      if (!phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required",
        });
      }

      if (!pan) {
        return res.status(400).json({
          success: false,
          message: "PAN is required",
        });
      }

      validateUserData(req.body);

      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        data: updatedUser,
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.name === "MongoServerError" && error.code === 11000) {
        const duplicateKey = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
        return res.status(400).json({
          success: false,
          message: `The provided ${duplicateKey} is already in use. Please use a different one.`,
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = userController;
