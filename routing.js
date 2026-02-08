const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");
const endpointController = require("./controllers/endpointController");



router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

router.post("/endpoints", endpointController.createEndpoint);
router.get("/endpoints", endpointController.getAllEndpoints);
router.get("/endpoints/project/:projectId", endpointController.getEndpointsByProject);
router.get("/endpoints/:id", endpointController.getEndpointById);
router.put("/endpoints/:id", endpointController.updateEndpoint);
router.delete("/endpoints/:id", endpointController.deleteEndpoint);

module.exports = router;
