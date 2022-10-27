const express = require("express");
const router = express.Router();
const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Définition des routes
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.getSauces);
router.get("/:id", auth, saucesCtrl.getThisSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likesSauce);

module.exports = router;
