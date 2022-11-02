//multer : gestion des requêtes HTTP avec envoi de fichiers
const multer = require("multer");

//Définition des formats de fichiers autorisés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png",
};

//Stockage des fichiers dans le répértoires images après formatage des noms
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];

    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
