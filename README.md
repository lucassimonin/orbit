# Orbit - Le Jeu à Boire 🎲🍻

Un jeu à boire interactif et fun, développé avec **React** (Vite + TailwindCSS) et packagé pour **iOS** et **Android** grâce à **Capacitor**.

> 💡 *Cette application fonctionne à la fois comme un site web classique et comme une véritable application mobile native !*

## 🛠️ Stack Technique
- **Frontend Web :** React 19, Vite, TailwindCSS (v4), Framer Motion, Canvas Confetti.
- **Mobile (iOS / Android) :** Capacitor v7.

---

## 🚀 Commandes Utiles

### 1. Développement Web Classique
Pour développer l'interface et tester rapidement dans ton navigateur (sans passer par les simulateurs mobiles) :

```bash
# Installer les dépendances du projet
npm install

# Lancer le serveur de développement local (avec rechargement auto)
npm run dev

# (Optionnel) Construire la version de production pour le web
npm run build
```

### 2. Développement Mobile (Capacitor)
Avant de lancer l'application sur iOS ou Android, **il faut toujours compiler le code web en premier**.

```bash
# 1. Compiler le code React (crée le dossier dist/)
npm run build

# 2. Synchroniser les fichiers compilés vers les projets iOS et Android
npx cap sync
```

### 3. Lancer sur iOS (Mac requis)
Assure-toi d'avoir installé **Xcode** depuis l'App Store.

```bash
# Ouvrir le projet iOS dans l'interface de Xcode
npx cap open ios
```
* Dans Xcode : Choisis un simulateur (ex: iPhone 15) en haut, puis clique sur le bouton **Play ▶️** pour lancer l'app.
* *Note : À la première ouverture, assure-toi de configurer une équipe de développement (Team) dans l'onglet "Signing & Capabilities".*

### 4. Lancer sur Android
Assure-toi d'avoir installé **Android Studio**.

```bash
# Ouvrir le projet Android dans l'interface d'Android Studio
npx cap open android
```
* Dans Android Studio : Patiente pendant la synchronisation Gradle, puis clique sur le bouton **Play ▶️** pour lancer l'app sur un émulateur ou ton téléphone branché en USB (Débogage activé).

---

## 🔄 Résumé du Workflow (Cycle de travail)
Quand tu modifies du code (ex: un nouveau bouton dans un composant React) et que tu veux le voir sur l'application mobile, voici la routine :

1. Tu codes dans `src/`.
2. Tu fais `npm run build`.
3. Tu fais `npx cap sync`.
4. Tu cliques sur "Run/Play" dans Xcode ou Android Studio.
