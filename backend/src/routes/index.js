// routes/index.js
const express = require("express");
const userRoutes = require("./user/userRoutes");
const clientRoutes = require("./client/clientRoutes");
const reportRoutes = require("./report/reportRoutes");

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/clients", clientRoutes);
routes.use("/reports", reportRoutes);

module.exports = routes;
