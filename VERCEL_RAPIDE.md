# 🚀 DÉPLOYER SUR VERCEL - Guide pas à pas

**Vercel est la solution la plus facile et la plus rapide.**

Durée: **5 minutes**

---

## ✅ Prérequis

- Un compte GitHub (gratuit)
- Votre code sur GitHub
- Node.js installé

---

## 📋 ÉTAPES (Super simple!)

### Étape 1️⃣ : Préparer le code sur GitHub

Vous devez avoir votre code sur GitHub.

**Si ce n'est pas fait:**
```bash
cd C:\Users\RINALDO\Desktop\Meteo\meteo-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votreUsername/meteo-app.git
git push -u origin main
```

### Étape 2️⃣ : Créer un compte Vercel

1. Allez sur https://vercel.com
2. Cliquez "Sign Up"
3. Cliquez "Continue with GitHub"
4. Autorisez Vercel à accéder à vos repositories
5. **C'est bon!**

### Étape 3️⃣ : Créer un nouveau projet

1. Allez sur https://vercel.com/dashboard
2. Cliquez "Add New..."
3. Cliquez "Project"
4. Sélectionnez votre repository `meteo-app`
5. Cliquez "Import"

### Étape 4️⃣ : Configurer le déploiement

Dans l'écran "Configure Project":

**Build Command:** (laissez vide ou `npm run build`)
**Output Directory:** `public`
**Install Command:** `npm install`

Cliquez "Deploy"

### Étape 5️⃣ : Attendre le déploiement

Vercel déploie votre app! Vous verrez une progression.

Une fois terminé, vous aurez une URL comme:
```
https://meteo-app-abc123.vercel.app
```

---

## ✨ C'EST TOUT!

Votre app est en ligne! 🎉

Utilisez l'URL pour accéder à votre application depuis n'importe où.

---

## 🔄 Mises à jour automatiques

Chaque fois que vous faites un `git push` sur GitHub, Vercel redéploie automatiquement.

```bash
# Faire des modifications
# ...

# Pusher le code
git add .
git commit -m "Mon changement"
git push origin main

# Vercel redéploie automatiquement! ✅
```

---

## 📝 Configuration avancée (Optionnel)

Si vous avez des problèmes, configurez les variables d'environnement:

1. Allez dans "Settings" sur Vercel
2. Cliquez "Environment Variables"
3. Ajoutez si besoin:
   - `WEATHER_API_KEY` = votre clé API

---

## 🆘 Problèmes?

### "Error: Cannot find module"
→ Assurez-vous que le `package.json` est correct
→ Vérifiez que `npm install` a fonctionné

### "Port already in use"
→ C'est normal en production, Vercel gère les ports

### "API 404 Not Found"
→ Vérifiez que votre URL de l'API est correcte
→ Vérifiez que `server.js` est à la racine

---

## 🎯 Résumé

1. Code sur GitHub ✅
2. Compte Vercel ✅
3. "Add Project" ✅
4. "Deploy" ✅
5. **Votre app est en ligne!** ✅

---

## 🌍 Domaine personnalisé (Optionnel)

Après le déploiement, vous pouvez ajouter votre propre domaine:

1. Dans Vercel, allez "Settings"
2. Cliquez "Domains"
3. Ajoutez votre domaine
4. Suivez les instructions DNS

---

**Félicitations! Votre app est sur le web!** 🚀

Partagez l'URL avec qui vous voulez!
