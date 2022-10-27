const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require("./routes/users");
const saucesRoutes = require("./routes/sauces");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

//Connexion à MongoDB via mongoose
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.vgioaqu.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

//Gestion du CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", usersRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
