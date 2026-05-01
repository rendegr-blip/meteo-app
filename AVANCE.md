# 🚀 Guide Avancé - Développeurs

Pour les personnes qui veulent modifier, étendre ou déployer l'application.

---

## 📁 Structure du code

```
src/App.js
  ├── [state] city, weather, loading, error
  ├── [function] fetchWeather() - Appel API
  ├── [function] handleSearch() - Gestion recherche
  └── [render] Interface utilisateur

server.js
  ├── [function] getCoordinates() - Géocodage
  ├── [function] getWeatherFromOpenMeteo()
  ├── [function] getWeatherFromWttr()
  ├── [function] getWeatherFromWeatherAPI()
  └── [route] GET /api/weather/:city
```

---

## 🔧 Modification du code

### Ajouter une nouvelle source météo

1. **Ajouter la fonction dans `server.js`:**
```javascript
async function getWeatherFromNewAPI(lat, lon) {
  const response = await fetch('https://api-url.com/...');
  const data = await response.json();
  return {
    temperature: data.temp,
    humidity: data.humidity,
    wind_speed: data.wind,
    source: 'NewAPI'
  };
}
```

2. **Ajouter l'appel dans la route:**
```javascript
try {
  const newData = await getWeatherFromNewAPI(coords.lat, coords.lon);
  weatherData.push(newData);
} catch (error) {
  console.log('Erreur NewAPI:', error.message);
}
```

3. **Ça y est!** La moyenne inclura automatiquement la nouvelle source.

---

### Modifier l'interface utilisateur

**Fichier:** `src/App.js`

```javascript
// Ajouter un nouveau paramètre (ex: pression)
{weather && (
  <div>
    <p>Pression: {weather.pressure} hPa</p>
  </div>
)}
```

**Fichier:** `server.js`

```javascript
// Ajouter le calcul dans la moyenne
const avgPressure = weatherData.reduce((sum, w) => sum + w.pressure, 0) / weatherData.length;

// Ajouter à la réponse
res.json({
  ...
  pressure: Math.round(avgPressure)
});
```

---

## 🚀 Déployer sur Internet

### Option 1 : Vercel (Recommandé)

**Frontend (React):**
```bash
npm run build
# Déployer le dossier build/ sur Vercel
```

**Backend (Node.js):**
```bash
# Créer un serverless function sur Vercel
# Copier le contenu de server.js
```

### Option 2 : Heroku

```bash
# Ajouter un Procfile
echo "web: node server.js" > Procfile

# Créer l'app
heroku create my-meteo-app

# Déployer
git push heroku main
```

### Option 3 : AWS Lambda

Convertir `server.js` en Lambda function:
```javascript
const serverless = require('serverless-http');
const app = express();
module.exports.handler = serverless(app);
```

---

## 📦 Optimisations possibles

### 1. Ajouter un cache
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 1800 }); // 30 min

app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  const cached = cache.get(city);
  if (cached) return res.json(cached);
  
  // ... récupérer données ...
  cache.set(city, result);
  res.json(result);
});
```

### 2. Ajouter un timeout
```javascript
const timeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
};

// Usage
try {
  const data = await timeout(getWeatherFromOpenMeteo(...), 3000);
} catch (error) {
  // API a dépassé 3 secondes
}
```

### 3. Base de données (MongoDB)
```javascript
const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  wind_speed: Number,
  timestamp: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', SearchSchema);

// Sauvegarder les résultats
const search = new Search(result);
await search.save();
```

### 4. Authentification (JWT)
```javascript
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
});
```

---

## 🧪 Tests unitaires

### Avec Jest
```bash
npm install --save-dev jest
```

**test/weather.test.js:**
```javascript
const request = require('supertest');
const app = require('../server.js');

describe('GET /api/weather/:city', () => {
  it('should return weather data for Paris', async () => {
    const res = await request(app).get('/api/weather/Paris');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('humidity');
  });
  
  it('should return error for invalid city', async () => {
    const res = await request(app).get('/api/weather/InvalidCityXYZ');
    expect(res.statusCode).toBe(500);
  });
});
```

```bash
npm test
```

---

## 📈 Monitoring & Logging

### Winston (Logging)
```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('Recherche pour Paris');
```

### Sentry (Error Tracking)
```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");

Sentry.init({ dsn: "https://..." });

app.use(Sentry.Handlers.errorHandler());
```

---

## 🔐 Sécurité

### Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite à 100 requêtes par IP
});

app.use(limiter);
```

### Helmet (Headers de sécurité)
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 📊 Performance

### Compression
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

### Clustering (Multi-processus)
```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () => {
    console.log(`Serveur sur PID ${process.pid}`);
  });
}
```

---

## 🐳 Docker

**Dockerfile:**
```dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

```bash
docker build -t meteo-app .
docker run -p 3001:3001 meteo-app
```

---

## 📱 Mobile (React Native)

L'API reste la même, créer une app native:

```javascript
// App.js (React Native)
const fetchWeather = async (city) => {
  const response = await fetch(`http://your-server.com/api/weather/${city}`);
  const data = await response.json();
  setWeather(data);
};
```

---

## 🌐 PWA (Progressive Web App)

Ajouter au `public/manifest.json`:
```json
{
  "name": "Météo Moyenne",
  "short_name": "Météo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#667eea"
}
```

Ajouter service worker:
```javascript
// public/service-worker.js
self.addEventListener('install', event => {
  // Cache les ressources
});

self.addEventListener('fetch', event => {
  // Utiliser le cache en offline
});
```

---

## 📚 Apprentissage supplémentaire

- [Express.js Guide](https://expressjs.com)
- [React Docs](https://react.dev)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [JavaScript Modern Features](https://javascript.info)
- [REST API Design](https://restfulapi.net)

---

## 🎯 Prochaines étapes

1. **Ajouter une base de données** (MongoDB, PostgreSQL)
2. **Implémenter l'authentification** (JWT, OAuth)
3. **Ajouter des tests** (Jest, Supertest)
4. **Déployer en production** (Vercel, Heroku, AWS)
5. **Créer une app mobile** (React Native)
6. **Ajouter un dashboard** (Graphiques, statistiques)
7. **Intégrer du machine learning** (Prévisions)

---

## 💬 Questions avancées?

Consultez la documentation officielle des technologies utilisées ou demandez à un développeur expérimenté!

---

**Happy coding!** 🚀
