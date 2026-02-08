const Project = require("../models/Project");
const logger = require("../utils/logger");

// Create project
exports.createProject = async (data) => {
  try {
    logger.info("Service: Creating project", { data });

    const project = new Project(data);
    const savedProject = await project.save();

    logger.info("Service: Project created", { id: savedProject._id });
    return savedProject;
  } catch (err) {
    logger.error("Service: Create project failed", err);
    throw err;
  }
};

// Get all projects
exports.getAllProjects = async () => {
  try {
    logger.info("Service: Fetching all projects");

    const projects = await Project.find().sort({ createdAt: -1 });

    logger.info("Service: Projects fetched", { count: projects.length });
    return projects;
  } catch (err) {
    logger.error("Service: Get all projects failed", err);
    throw err;
  }
};

// Get project by ID
exports.getProjectById = async (id) => {
  try {
    logger.info("Service: Fetching project by id", { id });

    const project = await Project.findById(id);

    if (!project) {
      logger.warn("Service: Project not found", { id });
    }

    return project;
  } catch (err) {
    logger.error("Service: Get project by id failed", err);
    throw err;
  }
};

// Update project
exports.updateProject = async (id, data) => {
  try {
    logger.info("Service: Updating project", { id, data });

    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!project) {
      logger.warn("Service: Project not found for update", { id });
    } else {
      logger.info("Service: Project updated", { id });
    }

    return project;
  } catch (err) {
    logger.error("Service: Update project failed", err);
    throw err;
  }
};

// Delete project
exports.deleteProject = async (id) => {
  try {
    logger.info("Service: Deleting project", { id });

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      logger.warn("Service: Project not found for delete", { id });
    } else {
      logger.info("Service: Project deleted", { id });
    }

    return project;
  } catch (err) {
    logger.error("Service: Delete project failed", err);
    throw err;
  }
};
