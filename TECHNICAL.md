# 🎓 Guide Technique - Comment ça marche

## Vue d'ensemble

L'application Météo Moyenne fonctionne selon ce schéma :

```
[Utilisateur entre "Paris"]
              ↓
[React envoie requête au serveur]
              ↓
[Serveur cherche coordonnées GPS de Paris]
              ↓
[Serveur interroge 3 APIs météo en parallèle]
              ↓
[Serveur combine et moyenne les données]
              ↓
[Serveur retourne les résultats au frontend]
              ↓
[React affiche les données sur la page]
```

---

## 🔄 Flux détaillé des données

### 1️⃣ Frontend (React)

**Fichier:** `src/App.js`

```javascript
// L'utilisateur entre une ville et clique sur "Chercher"
const handleSearch = (e) => {
  e.preventDefault();
  if (city.trim()) {
    fetchWeather(city);  // Appel au serveur
  }
};

// Fonction qui interroge le serveur
const fetchWeather = async (cityName) => {
  const response = await axios.get(`http://localhost:3001/api/weather/${cityName}`);
  setWeather(response.data);  // Affiche les résultats
};
```

**Ce qui se passe:**
- L'utilisateur saisit "Paris" dans le champ de texte
- Clique sur le bouton "Chercher"
- React envoie une requête GET à `http://localhost:3001/api/weather/Paris`
- Le serveur répond avec les données
- React affiche les résultats

---

### 2️⃣ Backend (Node.js)

**Fichier:** `server.js`

#### Étape 1 : Récupérer les coordonnées GPS

```javascript
async function getCoordinates(city) {
  // API: Open-Meteo Geocoding
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const data = await response.json();
  
  // Retourne { lat: 48.8566, lon: 2.3522, name: "Paris" }
}
```

**Pourquoi?** Les APIs météo ont besoin de la latitude/longitude, pas du nom de la ville.

#### Étape 2 : Interroger les 3 sources météo EN PARALLÈLE

```javascript
// Fonction 1 : Open-Meteo
async function getWeatherFromOpenMeteo(lat, lon) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,humidity,wind_speed_10m`
  );
  const data = await response.json();
  return { temperature, humidity, wind_speed, source: 'Open-Meteo' };
}

// Fonction 2 : wttr.in
async function getWeatherFromWttr(city) {
  const response = await fetch(`https://wttr.in/${city}?format=j1`);
  const data = await response.json();
  return { temperature, humidity, wind_speed, source: 'wttr.in' };
}

// Fonction 3 : WeatherAPI
async function getWeatherFromWeatherAPI(lat, lon) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=...&q=${lat},${lon}`
  );
  const data = await response.json();
  return { temperature, humidity, wind_speed, source: 'WeatherAPI' };
}
```

**Résultat pour Paris:**
```javascript
weatherData = [
  { temperature: 15.2, humidity: 70, wind_speed: 12.3, source: 'Open-Meteo' },
  { temperature: 15.8, humidity: 72, wind_speed: 12.1, source: 'wttr.in' },
  { temperature: 14.9, humidity: 74, wind_speed: 12.7, source: 'WeatherAPI' }
]
```

#### Étape 3 : Calculer les moyennes

```javascript
// Température moyenne
const avgTemp = weatherData.reduce((sum, w) => sum + w.temperature, 0) / weatherData.length;
// (15.2 + 15.8 + 14.9) / 3 = 15.3°C

// Humidité moyenne
const avgHumidity = weatherData.reduce((sum, w) => sum + w.humidity, 0) / weatherData.length;
// (70 + 72 + 74) / 3 = 72%

// Vitesse du vent moyenne
const avgWindSpeed = weatherData.reduce((sum, w) => sum + w.wind_speed, 0) / weatherData.length;
// (12.3 + 12.1 + 12.7) / 3 = 12.4 km/h
```

#### Étape 4 : Retourner les résultats

```javascript
res.json({
  city: "Paris",
  temperature: 15.3,
  humidity: 72,
  wind_speed: 12.4,
  sources: ["Open-Meteo", "wttr.in", "WeatherAPI"],
  detailed_data: [
    { temperature: 15.2, humidity: 70, wind_speed: 12.3, source: 'Open-Meteo' },
    { temperature: 15.8, humidity: 72, wind_speed: 12.1, source: 'wttr.in' },
    { temperature: 14.9, humidity: 74, wind_speed: 12.7, source: 'WeatherAPI' }
  ]
});
```

---

## 🌐 Les 3 APIs Météo

### ✅ Open-Meteo
- **Type:** API REST gratuite
- **Avantages:** Aucune clé requise, très fiable, gratuit illimité
- **Données:** Température précise, humidité, vitesse du vent
- **URL:** https://api.open-meteo.com/v1/forecast

### ✅ wttr.in
- **Type:** API REST gratuite
- **Avantages:** Aucune clé requise, intégrée dans le terminal Unix
- **Données:** Température, humidité, vent, description météo
- **URL:** https://wttr.in/{city}?format=j1

### ✅ WeatherAPI
- **Type:** API REST freemium
- **Avantages:** API bien documentée, données détaillées
- **Données:** Température, humidité, vent, UV, pression
- **URL:** https://api.weatherapi.com/v1/current.json
- **Clé utilisée:** `8d0e12d6c40e486487572646240704` (clé de démo public)

---

## 📈 Avantages du calcul de moyennes

### 1️⃣ **Robustesse**
Si une API est en panne, on continue quand même avec les autres sources :
```
Cas 1: Toutes les 3 APIs fonctionnent → données plus fiables
Cas 2: 2 APIs fonctionnent → on calcule avec 2 sources
Cas 3: 1 API fonctionne → au moins une donnée
Cas 4: 0 APIs fonctionnent → erreur, mais applica reste stable
```

### 2️⃣ **Précision**
Les biais des APIs individuelles sont "lissés" par la moyenne :
```
API A: 15°C (un peu chaude?)
API B: 14°C (un peu froide?)
API C: 15°C
MOYENNE: 14.67°C (plus proche de la réalité)
```

### 3️⃣ **Diversité**
Chaque API utilise un modèle météo différent :
- Open-Meteo : Modèle DWD (allemand)
- wttr.in : Données brutes de stations
- WeatherAPI : Données consolidées

La moyenne combine ces perspectives différentes.

---

## 🛡️ Gestion des erreurs

```javascript
// Chaque API est dans un try-catch
try {
  const omData = await getWeatherFromOpenMeteo(coords.lat, coords.lon);
  weatherData.push(omData);
} catch (error) {
  console.log('Erreur Open-Meteo:', error.message);
  // Continue avec les autres APIs, ne s'arrête pas
}

// Si AUCUNE API ne fonctionne :
if (weatherData.length === 0) {
  return res.status(500).json({ 
    error: 'Impossible de récupérer les données météo' 
  });
}
```

---

## 📊 Exemple complet : Requête pour Paris

### Requête (Frontend)
```
GET http://localhost:3001/api/weather/Paris
```

### Processus (Backend)
1. **Géocodage:** Paris → (48.8566, 2.3522)
2. **Appels parallèles:**
   - Open-Meteo: 15.2°C, 70%, 12.3 km/h
   - wttr.in: 15.8°C, 72%, 12.1 km/h
   - WeatherAPI: 14.9°C, 74%, 12.7 km/h
3. **Calcul:**
   - Temp moy: (15.2+15.8+14.9)/3 = 15.3°C
   - Humidité moy: (70+72+74)/3 = 72%
   - Vent moy: (12.3+12.1+12.7)/3 = 12.4 km/h

### Réponse (Backend → Frontend)
```json
{
  "city": "Paris",
  "temperature": 15.3,
  "humidity": 72,
  "wind_speed": 12.4,
  "sources": ["Open-Meteo", "wttr.in", "WeatherAPI"],
  "detailed_data": [...]
}
```

### Affichage (Frontend)
```
🌤️ Météo Moyenne
Paris
15.3°
💧 Humidité: 72%
💨 Vent: 12.4 km/h

📊 Données détaillées par source:
  Open-Meteo: 15.2°C, 70%, 12.3 km/h
  wttr.in: 15.8°C, 72%, 12.1 km/h
  WeatherAPI: 14.9°C, 74%, 12.7 km/h
```

---

## 🔧 Points clés du code

### Configuration Express
```javascript
const app = express();
app.use(cors());  // Permet les requêtes cross-origin (React -> API)
app.use(express.json());  // Parse le JSON
```

### Route principale
```javascript
app.get('/api/weather/:city', async (req, res) => {
  // :city est capturé depuis l'URL
  // async permet d'attendre les réponses des APIs
})
```

### Récupération parallèle (important!)
```javascript
// ❌ LENT: Attendre que chacun finisse
const data1 = await getWeatherFromOpenMeteo(...);  // 2s
const data2 = await getWeatherFromWttr(...);       // 2s
const data3 = await getWeatherFromWeatherAPI(...); // 2s
// Total: 6 secondes

// ✅ RAPIDE: Tous en même temps
const [data1, data2, data3] = await Promise.all([
  getWeatherFromOpenMeteo(...),     // 2s
  getWeatherFromWttr(...),          // 2s
  getWeatherFromWeatherAPI(...)     // 2s
]);
// Total: 2 secondes
```

---

## 🎨 Interface utilisateur (React)

### État local
```javascript
const [city, setCity] = useState("Paris");           // Nom de ville
const [weather, setWeather] = useState(null);        // Résultats météo
const [loading, setLoading] = useState(false);       // En cours de chargement
const [error, setError] = useState(null);            // Message d'erreur
```

### Rendu conditionnel
```javascript
{loading && <p>Chargement...</p>}           // Affiche si en cours
{error && <p style={{color: 'red'}}>{error}</p>}    // Affiche si erreur
{weather && !loading && <div>Affiche météo</div>}   // Affiche si données OK
{!weather && !loading && !error && <p>Cherchez une ville</p>}  // Affiche par défaut
```

---

## 📈 Optimisations possibles

1. **Cache:** Mémoriser les résultats pour 30 minutes
2. **Timeout:** Arrêter une API si elle prend > 3 secondes
3. **Fallback:** Si une API manque des données, utiliser les autres
4. **Base de données:** Sauvegarder l'historique des recherches
5. **PWA:** Fonctionner hors ligne avec les données en cache

---

## 🧪 Tests

### Test unitaire (exemple)
```javascript
describe('getWeatherFromOpenMeteo', () => {
  it('devrait retourner la température en Celsius', async () => {
    const result = await getWeatherFromOpenMeteo(48.8566, 2.3522);
    expect(result.temperature).toBeDefined();
    expect(typeof result.temperature).toBe('number');
  });
});
```

### Test d'intégration
```bash
# Tester l'API complète
curl http://localhost:3001/api/weather/Paris | jq .
```

---

**Voilà! Vous comprenez maintenant comment l'app fonctionne! 🎉**
