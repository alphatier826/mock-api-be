const Endpoint = require("../models/Endpoint");

// Create endpoint
exports.createEndpoint = async (data) => {
  return await Endpoint.create(data);
};

// Get all endpoints
exports.getAllEndpoints = async () => {
  return await Endpoint.find().sort({ createdAt: -1 });
};

// Get endpoints by project
exports.getEndpointsByProject = async (projectId) => {
  return await Endpoint.find({ project_id: projectId }).sort({ createdAt: -1 });
};

// Get endpoint by ID
exports.getEndpointById = async (id) => {
  return await Endpoint.findById(id);
};

// Update endpoint
exports.updateEndpoint = async (id, data) => {
  return await Endpoint.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

// Delete endpoint
exports.deleteEndpoint = async (id) => {
  return await Endpoint.findByIdAndDelete(id);
};
