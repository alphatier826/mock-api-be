const express = require("express");
const router = express.Router();

const authMiddleware = require("./middlewares/authMiddleware");


const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");
const endpointController = require("./controllers/endpointController");


// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected project routes
router.post("/projects", authMiddleware, projectController.createProject);
router.get("/projects", authMiddleware, projectController.getAllProjects);
router.get("/projects/:id", authMiddleware, projectController.getProjectById);
router.put("/projects/:id", authMiddleware, projectController.updateProject);
router.delete("/projects/:id", authMiddleware, projectController.deleteProject);

// Protected endpoint routes
router.post("/endpoints", authMiddleware, endpointController.createEndpoint);
router.get("/endpoints", authMiddleware, endpointController.getAllEndpoints);
router.get("/endpoints/project/:projectId", authMiddleware, endpointController.getEndpointsByProject);
router.get("/endpoints/:id", authMiddleware, endpointController.getEndpointById);
router.put("/endpoints/:id", authMiddleware, endpointController.updateEndpoint);
router.delete("/endpoints/:id", authMiddleware, endpointController.deleteEndpoint);


module.exports = router;
