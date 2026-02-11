const Project = require("../models/Project");
const logger = require("../utils/logger");

// Create project
exports.createProject = async (data) => {
  try {
    logger.info("Service: Creating project", { data });

    const project = new Project(data);
    const savedProject = await project.save();

    logger.info("Service: Project created", {
      id: savedProject._id,
      userId: savedProject.user_id
    });

    return savedProject;
  } catch (err) {
    logger.error("Service: Create project failed", err);
    throw err;
  }
};

// Get all projects for user
exports.getAllProjects = async (userId) => {
  try {
    logger.info("Service: Fetching projects", { userId });

    const projects = await Project.find({ user_id: userId })
      .sort({ createdAt: -1 });

    logger.info("Service: Projects fetched", {
      userId,
      count: projects.length
    });

    return projects;
  } catch (err) {
    logger.error("Service: Get all projects failed", err);
    throw err;
  }
};

// Get project by id (user scoped)
exports.getProjectById = async (id, userId) => {
  try {
    logger.info("Service: Fetching project by id", { id, userId });

    const project = await Project.findOne({
      _id: id,
      user_id: userId
    });

    if (!project) {
      logger.warn("Service: Project not found", { id, userId });
    }

    return project;
  } catch (err) {
    logger.error("Service: Get project by id failed", err);
    throw err;
  }
};

// Update project (user scoped)
exports.updateProject = async (id, data, userId) => {
  try {
    logger.info("Service: Updating project", { id, userId, data });

    const project = await Project.findOneAndUpdate(
      { _id: id, user_id: userId },
      data,
      { new: true, runValidators: true }
    );

    if (!project) {
      logger.warn("Service: Project not found for update", {
        id,
        userId
      });
    } else {
      logger.info("Service: Project updated", { id, userId });
    }

    return project;
  } catch (err) {
    logger.error("Service: Update project failed", err);
    throw err;
  }
};

// Delete project (user scoped)
exports.deleteProject = async (id, userId) => {
  try {
    logger.info("Service: Deleting project", { id, userId });

    const project = await Project.findOneAndDelete({
      _id: id,
      user_id: userId
    });

    if (!project) {
      logger.warn("Service: Project not found for delete", {
        id,
        userId
      });
    } else {
      logger.info("Service: Project deleted", { id, userId });
    }

    return project;
  } catch (err) {
    logger.error("Service: Delete project failed", err);
    throw err;
  }
};
