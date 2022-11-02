const express = require("express");
const router = express.Router();
const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Définition des routes sauce
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.getSauces);
router.get("/:id", auth, saucesCtrl.getThisSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, multer, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;
