const authService = require("../services/authService");
const logger = require("../utils/logger");

exports.register = async (req, res) => {
  try {
    logger.info(`Register attempt for email: ${req.body.email}`);

    const result = await authService.registerUser(req.body);

    logger.info(`User registered successfully: ${req.body.email}`);
    res.status(201).json(result);
  } catch (err) {
    logger.error(`Register failed for ${req.body.email}: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    logger.info(`Login attempt for email: ${req.body.email}`);

    const result = await authService.loginUser(req.body);

    logger.info(`Login successful for email: ${req.body.email}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(`Login failed for ${req.body.email}: ${err.message}`);
    res.status(401).json({ error: err.message });
  }
};
