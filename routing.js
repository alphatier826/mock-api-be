const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");


router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;
