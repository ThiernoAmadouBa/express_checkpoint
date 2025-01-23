const express = require('express');
const path = require('path');
const app = express();

// Définir le moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware personnalisé pour vérifier les heures de travail
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Autoriser l'accès
  } else {
    res.send('<h1>Le site est accessible uniquement pendant les heures de travail (Lun-Ven, 9h-17h).</h1>');
  }
};

// Appliquer le middleware à toutes les routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.render('Accueil', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
  res.render('service', { title: 'Nos Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Nous Contacter' });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
