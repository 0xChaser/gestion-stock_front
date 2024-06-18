# Gestion de Stock - Client Lourd E5 BTS SIO

Dans le répertoire du projet, vous pouvez exécuter les commandes suivantes :

### `npm start`

Lance l'application en mode développement.
Ouvrez http://localhost:3000 pour afficher l'application dans le navigateur.

### `npm run build`

Crée une version optimisée de l'application pour la production dans le dossier build.
Cela regroupe correctement React en mode production et optimise la construction pour obtenir les meilleures performances.

### `npm run dist`

Cette commande permet de créer un éxecutable windows de l'application, cela nécessite l'éxecution préalable de la commande `npm run build`

### `npm run package-mac` `npm run package-win`

Ces deux commandes permettent de créer un éxecutable de l'application à l'aide d'Electron Packager


# Contexte 

Dans le cadre d'une augmentation de la perte de matériel informatiques des agents au sein de mon service, il m’a été demandé de réaliser une application permettant la gestion du stock de matériel.

## Spécificités

- Premièrement, l'application doit être accessible par n’importe quel agent afin de savoir le
matériel disponible.

- Deuxièmement, l'application sera développée à l’aide d’un Framework avec une API
permettant la relation à la base de données.

- Enfin, elle offrira une interface d'administration restreinte à certains utilisateurs avec la
possibilité de gérer les utilisateurs, les produits, les catégories et le stock.

## Langages

- React JS
- TypeScript
- JavaScript
- MUI Components

Pour rendre l'application éxécutable en tant que Client Lourd, j'ai utilisé le framework `Electron`.

# Back-End

Concernant le back-end de l'application, la repositorie est disponible ici :

https://github.com/0xChaser/gestion-stock_back
