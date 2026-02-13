const Endpoint = require("../models/Endpoint");

// Create endpoint
exports.createEndpoint = async (data) => {
  return await Endpoint.create(data);
};

exports.bulkCreate = async (endpoints) => {
    if (!Array.isArray(endpoints) || endpoints.length === 0) {
      throw new Error("Endpoints array is required");
    }
    // insertMany is efficient for bulk operations
    const createdEndpoints = await Endpoint.insertMany(endpoints, {
      ordered: true, // stops on first error
    });

    return createdEndpoints;
  }

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
