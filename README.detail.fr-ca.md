# Budget Exporter

Budget Exporter est une extension multi-navigateur (Firefox, Chrome, Edge) qui extrait les transactions depuis des pages bancaires prises en charge, applique des regles locales de normalisation des payees, propose des suggestions deterministes sans IA, puis exporte un CSV revise compatible avec YNAB.

## Architecture actuelle

Le projet cible Firefox, Chrome et Edge avec Manifest V3 et un flux de travail centre sur la revision :

1. ouvrir une page bancaire prise en charge dans le navigateur
2. cliquer sur l'icone de l'extension dans la barre d'outils
3. reviser les transactions dans la barre laterale (Firefox) / le panneau lateral (Chrome, Edge)
4. ajuster payee, categorie et memo si necessaire
5. creer de nouvelles regles a partir des suggestions locales
6. exporter le CSV revise

Tout s'execute localement dans le navigateur. Aucun modele IA, aucun traitement distant et aucune synchronisation cloud ne sont requis.

## Installation

### Firefox

Pour l'iteration rapide en dev (sans build) :
1. Ouvrir `about:debugging` → Ce Firefox → Charger un module complementaire temporaire.
2. Selectionner `manifest.json` a la racine du projet.
3. Cliquer sur `Recharger` dans `about:debugging` apres chaque modification.

Pour installer a partir du paquet :
1. Construire : `.\build.ps1 -Target firefox`.
2. Ouvrir `about:debugging` → Ce Firefox → Charger un module complementaire temporaire → selectionner le `.xpi`.

Sur une page bancaire prise en charge, une icone supplementaire apparait dans la barre d'URL a cote de l'etoile des favoris (Firefox `page_action`).

### Chrome

1. Construire le paquet : `.\build.ps1 -Target chrome`
2. Decompresser le `.zip` dans un dossier.
3. Ouvrir `chrome://extensions`, activer le Mode developpeur, cliquer sur `Charger l'extension non empaquetee`, selectionner le dossier.

Chrome n'affiche pas d'icone dans la barre d'URL : utilisez l'icone de la barre d'outils toujours visible.

### Edge

1. Construire le paquet : `.\build.ps1 -Target edge`
2. Decompresser le `.zip` dans un dossier.
3. Ouvrir `edge://extensions`, activer le Mode developpeur, cliquer sur `Charger l'extension non empaquetee`, selectionner le dossier.

## Composants principaux

- `manifest.json` : manifeste MV3 (variante Firefox — egalement le default quand on charge le dossier source via `about:debugging`). **Source canonique unique de `version`** pour tout le projet.
- `manifest.chrome.json` : override Chrome/Edge applique au build (remplace `manifest.json` dans le `.zip` empaquete). Le champ `version` ici est auto-synchronise depuis `manifest.json` via `scripts/sync-version.mjs` (hook npm `prebuild`).
- `package.json` : metadonnees npm. Son champ `version` est aussi auto-synchronise depuis `manifest.json` — ne jamais l'editer a la main.
- `background.js` : coordination du service worker et export
- `content.js` : extraction de la page et preparation de l'etat de revision
- `bank-utils.js` : detection de banque, normalisation, suggestions et generation du CSV
- `storage-manager.js` : persistance locale des regles, categories, comptes et historique des suggestions
- `sidebar.html`, `sidebar.js`, `sidebar.css` : interface operationnelle de revision
- `manage.html`, `manage.js`, `manage.css` : page complete de gestion

## Comptes pris en charge

- Desjardins - Bank Account
- Desjardins - Credit Card
- Koho - Prepaid Card

## Modele de suggestion

Les suggestions sont deterministes et 100 % locales.

Criteres actuels :
- au moins 2 occurrences sur la page courante, ou
- au moins 3 occurrences accumulees dans l'historique local des suggestions

L'objectif est de reduire le bruit tout en faisant remonter les payees recurrents non reconnus.

## Build

Par defaut (Firefox) :

```powershell
.\build.ps1
```

Cibler un navigateur :

```powershell
.\build.ps1 -Target firefox   # .xpi
.\build.ps1 -Target chrome    # .zip
.\build.ps1 -Target edge      # .zip
.\build.ps1 -Target all       # les trois artefacts
```

Les artefacts sont ecrits dans `dist/` avec des noms comme `budget-exporter-v1.3.0-<cible>.<ext>` et basculent automatiquement vers un nom horodate si l'archive precedente est verrouillee.

### Bump de la version

La version vit dans **un seul endroit** : le champ `"version"` de `manifest.json`. Pour la changer, editez-y puis lancez `npm run build` (ou `.\build.ps1`) — le hook `prebuild` (`scripts/sync-version.mjs`) propage la nouvelle valeur dans `manifest.chrome.json` et `package.json`. Egalement disponible en standalone : `npm run version:sync`.

Pour les details du build, voir [README-BUILD.md](README-BUILD.md).

## Note

Ce fichier a ete rafraichi pour correspondre a l'architecture actuelle MV3 + barre laterale. Pour le guide detaille le plus complet et le plus a jour, la version PT-BR reste la reference principale :
- [README.detail.pt-br.md](README.detail.pt-br.md)
