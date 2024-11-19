# Filmomatic

Filmomatic est une **application web interactive** conçue pour organiser des tirages au sort entre amis, où chaque participant est associé à un film. L'application permet de basculer entre un mode anonyme ou révélé et offre des animations dynamiques pour une expérience utilisateur immersive.

## Fonctionnalités

- **Tirages au Sort** : Sélectionne aléatoirement un participant avec un mécanisme garantissant que chaque personne soit choisie une fois.
- **Mode Anonyme** : Les identités et les films sont masqués jusqu'à leur révélation.
- **Affichage Dynamique** : Mise à jour automatique des états (tiré, non tiré) des participants.
- **Transitions Animées** : Animation fluide des participants avec GSAP.
- **Backend Multi-Environnements** : Chargement des bases de données de test ou de production en fonction de l'environnement.

## Technologies Utilisées

- **React** : Framework JavaScript principal pour la gestion de l'interface utilisateur.
- **Vite** : Outil de développement rapide pour React.
- **useState** : Gestion des états dynamiques des participants.
- **useEffect** : Gestion des appels API pour récupérer et synchroniser les données.
- **Node.js** : Backend léger pour gérer les routes et l'accès aux données.
- **Express** : Framework backend utilisé pour les APIs.
- **GSAP** : Bibliothèque d'animations pour des transitions dynamiques.
- **Fetch API** : Requêtes HTTP pour récupérer les données depuis le backend.
- **Bases de Données JSON** : Utilisation de fichiers JSON simulant des environnements distincts (test/production).
