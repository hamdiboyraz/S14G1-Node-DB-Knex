const express = require("express");
const accountsRouter = require("./accounts/accounts-router");

// Initialize express server
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// API
server.use("/api/accounts", accountsRouter);

// GLOBAL ERROR HANDLER
server.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    customMessage: "Bir hata oluştu...",
    message: err.message,
  });
});

// EXPORT
module.exports = server;
