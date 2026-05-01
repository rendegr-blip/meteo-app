# 🌤️ Application Météo Moyenne - Index

## 📌 Démarrer rapidement

👉 **Nouveau?** Lisez d'abord: [`QUICKSTART.md`](QUICKSTART.md) (2 min)

---

## 📚 Documentation

### Pour les utilisateurs
| Document | Contenu |
|----------|---------|
| [`QUICKSTART.md`](QUICKSTART.md) | **Démarrage rapide** en 30 secondes |
| [`README.md`](README.md) | **Présentation complète** de l'app |
| [`INSTALLATION.md`](INSTALLATION.md) | **Installation détaillée** et dépannage |

### Pour les développeurs
| Document | Contenu |
|----------|---------|
| [`TECHNICAL.md`](TECHNICAL.md) | **Explication technique** du code |
| [`config.js`](config.js) | Configuration des APIs |

---

## 🚀 Scripts de démarrage

| Script | Fonction |
|--------|----------|
| [`Lancer.bat`](Lancer.bat) | ⭐ **Démarrage automatique** (Windows) |
| [`start-app.bat`](start-app.bat) | Alternative de démarrage |
| [`verifier-config.bat`](verifier-config.bat) | Vérifier la configuration |

---

## 🧪 Tests & Débogage

| Script | Fonction |
|--------|----------|
| [`test-api.bat`](test-api.bat) | Tester l'API (Windows) |
| [`test-api.sh`](test-api.sh) | Tester l'API (Linux/Mac) |

---

## 📁 Structure du projet

```
meteo-app/
│
├── 📚 Documentation
│   ├── README.md               # Présentation générale
│   ├── QUICKSTART.md          # Démarrage rapide
│   ├── INSTALLATION.md        # Guide installation
│   ├── TECHNICAL.md           # Explication technique
│   └── INDEX.md               # Ce fichier
│
├── ⚙️ Configuration
│   ├── package.json           # Dépendances Node.js
│   ├── config.js              # Configuration des APIs
│   └── .env.example           # Variables d'environnement
│
├── 🖥️ Backend (Node.js)
│   └── server.js              # Serveur Express (port 3001)
│
├── 🎨 Frontend (React)
│   └── src/
│       ├── App.js             # Composant principal
│       ├── App.css            # Styles CSS
│       ├── index.js           # Point d'entrée
│       └── ...
│
├── 📄 Public
│   ├── index.html             # Page HTML
│   ├── favicon.ico            # Icône
│   └── ...
│
├── 🚀 Scripts
│   ├── Lancer.bat             # Démarrage auto (Windows)
│   ├── start-app.bat          # Alternative démarrage
│   ├── verifier-config.bat    # Vérifier config
│   ├── test-api.bat           # Test API (Windows)
│   └── test-api.sh            # Test API (Linux/Mac)
│
└── 📦 Dépendances
    └── node_modules/          # Paquets npm (créé avec npm install)
```

---

## 🎯 Première utilisation

### Étape 1 : Installation
```bash
npm install
```

### Étape 2 : Démarrage
**Option A (Facile):**
```bash
Double-cliquez sur Lancer.bat
```

**Option B (Manuel):**
```bash
# Terminal 1
node server.js

# Terminal 2
npm start
```

### Étape 3 : Utiliser
Ouvrez http://localhost:3000 et cherchez une ville!

---

## 💡 Que fait l'app?

1. **Recherche** : Vous entrez le nom d'une ville
2. **Récupère** : L'app interroge 3 sources météo différentes
3. **Moyenne** : Elle calcule la moyenne de chaque paramètre
4. **Affiche** : Résultats + données détaillées par source

### Données affichées
- 🌡️ Température moyenne
- 💧 Humidité moyenne
- 💨 Vitesse du vent moyen
- 📊 Détails par source (Open-Meteo, wttr.in, WeatherAPI)

---

## 🔗 Ressources

### APIs utilisées
- [Open-Meteo](https://open-meteo.com) - Météo gratuite
- [wttr.in](https://wttr.in) - Météo simple
- [WeatherAPI](https://weatherapi.com) - Météo détaillée

### Documentation technique
- [React](https://react.dev) - Framework frontend
- [Express.js](https://expressjs.com) - Framework backend
- [Node.js](https://nodejs.org) - Runtime JavaScript

---

## 🆘 Problèmes?

### Problème courant
**"Erreur: npm not found"**
→ Installez Node.js depuis https://nodejs.org/

### Vérifier configuration
```bash
verifier-config.bat
```

### Pour plus d'aide
Consultez [`INSTALLATION.md`](INSTALLATION.md) - Section Dépannage

---

## 📧 Fichiers utiles

| Fichier | À lire pour |
|---------|-----------|
| `.env.example` | Voir les variables d'environnement |
| `package.json` | Voir les dépendances |
| `.gitignore` | Voir les fichiers ignorés par Git |
| `config.js` | Configurer les APIs |

---

## ✨ Fonctionnalités clés

✅ Interroge **3 sources météo** simultanément
✅ Calcule les **moyennes** automatiquement  
✅ Interface **moderne et responsive**
✅ **Gestion des erreurs** gracieuse
✅ **Données détaillées** par source
✅ **Aucune clé API** requise (sauf optionnel)

---

## 🎓 Apprendre

Pour comprendre comment ça marche techniquement:
→ Lisez [`TECHNICAL.md`](TECHNICAL.md)

---

## 🚀 Prêt à démarrer?

```bash
Lancer.bat
```

**ou**

```bash
npm install && npm start
```

**Profitez!** 🌤️
