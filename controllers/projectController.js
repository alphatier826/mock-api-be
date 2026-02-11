const projectService = require("../services/projectService");
const logger = require("../utils/logger");

// Create project
exports.createProject = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.user.id
    };

    logger.info("Creating project", { userId: req.user.id, body: req.body });

    const project = await projectService.createProject(data);

    logger.info("Project created", { id: project._id, userId: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    logger.error("Create project failed", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all projects for logged-in user
exports.getAllProjects = async (req, res) => {
  try {
    logger.info("Fetching all projects", { userId: req.user.id });

    const projects = await projectService.getAllProjects(req.user.id);

    logger.info("Projects fetched", { count: projects.length });
    res.json(projects);
  } catch (err) {
    logger.error("Fetch projects failed", err);
    res.status(500).json({ message: err.message });
  }
};

// Get single project
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info("Fetching project by id", { id, userId: req.user.id });

    const project = await projectService.getProjectById(
      id,
      req.user.id
    );

    if (!project) {
      logger.warn("Project not found", { id, userId: req.user.id });
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    logger.error("Fetch project by id failed", err);
    res.status(500).json({ message: err.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info("Updating project", {
      id,
      userId: req.user.id,
      body: req.body
    });

    const project = await projectService.updateProject(
      id,
      req.body,
      req.user.id
    );

    if (!project) {
      logger.warn("Project not found for update", {
        id,
        userId: req.user.id
      });
      return res.status(404).json({ message: "Project not found" });
    }

    logger.info("Project updated", { id, userId: req.user.id });
    res.json(project);
  } catch (err) {
    logger.error("Update project failed", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info("Deleting project", { id, userId: req.user.id });

    const project = await projectService.deleteProject(
      id,
      req.user.id
    );

    if (!project) {
      logger.warn("Project not found for delete", {
        id,
        userId: req.user.id
      });
      return res.status(404).json({ message: "Project not found" });
    }

    logger.info("Project deleted", { id, userId: req.user.id });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    logger.error("Delete project failed", err);
    res.status(500).json({ message: err.message });
  }
};
