# 🔴 Collectif 8 mars 49 — Site Next.js + Netlify Visual Editor

Site web du Collectif 8 mars 49 avec édition visuelle via Netlify.

## 🚀 Déployer le site

### Étape 1 : Upload sur GitHub
1. Crée un **nouveau repository** sur [github.com](https://github.com)
2. Nomme-le `collectif-8mars49-nextjs`
3. Upload **tous les fichiers** de ce dossier

### Étape 2 : Déployer sur Netlify
1. Va sur [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connecte ton repo GitHub
3. Netlify détectera Next.js automatiquement
4. Clique **Deploy**

### Étape 3 : Activer le Visual Editor
1. Dans Netlify → ton projet → **Project configuration** → **Visual editor**
2. Clique **Enable visual editor**
3. Configure la branche `preview`
4. Tes collègues accèdent au Visual Editor depuis Netlify

## ✏️ Comment modifier le site

### Via le Visual Editor (pour les collègues non-techniques)
1. Connecte-toi sur Netlify
2. Va dans le projet → **Visual editor**
3. Clique sur les éléments du site pour les modifier
4. Publie les changements

### Ce qui est modifiable :
- **Textes** : titre, slogan, manifeste, descriptions
- **Événements** : ajouter, modifier, supprimer
- **Associations** : ajouter, modifier, supprimer
- **Images** : via le dossier `public/images`

## 📁 Structure

```
content/
├── pages/index.json          ← Contenu de la page d'accueil
├── data/associations/         ← Les 9 associations (1 fichier JSON chacune)
└── data/evenements/           ← Les événements (1 fichier JSON chacun)
src/
├── pages/index.js             ← Le code de la page
├── styles/globals.css         ← Le style
└── utils/content.js           ← Utilitaire de lecture
stackbit.config.ts             ← Config du Visual Editor
```

## 🔧 Dev local

```bash
npm install
npm run dev
# Site sur http://localhost:3000

# Visual Editor local :
npm install -g @stackbit/cli
stackbit dev
# Visual Editor sur http://localhost:8090/_stackbit
```
