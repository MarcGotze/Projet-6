const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Définition des routes signup & login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/", auth, multer);

module.exports = router;
