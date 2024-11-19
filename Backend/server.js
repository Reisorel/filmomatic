// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Charger dotenv en fonction de l'environnement
const dataFile = process.env.NODE_ENV === "production"
  ? require("./data/data-prod.js")
  : require("./data/data-dev.js");

console.log("Environnement:", process.env.NODE_ENV);
console.log("Chargement des données depuis:", dataFile);

// Utilise `dataFile` pour accéder aux données dans ton application
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Charger les données de personnages depuis le fichier de données
const peopleListData = dataFile.PEOPLE_LIST;

// Route API pour fournir la liste de personnes
app.get("/api/people", (req, res) => {
  res.json(peopleListData);
});

// Servir l'application React en production
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
