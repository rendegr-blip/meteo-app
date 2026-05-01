# 🚀 Guide de Déploiement - Mettre l'app sur le Web

Comment déployer votre application Météo sur Internet en quelques minutes.

---

## 🎯 Options de déploiement

Classées de la plus facile à la plus complexe:

| Plateforme | Frontend | Backend | Facilité | Gratuit | Recommandé |
|-----------|----------|---------|---------|---------|-----------|
| **Vercel** | ✅ | ✅ | ⭐⭐⭐ | Oui | ✅✅✅ |
| **Netlify + Heroku** | ✅ | ✅ | ⭐⭐ | Oui | ✅✅ |
| **Railway** | ✅ | ✅ | ⭐⭐ | Non (gratuit trial) | ✅ |
| **Heroku** | ✅ | ✅ | ⭐⭐ | Oui | ✅ |
| **AWS** | ✅ | ✅ | ⭐ | Non | - |

---

## 1️⃣ VERCEL (Recommandé - Plus facile)

### Avantages
✅ Gratuit
✅ Déploiement en 2 minutes
✅ Support complet du serveur Node.js
✅ Support complet de React
✅ Domaine gratuit inclus

### Étape 1 : Préparer le projet

Créez un fichier `vercel.json` à la racine:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "src/index.js",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### Étape 2 : Modifier le serveur

**Dans `server.js`, changez:**

```javascript
// DE:
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur météo lancé sur http://localhost:${PORT}`);
});

// À:
const PORT = process.env.PORT || 3001;
module.exports = app;
```

### Étape 3 : Modifier App.js

**Dans `src/App.js`, changez:**

```javascript
// DE:
const response = await axios.get(`http://localhost:3001/api/weather/${cityName}`);

// À:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const response = await axios.get(`${API_URL}/api/weather/${cityName}`);
```

### Étape 4 : Créer un fichier .env.local

```
REACT_APP_API_URL=http://localhost:3001
```

### Étape 5 : Créer un compte et déployer

1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte (gratuit avec GitHub)
3. Cliquez "New Project"
4. Sélectionnez votre repository GitHub
5. Cliquez "Deploy"

**C'est tout!** Votre app est en ligne!

**Résultat:** Une URL comme `https://meteo-moyenne.vercel.app`

---

## 2️⃣ NETLIFY + HEROKU (Bon compromis)

### Frontend avec Netlify

#### Étape 1 : Builder l'app React

```bash
npm run build
```

Cela crée un dossier `build/` prêt pour la production.

#### Étape 2 : Déployer sur Netlify

**Option A: Avec GitHub (facile)**
1. Poussez votre code sur GitHub
2. Allez sur [netlify.com](https://netlify.com)
3. "New site from Git"
4. Sélectionnez votre repository
5. Build command: `npm run build`
6. Publish directory: `build`
7. Cliquez "Deploy"

**Option B: Drag & Drop (très facile)**
1. Allez sur [netlify.com](https://netlify.com)
2. Drag & drop le dossier `build/` depuis votre PC
3. C'est en ligne!

### Backend avec Heroku

#### Étape 1 : Créer un compte

Allez sur [heroku.com](https://heroku.com) et créez un compte gratuit.

#### Étape 2 : Installer Heroku CLI

```bash
# Windows (avec choco)
choco install heroku-cli

# Ou téléchargez depuis https://devcenter.heroku.com/articles/heroku-cli
```

#### Étape 3 : Créer un Procfile

À la racine du projet, créez `Procfile` (sans extension):

```
web: node server.js
```

#### Étape 4 : Modifier package.json

Ajoutez dans `package.json`:

```json
"engines": {
  "node": "18.x"
}
```

#### Étape 5 : Déployer

```bash
# Se connecter
heroku login

# Créer l'app
heroku create meteo-moyenne-app

# Déployer
git push heroku main

# Voir les logs
heroku logs --tail
```

**Résultat:** Une URL comme `https://meteo-moyenne-app.herokuapp.com`

#### Étape 6 : Mettre à jour l'URL du frontend

Dans `src/App.js`, changez:

```javascript
const API_URL = 'https://meteo-moyenne-app.herokuapp.com';
```

Puis redéployez sur Netlify.

---

## 3️⃣ RAILWAY (Nouveau et simple)

### Avantages
✅ Plus simple que Heroku
✅ Interface moderne
✅ Crédits gratuits au départ
❌ Pas 100% gratuit après la période trial

### Étape 1 : Créer un compte

Allez sur [railway.app](https://railway.app) avec GitHub.

### Étape 2 : Créer un nouveau projet

1. "New Project"
2. "Deploy from GitHub"
3. Sélectionnez votre repository
4. Railway détecte automatiquement Node.js

### Étape 3 : Configurer les variables

1. Allez dans "Variables"
2. Ajoutez `PORT` = `3000` (ou un autre port)

### Étape 4 : Déployer

C'est automatique! Chaque push sur GitHub redéploie l'app.

**Résultat:** Une URL comme `https://meteo-moyenne-railway.up.railway.app`

---

## 4️⃣ SOLUTION COMPLÈTE (Frontend + Backend)

### Utiliser Vercel pour tout

#### Étape 1 : Restructurer le projet

```
meteo-app/
├── api/
│   └── weather.js          (serveur serverless)
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   └── App.css
└── vercel.json
```

#### Étape 2 : Créer `api/weather.js`

```javascript
// Copier le contenu de server.js ici
// Adapter pour Vercel Serverless Functions

module.exports = async (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  
  // Copier la logique de récupération des données
  // Voir server.js pour les détails
};
```

#### Étape 3 : Déployer

```bash
vercel
```

---

## 📝 Fichiers à créer/modifier pour déploiement

### Pour Vercel:

**`vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {"src": "server.js", "use": "@vercel/node"}
  ],
  "routes": [
    {"src": "/api/(.*)", "dest": "server.js"},
    {"src": "/(.*)", "dest": "/", "methods": ["GET"]}
  ]
}
```

**Modifier `server.js` (dernière ligne):**
```javascript
module.exports = app;
```

### Pour Heroku:

**`Procfile`**
```
web: node server.js
```

**`package.json` (ajouter):**
```json
"engines": {
  "node": "18.x"
},
"start": "node server.js"
```

### Pour Netlify + Heroku:

**Pas de modification supplémentaire, simplement:**
- Build le frontend: `npm run build`
- Déployer sur Netlify (dossier `build/`)
- Déployer backend sur Heroku avec Procfile

---

## 🔧 Configuration des variables d'environnement

### Sur Vercel:

1. Allez dans "Settings"
2. "Environment Variables"
3. Ajoutez `WEATHER_API_KEY=votre_clé`

### Sur Heroku:

```bash
heroku config:set WEATHER_API_KEY=votre_clé
```

### Sur Railway:

1. Allez dans "Variables"
2. Ajoutez les variables
3. Sauvegardez

---

## 🧪 Tester après déploiement

### Tester le frontend:

Allez sur votre URL (ex: `https://meteo-moyenne.vercel.app`) et utilisez l'app.

### Tester l'API:

```bash
curl https://votre-url.com/api/weather/Paris
```

Vous devriez recevoir un JSON avec les données météo.

---

## 📊 Comparaison des solutions

### Vercel (Recommandé)
```
Frontend:  ✅ Déployé sur Vercel CDN
Backend:   ✅ Serverless Functions
Domaine:   ✅ Gratuit (.vercel.app)
SSL:       ✅ Automatique
Déploiement: Automatique via GitHub
Coût:      ✅ Gratuit
Temps:     ⚡ 2 minutes
```

### Netlify + Heroku
```
Frontend:  ✅ Netlify (gratuit)
Backend:   ✅ Heroku (gratuit avec limites)
Domaine:   ✅ Gratuit (.netlify.app + .herokuapp.com)
SSL:       ✅ Automatique
Déploiement: Manuel ou GitHub
Coût:      ✅ Gratuit (Heroku limité)
Temps:     ⏱️ 5 minutes
```

### Railway
```
Frontend:  ✅ Railway
Backend:   ✅ Railway
Domaine:   ✅ Gratuit (.railway.app)
SSL:       ✅ Automatique
Déploiement: Automatique via GitHub
Coût:      ⚠️ Payant après trial
Temps:     ⚡ 3 minutes
```

---

## ⚠️ Points importants

### CORS pour production

Modifiez `server.js`:

```javascript
app.use(cors({
  origin: 'https://votre-domaine.com',
  credentials: true
}));
```

### Variables d'environnement

Utilisez `process.env.VARIABLE_NAME` pour sensible data:

```javascript
const apiKey = process.env.WEATHER_API_KEY;
```

### HTTPS obligatoire

Toutes les solutions incluent HTTPS gratuitement.

### Performance

- Vercel: Meilleure performance
- Railway: Très rapide
- Heroku: Plus lent (serveurs gratuits)

---

## 🚀 OPTION RECOMMANDÉE: VERCEL

### Pourquoi Vercel?

1. **Plus simple** - Configuration minimale
2. **Plus rapide** - CDN global
3. **Gratuit** - Vraiment 100% gratuit
4. **Plus fiable** - Infrastructure robuste
5. **Déploiement automatique** - À chaque push GitHub

### Étapes rapides (5 minutes):

1. Créer account Vercel (avec GitHub)
2. Créer `vercel.json` (fourni ci-dessus)
3. Modifier `server.js` (1 ligne)
4. Modifier `src/App.js` (1 ligne)
5. Cliquez "Deploy"
6. **C'est en ligne!**

---

## 📚 Ressources

- [Vercel Docs](https://vercel.com/docs)
- [Heroku Docs](https://devcenter.heroku.com)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)

---

## 💬 Problèmes courants

### "Erreur CORS"
→ Configurez l'origine dans `server.js`

### "Variables d'environnement non trouvées"
→ Ajoutez-les dans les paramètres de la plateforme

### "Port non valide"
→ Utilisez `process.env.PORT || 3001`

### "Module not found"
→ Assurez-vous que `npm install` a été exécuté

---

## 🎯 Résumé

**Pour mettre votre app sur le web:**

1. **Option facile:** Vercel (recommandé)
2. **Option hybride:** Netlify + Heroku
3. **Option simple:** Railway

Choisissez Vercel, c'est le plus simple!

---

**À vous de jouer!** 🚀
