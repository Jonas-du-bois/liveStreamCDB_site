# LiveStream CDB

Application de streaming en direct pour la diffusion de contenus multimédias depuis différentes salles.

## 📋 Description

Cette application Vue.js permet de visualiser des flux vidéo en direct depuis plusieurs salles, notamment :
- Salle des Isles (2 flux)
- Salle de Léon Michaud (2 flux)

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-projet]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## 🛠️ Technologies Utilisées

- Vue.js 3
- Vue Router
- Vite
- TailwindCSS
- PostCSS

## 🌟 Fonctionnalités

- Interface responsive
- Navigation entre les différents flux
- Affichage en temps réel de l'heure
- Menu mobile adaptatif

## 💻 Structure du Projet

```
src/
├── assets/         # Ressources statiques
├── components/     # Composants Vue
│   ├── common/     # Composants réutilisables
│   ├── icons/      # Icônes
│   └── layout/     # Composants de mise en page
├── data/          # Données JSON pour les changements de titre automatique
└── utils/         # Utilitaires
```

## 🔧 Configuration

L'application utilise Vite comme outil de build et peut être configurée via les fichiers :
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.cjs`

## 📱 Compatibilité

- Desktop
- Tablette
- Mobile

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou proposer une pull request.

## 📄 Licence

Ce projet est privé et propriétaire. Tous droits réservés.
