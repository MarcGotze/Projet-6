const jwt = require("jsonwebtoken");

//Gestion de la création d'un token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.verify(token, "RANDOM_TOKEN_GENERATOR");
    const userId = tokenDecoded.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
