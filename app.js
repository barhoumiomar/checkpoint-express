const express = require('express');
const { url } = require('inspector');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour vérifier l'heure de travail
const workHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ...
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Autoriser l'accès
    } else {
        res.send('<h1>Application disponible uniquement pendant les heures de travail (Lundi à Vendredi, 9h-17h).</h1>');
    }
};

// Configurer le middleware global
app.use(workHoursMiddleware);

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurer le dossier statique
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
