const { Report } = require("../../models"); // Adjust the path as necessary
const Joi = require("joi");

// Define the Joi schema for report validation
const reportSchema = Joi.object({
  success: Joi.boolean().required().messages({
    "boolean.empty": "Success is required",
    "any.required": "Success is required",
  }),
  user: Joi.string().optional().allow(""),
  client: Joi.string().optional().allow(""),
  message: Joi.string().required().messages({
    "string.empty": "Message is required",
    "any.required": "Message is required",
  }),
});

const validateReportData = (data) => {
  const { error } = reportSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const reportController = {
  // Get all reports
  async getAllReports(req, res) {
    try {
      const reports = await Report.find({});
      if (!reports || reports.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No reports found",
        });
      }
      res.status(200).json({
        data: reports,
        success: true,
        message: "All reports fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Get a particular report by ID
  async getParticularReport(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const report = await Report.findById(id);
      if (!report) {
        return res.status(404).json({
          success: false,
          message: "Report not found",
        });
      }

      res.status(200).json({
        data: report,
        success: true,
        message: "Report fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching report by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Create a new report
  async createReport(req, res) {
    try {
      const { success, user, client, message } = req.body;

      // Validate all fields
      if (success === undefined) {
        return res.status(400).json({
          success: false,
          message: "Success is required",
        });
      }

      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Message is required",
        });
      }

      validateReportData(req.body);

      const reportData = { ...req.body };
      const report = await Report.create(reportData);
      res.status(201).json({
        data: report,
        success: true,
        message: "Report created successfully",
      });
    } catch (error) {
      console.error("Error creating report:", error);

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
  // Update an existing report by ID
  async updateReport(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const { success, user, client, message } = req.body;

      // Validate all fields
      if (success === undefined) {
        return res.status(400).json({
          success: false,
          message: "Success is required",
        });
      }

      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Message is required",
        });
      }

      validateReportData(req.body);

      const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedReport) {
        return res.status(404).json({
          success: false,
          message: "Report not found",
        });
      }

      res.status(200).json({
        data: updatedReport,
        success: true,
        message: "Report updated successfully",
      });
    } catch (error) {
      console.error("Error updating report:", error);
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
  // Delete a report by ID
  async deleteReport(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const deletedReport = await Report.findByIdAndDelete(id);

      if (!deletedReport) {
        return res.status(404).json({
          success: false,
          message: "Report not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Report deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting report:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = reportController;
