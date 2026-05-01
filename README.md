# 🌤️ Application Météo Moyenne

Une application web qui récupère les données météorologiques de plusieurs sources API, les combine et affiche les moyennes.

## 🎯 Fonctionnalités

- **Données de plusieurs sources** : Combine les données de 3 APIs météorologiques différentes
- **Calcul des moyennes** : Temperature, humidité et vitesse du vent
- **Interface moderne** : Design fluide avec React et gradient CSS
- **Sources API utilisées** :
  - ✅ Open-Meteo (gratuit, pas de clé)
  - ✅ wttr.in (gratuit, pas de clé)
  - ✅ WeatherAPI (gratuit avec clé)

## 📋 Données affichées

Pour chaque ville recherchée :
- 🌡️ **Température moyenne** (en °C)
- 💧 **Humidité moyenne** (en %)
- 💨 **Vitesse du vent moyen** (en km/h)
- 📊 **Données détaillées** par source

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 14+ installé
- npm installé

### Étapes

1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Lancer l'application**
   
   Option 1 (Automatique - Windows) :
   ```bash
   start-app.bat
   ```
   
   Option 2 (Manuel - Tous systèmes) :
   ```bash
   # Terminal 1 : Lancer le serveur
   node server.js
   
   # Terminal 2 : Lancer React
   npm start
   ```

3. **Accéder à l'application**
   - L'app React s'ouvre automatiquement à `http://localhost:3000`
   - Le serveur API écoute sur `http://localhost:3000` (pour les requêtes API)

## 📁 Structure du projet

```
meteo-app/
├── server.js           # Serveur Express avec APIs météo
├── src/
│   ├── App.js         # Composant React principal
│   ├── App.css        # Styles CSS
│   ├── index.js       # Point d'entrée React
│   └── ...
├── package.json       # Dépendances et scripts
├── start-app.bat      # Script de démarrage automatique
└── README.md          # Ce fichier
```

## 🔧 Serveur API

Le serveur Express expose l'endpoint suivant :

### `GET /api/weather/:city`

Récupère les données météo moyennes pour une ville.

**Paramètres:**
- `city` (string) : Nom de la ville

**Exemple de réponse:**
```json
{
  "city": "Paris",
  "temperature": 15.2,
  "humidity": 72,
  "wind_speed": 12.5,
  "sources": ["Open-Meteo", "wttr.in", "WeatherAPI"],
  "detailed_data": [
    {
      "temperature": 15.5,
      "humidity": 70,
      "wind_speed": 12.3,
      "source": "Open-Meteo"
    },
    ...
  ]
}
```

## 🌐 Sources de données

### Open-Meteo
- **URL:** https://api.open-meteo.com
- **Avantages:** Pas de clé requise, gratuit, fiable
- **Limitation:** Aucune limitation connue

### wttr.in
- **URL:** https://wttr.in
- **Avantages:** Pas de clé requise, gratuit
- **Limitation:** Peut être instable parfois

### WeatherAPI
- **URL:** https://weatherapi.com
- **Avantages:** Données précises et détaillées
- **Limitation:** Gratuit mais avec limites d'appels (utilise une clé publique)

## 💡 Comment ça marche

1. **Recherche d'une ville** : L'utilisateur entre le nom d'une ville
2. **Géocodage** : Le serveur récupère les coordonnées (latitude/longitude)
3. **Appels API** : Le serveur interroge les 3 sources météorologiques
4. **Calcul des moyennes** : Les données sont combinées et moyennées
5. **Affichage** : L'interface affiche les résultats au format

## 🎨 Technologies utilisées

- **Frontend:**
  - React 19
  - Axios (requêtes HTTP)
  - CSS3 (gradients, animations)

- **Backend:**
  - Node.js
  - Express.js
  - node-fetch (requêtes HTTP)
  - CORS (requêtes cross-origin)

- **APIs:**
  - Open-Meteo API
  - wttr.in API
  - WeatherAPI

## ⚠️ Notes importantes

- Le serveur Node.js doit être lancé avant l'application React
- Les APIs externes doivent être accessibles (connexion internet requise)
- En cas d'erreur d'une source API, l'app continue avec les autres sources disponibles

## 🔒 Confidentialité & Sécurité

- Aucune donnée personnelle n'est collectée
- Aucun cookie n'est utilisé
- Les clés API utilisées sont publiques et limitées

---

**Profitez de votre application météo!** 🌤️

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
