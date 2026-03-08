# Budget Exporter

Budget Exporter est une extension Firefox qui extrait les transactions depuis des pages bancaires prises en charge, applique des regles locales de normalisation des payees, propose des suggestions deterministes sans IA, puis exporte un CSV revise compatible avec YNAB.

## Architecture actuelle

Le projet cible maintenant Firefox avec Manifest V3 et un flux de travail centre sur la revision :

1. ouvrir une page bancaire prise en charge dans Firefox
2. cliquer sur l'action de l'extension
3. reviser les transactions dans la barre laterale
4. ajuster payee, categorie et memo si necessaire
5. creer de nouvelles regles a partir des suggestions locales
6. exporter le CSV revise

Tout s'execute localement dans le navigateur. Aucun modele IA, aucun traitement distant et aucune synchronisation cloud ne sont requis.

## Composants principaux

- `manifest.json` : manifeste MV3 de l'extension
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

Utilisez :

```powershell
.\build.ps1
```

Le build produit un paquet Firefox `.xpi` et bascule automatiquement vers un nom avec horodatage si l'archive precedente est verrouillee.

Pour les details du build, voir [README-BUILD.md](README-BUILD.md).

## Note

Ce fichier a ete rafraichi pour correspondre a l'architecture actuelle MV3 + barre laterale. Pour le guide detaille le plus complet et le plus a jour, la version PT-BR reste la reference principale :
- [README.detail.pt-br.md](README.detail.pt-br.md)
