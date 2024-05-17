const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: "./.env" });

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données MySQL");
  }
});

app.use(express.urlencoded({ extended: true }));

app.post("/inscription", (req, res) => {
  const formData = req.body;
  console.log("Données reçues du formulaire :", formData); // Afficher les données reçues dans la console

  const {
    name,
    first_name,
    email,
    genre,
    adresse,
    telephone,
    date_naissance,
    phone2,
    etablissement,
    classe,
    documents,
  } = formData;

  // Requête pour récupérer le libellé de la classe et le statut de l'élève depuis la base de données
  const SELECT_DATA_QUERY = `SELECT classe.lib_classe, inscription.statut_eleve FROM classe 
    JOIN inscription ON classe.classe_id = inscription.classe_id
    WHERE classe.classe_id = ?`;

  db.query(SELECT_DATA_QUERY, [classe], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération du libellé de la classe et du statut de l'élève :",
        err
      );
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
        );
    } else if (result.length === 0) {
      console.error("Aucune classe trouvée avec l'identifiant fourni.");
      res.status(404).send("Classe non trouvée.");
    } else {
      const libClasse = result[0].lib_classe;
      const statutEleve = result[0].statut_eleve;

      // Requête d'insertion pour la table "students"
      const INSERT_STUDENT_QUERY = `INSERT INTO students (name, first_name, email, genre, adresse, telephone, date_naissance, classe_id, lib_classe, documents, statut_eleve) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        INSERT_STUDENT_QUERY,
        [
          name,
          first_name,
          email,
          genre,
          adresse,
          telephone,
          date_naissance,
          classe,
          libClasse,
          documents,
          statutEleve,
        ],
        (err, result) => {
          if (err) {
            console.error("Erreur lors de l'enregistrement de l'élève :", err);
            res
              .status(500)
              .send(
                "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
              );
          } else {
            const studentId = result.insertId; // Récupérer l'ID de l'étudiant nouvellement inséré
            console.log(
              'Élève enregistré avec succès dans la table "students"! ID:',
              studentId
            );

            // Maintenant, vous pouvez utiliser studentId pour l'insertion dans la table des inscriptions
            const INSERT_INSCRIPTION_QUERY = `INSERT INTO inscription (name, first_name, classe_id, lib_classe, documents, student_id, statut_eleve) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            db.query(
              INSERT_INSCRIPTION_QUERY,
              [
                name,
                first_name,
                classe,
                libClasse,
                documents,
                studentId,
                statutEleve,
              ],
              (err, result) => {
                if (err) {
                  console.error(
                    "Erreur lors de l'enregistrement de l'inscription :",
                    err
                  );
                  res
                    .status(500)
                    .send(
                      "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
                    );
                } else {
                  console.log(
                    'Inscription enregistrée avec succès dans la table "inscriptions"!'
                  );
                  res.send("Inscription réussie !");
                }
              }
            );
          }
        }
      );
    }
  });
});

// Route pour récupérer les admissions en cours
app.get("/admissions-en-cours", (req, res) => {
  // Requête pour récupérer les admissions en cours depuis la base de données
  const SELECT_ADMISSIONS_QUERY = `SELECT * FROM inscription`;

  db.query(SELECT_ADMISSIONS_QUERY, (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des admissions en cours :",
        err
      );
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de la récupération des admissions en cours. Veuillez réessayer."
        );
    } else {
      console.log("Admissions en cours récupérées avec succès !");
      res.send(result);
    }
  });
});

app.post("/admin/register", (req, res) => {
  const { name, first_name, email, status, password } = req.body;
  console.log("Données reçues du formulaire :", req.body); // Afficher les données reçues dans la console

  // Requête SQL pour insérer les informations de l'administrateur dans la table "administrators"
  const INSERT_ADMIN_QUERY =
    "INSERT INTO admin (name, first_name, email, status, password) VALUES (?, ?, ?, ?, ?)";

  // Exécution de la requête SQL avec les valeurs fournies
  db.query(
    INSERT_ADMIN_QUERY,
    [name, first_name, email, status, password],
    (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'inscription de l'administrateur :",
          err
        );
        res
          .status(500)
          .send(
            "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
          );
      } else {
        console.log("Inscription réussie pour", name);
        res.send("Inscription réussie pour " + name);
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
