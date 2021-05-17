const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/log", userController.setLog);
router.get("/", userController.getUserDetails);
router.get("/all", userController.getAllUsers);
router.delete("/log", userController.deleteLog);
router.delete("/", userController.deleteUser);
router.put("/log", userController.updateLog);

module.exports = router;