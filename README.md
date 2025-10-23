# TP : Chat is my best hybrid friend 

Ceci est un projet [Expo](https://expo.dev) créé avec [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Contenu de l'application
Le TP "Chat is my best hybrid friend" avait pour objectif de créer une application mobile hybride avec l'aide de ChatGPT. Le développeur ne pouvait pas réaliser de ligne de code dans ce projet. L'application contient les fonctionnalités suivantes : 

Onglet "Accueil" :
- Fond d'écran selon la batterie du téléphone
- Luminosité automatique 
- Menu déroulant permettant de choisir entre chat, chien, clicker et quitter
- Chat : Affiche une image de chat et un son de miaulement
- Chien : Affiche une image de chien aléatoire
- Clicker : Un compteur du nombre de clics sur chats et chiens
- Quitter : Ferme l'application (Android uniquement)

Onglet "Carte" :
- Affiche une carte
- La carte est centrée pour pouvoir visualiser Paris et Toulon

---
## Lancer le projet

1. Installer les dépendances

   ```bash
   npm install
   ```

2. Lancer l'application

   ```bash
   npx expo start
   ```

--- 

## Structure du projet

Voici un aperçu de la structure du projet :

```
my-hybrid-friend/
├── assets/                 # Ressources statiques (images, polices, etc.)
├── app/                    # Code source de l'application
    ├── (tabs)/             # Les onglets de l'application
├── package.json            # Dépendances et scripts du projet
├── app.json                # Configuration de l'application Expo
└── README.md               # Documentation du projet
```

