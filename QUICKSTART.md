# ⚡ Guide Rapide - Météo App

## 🎯 En 30 secondes

### 1. Installation (une seule fois)
```bash
npm install
```

### 2. Démarrage
**Option A (Recommandée - Windows):**
Double-cliquez sur `Lancer.bat` et c'est parti!

**Option B (Manuel):**
- Terminal 1: `node server.js`
- Terminal 2: `npm start`

### 3. Utiliser
Allez sur http://localhost:3000 et cherchez une ville!

---

## 📋 Fichiers importants

| Fichier | Rôle |
|---------|------|
| `server.js` | Récupère données météo des 3 APIs |
| `src/App.js` | Interface utilisateur (React) |
| `Lancer.bat` | Démarrage automatique Windows |
| `README.md` | Documentation complète |
| `TECHNICAL.md` | Explication technique |

---

## 🔧 Ports

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001

---

## 🆘 Problèmes courants

| Problème | Solution |
|----------|----------|
| "npm: command not found" | Installez Node.js |
| "Port already in use" | Changez le port dans server.js |
| "API not responding" | Vérifiez Internet ou relancez |
| "Page blanche" | Ouvrez console (F12) pour voir erreurs |

---

## 📚 Documentations complètes

- **Installation détaillée:** Ouvrez `INSTALLATION.md`
- **Fonctionnement technique:** Ouvrez `TECHNICAL.md`
- **Documentation générale:** Ouvrez `README.md`

---

## ✨ La magie

L'app interroge **3 sources météo différentes** et affiche la **moyenne**:
- 🌤️ Open-Meteo
- 🌤️ wttr.in  
- 🌤️ WeatherAPI

Résultat = **données plus fiables et robustes!**

---

## 🚀 Prêt?

```bash
Lancer.bat
```
ou
```bash
npm install && node server.js
```
et dans un autre terminal:
```bash
npm start
```

**Enjoy!** 🎉
