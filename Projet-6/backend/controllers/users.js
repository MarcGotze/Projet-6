const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Création d'un compte utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashPass) => {
      const user = new Users({
        email: req.body.email,
        password: hashPass,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Compte créé !" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Vérification du login
exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Identifiant et/ou mot de passe incorrect" });
      }
      //Encryption du mot de passe
      bcrypt
        .compare(req.body.password, user.password)
        .then((passFound) => {
          if (!passFound) {
            return res
              .status(401)
              .json({ message: "Identifiant et/ou mot de passe incorrect" });
          }
          //Utilisation d'un token pour que le compte reste connecté
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_GENERATOR", {
              expiresIn: "12h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.uploadImages = (req, res, next) => {
  const imageObject = JSON.parse(req.body.thing);
  delete imageObject._id;
  delete imageObject._userId;
  const user = new Users({
    ...imageObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: "Image enregistrée !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
