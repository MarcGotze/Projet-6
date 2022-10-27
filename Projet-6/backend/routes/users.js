const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

//Définition des routes signup & login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
