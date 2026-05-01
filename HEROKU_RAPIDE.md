# 🚀 DÉPLOYER SUR HEROKU - Guide pas à pas

**Heroku est gratuit avec quelques limitations.**

Durée: **10 minutes**

---

## ✅ Prérequis

- Un compte GitHub
- Votre code sur GitHub
- Heroku CLI installé

---

## 📥 Installer Heroku CLI

### Windows:
```bash
choco install heroku-cli
```

Ou téléchargez depuis: https://devcenter.heroku.com/articles/heroku-cli

### Mac:
```bash
brew tap heroku/brew && brew install heroku
```

### Linux:
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

---

## 📋 ÉTAPES

### Étape 1️⃣ : Préparer le code sur GitHub

```bash
cd C:\Users\RINALDO\Desktop\Meteo\meteo-app

# Initialiser Git si pas fait
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votreUsername/meteo-app.git
git push -u origin main
```

### Étape 2️⃣ : Créer un compte Heroku

1. Allez sur https://heroku.com
2. Cliquez "Sign up"
3. Remplissez le formulaire
4. Confirmez votre email
5. **C'est bon!**

### Étape 3️⃣ : Se connecter avec Heroku CLI

```bash
heroku login
```

Une fenêtre de navigateur s'ouvre. Cliquez "Log in" et revenir au terminal.

### Étape 4️⃣ : Créer l'application Heroku

```bash
heroku create meteo-moyenne-app
```

Remplacez `meteo-moyenne-app` par votre propre nom (doit être unique).

Heroku vous donne une URL comme:
```
https://meteo-moyenne-app.herokuapp.com
```

### Étape 5️⃣ : Ajouter les fichiers de configuration

Vérifiez que vous avez le `Procfile` à la racine:

```
web: node server.js
```

(Ce fichier est déjà créé!)

### Étape 6️⃣ : Modifier package.json

Ajoutez dans `package.json`:

```json
"engines": {
  "node": "18.x",
  "npm": "9.x"
},
```

### Étape 7️⃣ : Déployer

```bash
git push heroku main
```

Heroku clone votre code, installe les dépendances, et démarre le serveur.

Vous verrez des logs défiler. À la fin:
```
remote: -----> Launching...
remote:        Released v1
remote:        https://meteo-moyenne-app.herokuapp.com/ deployed to Heroku
```

### Étape 8️⃣ : Voir si ça marche

```bash
heroku open
```

Votre app s'ouvre dans le navigateur!

---

## ✨ C'EST TOUT!

Votre app est en ligne sur Heroku! 🎉

---

## 🔄 Mises à jour

À chaque modification:

```bash
git add .
git commit -m "Mon changement"
git push heroku main
```

Heroku redéploie automatiquement!

---

## 📝 Configuration avancée

### Ajouter des variables d'environnement

```bash
heroku config:set WEATHER_API_KEY=votre_clé
```

Voir les variables:
```bash
heroku config
```

### Voir les logs

```bash
heroku logs --tail
```

Cela affiche les logs en temps réel.

### Redémarrer l'app

```bash
heroku restart
```

---

## 🆘 Problèmes?

### "Cannot find module"
```bash
heroku logs --tail
```
Regardez les erreurs dans les logs.

### "Application error"
Vérifiez les logs:
```bash
heroku logs --tail
```

### Changer l'URL

L'URL par défaut est `https://meteo-moyenne-app.herokuapp.com`

Vous pouvez la changer:
```bash
heroku apps:rename nouveau-nom
```

### Supprimer l'app

```bash
heroku apps:destroy --app meteo-moyenne-app
```

---

## 📊 Limitations Heroku gratuit

⚠️ Heroku a annulé les dynos gratuits en 2022!

**Solutions:**
- Utiliser **Vercel** (recommandé, complètement gratuit)
- Utiliser **Railway** (crédits gratuits)
- Utiliser **Render** (gratuit avec limites)

---

## 🎯 Résumé

1. Installer Heroku CLI ✅
2. Créer compte Heroku ✅
3. `heroku login` ✅
4. `heroku create meteo-app` ✅
5. `git push heroku main` ✅
6. **Votre app est en ligne!** ✅

---

## 💡 Conseil

**Si vous commencez:** Utilisez **Vercel** à la place!
- Plus facile
- Complètement gratuit
- Meilleure performance

Voir: `VERCEL_RAPIDE.md`

---

**Félicitations!** 🚀
