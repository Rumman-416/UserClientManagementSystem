const { Client } = require("../../models"); // Adjust the path as necessary
const Joi = require("joi");

// Define the Joi schema for client validation
const clientSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Client name is required",
    "any.required": "Client name is required",
  }),
  industry: Joi.string().required().messages({
    "string.empty": "Industry is required",
    "any.required": "Industry is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required",
    "any.required": "City is required",
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
  user: Joi.array().items(Joi.string()),
});

const validateClientData = (data) => {
  const { error } = clientSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const clientController = {
  // Get all clients
  async getAllClients(req, res) {
    try {
      const clients = await Client.find({});
      if (!clients || clients.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No clients found",
        });
      }
      res.status(200).json({
        data: clients,
        success: true,
        message: "All clients fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Get a particular client by ID
  async getParticularClient(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Client ID is required",
        });
      }

      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }

      res.status(200).json({
        data: client,
        success: true,
        message: "Client fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Create a new client
  async createClient(req, res) {
    try {
      const { name, industry, email, city, phone, pan, user } = req.body;

      // Validate all fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Client name is required",
        });
      }

      if (!industry) {
        return res.status(400).json({
          success: false,
          message: "Industry is required",
        });
      }

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      if (!city) {
        return res.status(400).json({
          success: false,
          message: "City is required",
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

      validateClientData(req.body);

      const clientData = { ...req.body };
      const client = await Client.create(clientData);
      res.status(201).json({
        data: client,
        success: true,
        message: "Client created successfully",
      });
    } catch (error) {
      console.error("Error creating client:", error);

      if (error.name === "MongoServerError" && error.code === 11000) {
        const duplicateKey = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
        return res.status(400).json({
          success: false,
          message: `The provided ${duplicateKey} is already in use. Please use a different one.`,
        });
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update an existing client by ID
  async updateClient(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Client ID is required",
        });
      }

      const { name, industry, email, city, phone, pan, user } = req.body;

      // Validate all fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Client name is required",
        });
      }

      if (!industry) {
        return res.status(400).json({
          success: false,
          message: "Industry is required",
        });
      }

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      if (!city) {
        return res.status(400).json({
          success: false,
          message: "City is required",
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

      validateClientData(req.body);

      const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedClient) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }

      res.status(200).json({
        data: updatedClient,
        success: true,
        message: "Client updated successfully",
      });
    } catch (error) {
      console.error("Error updating client:", error);
      if (error.name === "MongoServerError" && error.code === 11000) {
        const duplicateKey = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
        return res.status(400).json({
          success: false,
          message: `The provided ${duplicateKey} is already in use. Please use a different one.`,
        });
      }
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete a client by ID
  async deleteClient(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Client ID is required",
        });
      }

      const deletedClient = await Client.findByIdAndDelete(id);

      if (!deletedClient) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Client deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting client:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = clientController;
