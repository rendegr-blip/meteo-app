# 📦 Mettre le code sur GitHub - Guide pas à pas

**Nécessaire pour déployer sur Vercel/Heroku/Railway/etc.**

Durée: **5 minutes**

---

## ✅ Prérequis

- Compte GitHub (gratuit)
- Git installé
- Votre code Meteo-App

---

## 📋 ÉTAPES

### Étape 1️⃣ : Créer un repository GitHub

1. Allez sur https://github.com
2. Cliquez "New" (bouton vert)
3. Nomme le repository: `meteo-app`
4. Choix: Public ou Private
5. ⚠️ **NE cochez PAS les cases** (README, gitignore, etc)
6. Cliquez "Create repository"

Vous verrez une page avec des instructions comme:

```
git remote add origin https://github.com/votreUsername/meteo-app.git
git branch -M main
git push -u origin main
```

---

### Étape 2️⃣ : Initialiser Git localement

Ouvrez un terminal et allez dans le dossier:

```bash
cd C:\Users\RINALDO\Desktop\Meteo\meteo-app
```

**Initialiser Git:**

```bash
git init
```

---

### Étape 3️⃣ : Configurer Git (une seule fois)

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

Utilisez le nom et l'email de votre compte GitHub.

---

### Étape 4️⃣ : Ajouter tous les fichiers

```bash
git add .
```

Cela ajoute tous les fichiers au staging.

Vérifiez:
```bash
git status
```

Vous devriez voir la liste des fichiers.

---

### Étape 5️⃣ : Faire le premier commit

```bash
git commit -m "Initial commit"
```

Cela crée un "checkpoint" de votre code.

---

### Étape 6️⃣ : Configurer la branche principale

```bash
git branch -M main
```

Cela renomme la branche en `main` (standard GitHub).

---

### Étape 7️⃣ : Connecter à GitHub

Remplacez `votreUsername` par votre nom d'utilisateur GitHub:

```bash
git remote add origin https://github.com/votreUsername/meteo-app.git
```

---

### Étape 8️⃣ : Pusher le code sur GitHub

```bash
git push -u origin main
```

Cela demande le nom d'utilisateur et le mot de passe (ou token).

**Note:** GitHub demande maintenant un "Personal Access Token" au lieu du mot de passe:

1. Allez sur https://github.com/settings/tokens
2. Cliquez "Generate new token"
3. Cochez `repo` (tout le reste se configure automatiquement)
4. Cliquez "Generate token"
5. Copiez le token (vous ne pourrez pas le voir deux fois!)
6. Utilisez ce token comme "mot de passe"

---

## ✨ C'EST TOUT!

Votre code est sur GitHub! 🎉

---

## 🔄 Mises à jour futures

Chaque fois que vous modifiez du code:

```bash
git add .
git commit -m "Description de mon changement"
git push origin main
```

C'est tout!

---

## 💡 Commandes Git utiles

```bash
# Voir le statut
git status

# Voir l'historique
git log

# Voir les changements
git diff

# Annuler les changements locaux
git restore .

# Voir les branches
git branch
```

---

## 🆘 Problèmes?

### "fatal: not a git repository"
→ Vous n'êtes pas dans le bon dossier
→ `cd C:\Users\RINALDO\Desktop\Meteo\meteo-app`

### "authentication failed"
→ Vérifiez le token GitHub
→ Régénérez un nouveau token si nécessaire

### "origin already exists"
→ Le remote est déjà configuré
→ Utilisez: `git remote set-url origin https://github.com/...`

### "branch 'main' is ahead of 'origin/main'"
→ Il y a des commits locaux non pushés
→ Faites un `git push origin main`

---

## 📚 Ressources

- [GitHub Docs](https://docs.github.com)
- [Git Tutorial](https://git-scm.com/book/en/v2)

---

## 🎯 Résumé

1. Créer repo GitHub ✅
2. `git init` ✅
3. `git add .` ✅
4. `git commit -m "Initial commit"` ✅
5. `git branch -M main` ✅
6. `git remote add origin ...` ✅
7. `git push -u origin main` ✅
8. **Votre code est sur GitHub!** ✅

---

**Maintenant vous pouvez déployer sur Vercel/Heroku!**

Voir:
- `VERCEL_RAPIDE.md` (recommandé)
- `HEROKU_RAPIDE.md` (alternative)

---

**Félicitations!** 🚀
