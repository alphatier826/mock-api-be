const projectService = require("../services/projectService");
const logger = require("../utils/logger");

// Create project
exports.createProject = async (req, res) => {
  try {
    logger.info("Creating project", { body: req.body });

    const project = await projectService.createProject(req.body);
    res.status(201).json(project);

    logger.info("Project created", { id: project._id });
  } catch (err) {
    logger.error("Create project failed", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    logger.info("Fetching all projects");

    const projects = await projectService.getAllProjects();
    res.json(projects);

    logger.info(`Fetched ${projects.length} projects`);
  } catch (err) {
    logger.error("Fetch projects failed", err);
    res.status(500).json({ message: err.message });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Fetching project by id", { id });

    const project = await projectService.getProjectById(id);

    if (!project) {
      logger.warn("Project not found", { id });
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
    logger.info("Updating project", { id, body: req.body });

    const project = await projectService.updateProject(id, req.body);

    if (!project) {
      logger.warn("Project not found for update", { id });
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
    logger.info("Project updated", { id });
  } catch (err) {
    logger.error("Update project failed", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Deleting project", { id });

    const project = await projectService.deleteProject(id);

    if (!project) {
      logger.warn("Project not found for delete", { id });
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
    logger.info("Project deleted", { id });
  } catch (err) {
    logger.error("Delete project failed", err);
    res.status(500).json({ message: err.message });
  }
};
