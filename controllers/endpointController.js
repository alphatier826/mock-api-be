const endpointService = require("../services/endpointService");
const logger = require("../utils/logger");

// Create endpoint
exports.createEndpoint = async (req, res) => {
  try {
    logger.info("Creating endpoint", { body: req.body });

    const endpoint = await endpointService.createEndpoint(req.body);
    res.status(201).json(endpoint);

    logger.info("Endpoint created", { id: endpoint._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Endpoint with this method and path already exists in this project"
      });
    }

    logger.error("Create endpoint failed", err);
    res.status(400).json({ message: err.message });
  }
};

exports.bulkCreate = async (req, res) => {
  try {
    logger.info("Creating bulkCreate endpoint", { body: req.body });

    const endpoint = await endpointService.bulkCreate(req.body);
    res.status(201).json(endpoint);

    logger.info("Endpoint bulkCreate created", { id: endpoint._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "bulkCreate Endpoint with this method and path already exists in this project"
      });
    }

    logger.error("Create endpoint failed", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all endpoints
exports.getAllEndpoints = async (req, res) => {
  try {
    logger.info("Fetching all endpoints");

    const endpoints = await endpointService.getAllEndpoints();
    res.json(endpoints);

    logger.info(`Fetched ${endpoints.length} endpoints`);
  } catch (err) {
    logger.error("Fetch endpoints failed", err);
    res.status(500).json({ message: err.message });
  }
};

// Get endpoints by project
exports.getEndpointsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    logger.info("Fetching endpoints by project", { projectId });

    const endpoints = await endpointService.getEndpointsByProject(projectId);
    res.json(endpoints);
  } catch (err) {
    logger.error("Fetch endpoints by project failed", err);
    res.status(500).json({ message: err.message });
  }
};

// Get endpoint by ID
exports.getEndpointById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Fetching endpoint by id", { id });

    const endpoint = await endpointService.getEndpointById(id);

    if (!endpoint) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    res.json(endpoint);
  } catch (err) {
    logger.error("Fetch endpoint by id failed", err);
    res.status(500).json({ message: err.message });
  }
};

// Update endpoint
exports.updateEndpoint = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Updating endpoint", { id, body: req.body });

    const endpoint = await endpointService.updateEndpoint(id, req.body);

    if (!endpoint) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    res.json(endpoint);
    logger.info("Endpoint updated", { id });
  } catch (err) {
    logger.error("Update endpoint failed", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete endpoint
exports.deleteEndpoint = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Deleting endpoint", { id });

    const endpoint = await endpointService.deleteEndpoint(id);

    if (!endpoint) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    res.json({ message: "Endpoint deleted successfully" });
    logger.info("Endpoint deleted", { id });
  } catch (err) {
    logger.error("Delete endpoint failed", err);
    res.status(500).json({ message: err.message });
  }
};
