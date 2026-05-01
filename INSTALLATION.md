# 📋 Guide d'Installation et Configuration

## ✅ Prérequis

- **Node.js** 14.0.0 ou supérieur
- **npm** 6.0.0 ou supérieur
- **Internet** (pour accéder aux APIs externes)

### Vérifier l'installation

Ouvrez un terminal (CMD ou PowerShell) et exécutez :

```bash
node --version
npm --version
```

Si ces commandes affichent des numéros de version, vous êtes prêt !

---

## 📦 Installation

### Étape 1 : Accéder au dossier du projet

```bash
cd C:\Users\RINALDO\Desktop\Meteo\meteo-app
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

Cette commande télécharge tous les paquets nécessaires. Cela peut prendre quelques minutes.

### Étape 3 : Vérifier que tout est installé

```bash
npm list
```

Vous devriez voir une liste des dépendances installées.

---

## 🚀 Démarrage de l'application

### Méthode 1 : Automatique (Windows)

Double-cliquez sur le fichier **`Lancer.bat`** :
- Cela démarre automatiquement le serveur ET l'application React
- Deux fenêtres de terminal s'ouvriront
- L'application apparaît dans le navigateur

### Méthode 2 : Manuel (Windows/Mac/Linux)

Ouvrez **2 terminaux différents** :

**Terminal 1 - Serveur API:**
```bash
node server.js
```
Vous devriez voir : `Serveur météo lancé sur http://localhost:3001`

**Terminal 2 - Application React:**
```bash
npm start
```
Cela ouvrira automatiquement le navigateur à `http://localhost:3000`

---

## 🧪 Tester l'application

### Test 1 : Via l'interface web
1. Allez sur `http://localhost:3000`
2. Entrez le nom d'une ville (ex: "Paris")
3. Cliquez sur "Chercher"
4. Vous devriez voir la température moyenne et autres données

### Test 2 : Via l'API directement
Ouvrez un navigateur ou utilisez curl :

```bash
curl http://localhost:3001/api/weather/Paris
```

Vous devriez recevoir un JSON avec les données météo.

### Test 3 : Fichier de test automatique
Windows :
```bash
test-api.bat
```

Linux/Mac :
```bash
bash test-api.sh
```

---

## ⚙️ Configuration

### Modifier les ports

Éditer **`server.js`** et rechercher :
```javascript
const PORT = 3001;
```
Remplacez `3001` par le port souhaité.

Puis mettez à jour **`src/App.js`** :
```javascript
const response = await axios.get(`http://localhost:3001/api/weather/${cityName}`);
```

### Ajouter une clé API personnalisée

Éditer **`server.js`** et chercher :
```javascript
apiKey: '8d0e12d6c40e486487572646240704',
```

Vous pouvez remplacer par votre propre clé de [weatherapi.com](https://weatherapi.com)

### Activer/Désactiver des sources

Éditer **`config.js`** et modifier :
```javascript
OPEN_METEO: { enabled: true },
WTTR_IN: { enabled: true },
WEATHER_API: { enabled: true }
```

Mettez `false` pour désactiver une source.

---

## 🐛 Dépannage

### Erreur : "npm: command not found"
**Solution:** Node.js n'est pas installé ou pas dans le PATH
- Téléchargez depuis [nodejs.org](https://nodejs.org)
- Relancez votre terminal après l'installation

### Erreur : "Port 3001 already in use"
**Solution:** Un autre processus utilise ce port
```bash
# Windows
netstat -ano | findstr :3001

# Mac/Linux
lsof -i :3001
```
Puis fermez l'application utilisant ce port, ou changez le port dans la configuration.

### Erreur : "Cannot GET /api/weather/..."
**Solution:** Le serveur Node.js ne fonctionne pas
- Assurez-vous que `node server.js` tourne dans un terminal
- Vérifiez qu'il affiche bien `Serveur météo lancé sur http://localhost:3001`

### Erreur : "Impossible de récupérer les données météo"
**Solution:** Les APIs externes ne sont pas accessibles
- Vérifiez votre connexion Internet
- Les APIs peuvent être temporairement indisponibles
- Attendez quelques secondes et réessayez

### L'application ne s'ouvre pas dans le navigateur
**Solution:** Accédez manuellement à `http://localhost:3000`

---

## 📊 Architecture

```
┌──────────────┐
│   Client     │
│   (React)    │ http://localhost:3000
└──────────────┘
        │
        │ (requête HTTP)
        │
┌──────────────────────────┐
│  Serveur API (Express)   │ http://localhost:3001
│      server.js           │
└──────────────────────────┘
        │ │ │
        ├─┼─┤
        │ │ │
  ┌─────┘ │ └─────┐
  │       │       │
  ▼       ▼       ▼
Open    wttr    Weather
Meteo    .in     API
```

---

## 📚 Ressources

- [Documentation React](https://react.dev)
- [Documentation Express.js](https://expressjs.com)
- [Open-Meteo API](https://open-meteo.com)
- [wttr.in API](https://wttr.in)
- [WeatherAPI](https://weatherapi.com)

---

## 💡 Conseils

- Gardez les deux terminaux (serveur et app) ouverts pendant l'utilisation
- Si vous modifiez le code, React recharge automatiquement l'app (hot reload)
- Les données des APIs sont récupérées à chaque recherche (pas de cache)
- Pour de meilleures performances, limitez les requêtes simultanées

---

**Besoin d'aide ?** Vérifiez les erreurs dans les terminaux!
