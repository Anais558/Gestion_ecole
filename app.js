const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'})


const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

app.use(express.urlencoded({ extended: true }));


app.get('/inscription-eleve', (req, res) => {
    const SELECT_CLASSES_QUERY = 'SELECT * FROM classe';
    db.query(SELECT_CLASSES_QUERY, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des classes :', err);
            res.status(500).send('Une erreur est survenue lors de la récupération des classes. Veuillez réessayer.');
        } else {
            const classes = result; // Récupérer les classes depuis le résultat de la requête
            const form = `
            <h1>Formulaire d'inscription</h1>

            <form action="/inscription" method="post">

                <h4> Informations personnelles</h4>

                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required><br>

                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required><br>

                <label for="email">Email :</label>
                <input type="email" id="email" name="email" required><br>

                <label for="genre">Genre :</label>
                <select id="genre" name="genre" required>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                </select><br>

                <label for="adresse">Adresse :</label>
                <input type="text" id="adresse" name="adresse" required><br>

                <label for="phone">Téléphone :</label>
                <input type="text" id="phone" name="phone" required><br>

                <label for="date_naissance">Date de naissance :</label>
                <input type="date" id="date_naissance" name="date_naissance" required><br>

                <label for="photo_identite">Photo d'identité :</label>
                <input type="file" id="photo_identite" name="photo_identite" accept="image/*" required><br>

                <h4>Representant legal</h4>

                <label for="representant-nom">Nom :</label>
                <input type="text" id="representant-nom" name="representant-nom" required><br>

                <label for="representant-prenom">Prénom :</label>
                <input type="text" id="representant-prenom" name="representant-prenom" required><br>

                <label for="representant-email">Email :</label>
                <input type="email" id="representant-email" name="representant-email" required><br>

                <label for="representant-profession">Profession :</label>
                <input type="text" id="representant-profession" name="representant-profession" required><br>

                <label for="phone2">Téléphone :</label>
                <input type="text" id="phone2" name="phone2" required><br>

                <h4>Informations academiques</h4>
                <label for="etablissement">Ancien etablissement :</label>
                <input type="text" id="etablissement" name="etablissement" required><br>

                <label for="classe">Classe :</label>
                <select id="classe" name="classe" required>
                        <!-- Afficher les options des classes récupérées depuis la base de données -->
                        ${classes.map(classe => `<option value="${classe.classe_id}">${classe.lib_classe}</option>`).join('')}
                </select><br>
                <label for="bulletins">Derniers Bulletins :</label>
                <input type="file" id="bulletins" name="bulletins" accept="image/*" required><br>


                <button type="submit">S'inscrire</button>
            </form>

        `;
        res.send(form);
    }
});
});


app.post('/inscription', (req, res) => {
    const formData = req.body;
    console.log('Données reçues du formulaire :', formData); // Afficher les données reçues dans la console

    const { nom, prenom, classe, bulletins} = formData;
    
    // Requête pour récupérer le libellé de la classe depuis la base de données
    const SELECT_CLASS_QUERY = `SELECT lib_classe FROM classe WHERE classe_id = ?`;

    db.query(SELECT_CLASS_QUERY, [classe], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du libellé de la classe :', err);
            res.status(500).send('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        } else {
            const libClasse = result[0].lib_classe;

            // Requête d'insertion en incluant l'identifiant de la classe et le libellé de la classe
            const INSERT_QUERY = `INSERT INTO inscription (name, first_name, classe_id, lib_classe, documents) VALUES (?, ?, ?, ?, ?)`;
            
            db.query(INSERT_QUERY, [nom, prenom, classe, libClasse, bulletins], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'enregistrement de l\'élève :', err);
                    res.status(500).send('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
                } else {
                    console.log('Élève enregistré avec succès !');
                    res.send('Inscription réussie !');
                }
            });
        }
    });
});


// Route pour récupérer les admissions en cours
app.get('/admissions-en-cours', (req, res) => {

    // Requête pour récupérer les admissions en cours depuis la base de données
    const SELECT_ADMISSIONS_QUERY = `SELECT * FROM inscription`;

    db.query(SELECT_ADMISSIONS_QUERY, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des admissions en cours :', err);
            res.status(500).send('Une erreur est survenue lors de la récupération des admissions en cours. Veuillez réessayer.');
        } else {
            console.log('Admissions en cours récupérées avec succès !');
            res.send(result);
        }
    });
});

app.post('/admin/register', (req, res) => {
    const { name, first_name, email, status, password } = req.body;
    console.log('Données reçues du formulaire :', req.body); // Afficher les données reçues dans la console

    // Requête SQL pour insérer les informations de l'administrateur dans la table "administrators"
    const INSERT_ADMIN_QUERY = 'INSERT INTO admin (name, first_name, email, status, password) VALUES (?, ?, ?, ?, ?)';
    
    // Exécution de la requête SQL avec les valeurs fournies
    db.query(INSERT_ADMIN_QUERY, [name, first_name, email, status, password], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'inscription de l\'administrateur :', err);
            res.status(500).send('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        } else {
            console.log('Inscription réussie pour', name);
            res.send('Inscription réussie pour ' + name);
        }
    });
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});