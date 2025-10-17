# Budget Exporter

Une extension Firefox qui simplifie radicalement l’exportation des transactions bancaires vers un CSV compatible YNAB (You Need A Budget).

## 🎯 Motivation

Gérer ses finances personnelles est essentiel, mais l’importation des transactions bancaires dans des outils comme YNAB est souvent **fastidieuse et sujette aux erreurs**.

### Le problème

Sans cette extension, le processus manuel implique :

1. **Visiter plusieurs sites bancaires** — Se connecter à chaque banque séparément
2. **Naviguer dans des interfaces incohérentes** — Chaque banque a sa propre structure
3. **Exporter les transactions** — Souvent dans des formats incompatibles (OFX, PDF, CSV propriétaire)
4. **Convertir les formats** — À l’aide d’outils externes ou de feuilles de calcul
5. **Standardiser les bénéficiaires** — Nettoyer et normaliser les descriptions de marchands
   - « NETFLIX.COM*ASSINATU » → « Netflix »
   - « UBER *TRIP 12345678 » → « Uber »
   - « PAG*MERCADO123456 » → « Épicerie »
6. **Catégorisation manuelle** — Attribuer une catégorie à chaque transaction
7. **Importer dans YNAB** — Téléversement et validation finale

**Temps estimé :** 15–30 minutes par banque et par mois
**Erreurs fréquentes :** doublons, mauvaises catégories, formatage incohérent
**Frustration :** Élevée 😤

### La solution

Avec Budget Exporter, le processus devient :

1. **Ouvrir la page de votre banque** dans Firefox
2. **Cliquer sur l’icône de l’extension**
3. **Télécharger un CSV prêt à importer** — formaté, catégorisé et standardisé

**Temps estimé :** 30 secondes
**Erreurs :** Presque zéro
**Frustration :** Aucune 😊

## ✨ Fonctionnalités clés

### Automatisation intelligente
- Extraction automatique des transactions directement depuis la page bancaire
- Conversion instantanée en CSV compatible YNAB
- Détection automatique de la banque selon l’URL

### Gestion des règles
- **Règles de bénéficiaire (payee)** : Transformez les descriptions bruyantes en noms propres
  - Support du texte simple et des expressions régulières (regex)
  - Substitutions avec groupes de capture
- **Catégorisation automatique** : Attribuez des catégories selon des motifs
- **Modèles de mémo** : Ajoutez des détails contextuels

### Interface conviviale
- Page de gestion avec Bootstrap 5.3
- Recherche de règles en temps réel
- Champs recherchables pour comptes et catégories
- Pagination automatique pour de grands ensembles de règles
- Design réactif et intuitif

### Multi‑banques
- Configuration flexible par compte/banque
- Règles spécifiques ou globales (appliquées à tous les comptes)
- Ajout facile de nouvelles banques

## 🚀 Utilisation

1. **Installer l’extension** dans Firefox
2. **Configurer vos règles** (optionnel) :
   - Cliquez sur l’icône de l’extension
   - Ouvrez « Gérer les règles »
   - Ajoutez des comptes, catégories et règles de bénéficiaire
3. **Ouvrez votre banque en ligne**
4. **Cliquez sur l’icône de l’extension**
5. **Téléchargez le CSV** — Prêt pour YNAB !

## 🛠️ Développement

### Technologies

#### Frontend
- **HTML5** — Structure sémantique
- **CSS3** — Styles personnalisés
- **Bootstrap 5.3** — Framework UI moderne et réactif
- **Bootstrap Icons** — Icônes SVG

#### JavaScript
- **JavaScript Vanilla (ES6+)** — Sans dépendances externes
  - Promesses et Async/Await
  - Modules ES6
  - Fonctions fléchées
  - Déstructuration
  - Gabarits de chaînes (template literals)
- **API WebExtensions** (Firefox)
  - `browser.storage.local` — Stockage persistant
  - `browser.tabs` — Manipulation des onglets
  - `browser.runtime` — Communication entre composants
  - Scripts de contenu — Code injecté dans les pages

#### Architecture
- **Scripts de contenu** — Exécutés dans le contexte de la page web
  - Extraction des données du DOM
  - Détection automatique de la banque
  - Application des règles de transformation
- **Scripts d’arrière‑plan** — Gestion des événements globaux
- **UI Popup** — Interface principale de l’extension
- **Page de gestion** — Interface de configuration

### Structure du projet

```
budget-exporter/
├── manifest.json              # Configuration de l’extension
├── background.js              # Script d’arrière‑plan
├── popup.html                 # Interface principale
├── popup.js                   # Logique du popup
├── manage.html                # Page de gestion
├── manage.js                  # Logique (pagination, recherche)
├── manage.css                 # Styles personnalisés
├── storage-manager.js         # Abstraction du stockage
├── icon.svg                   # Icône principale
├── icons/                     # Icônes multi‑tailles
│   ├── icon-48.png
│   ├── icon-96.png
│   └── icon-128.png
└── content-scripts/           # Scripts par banque
    ├── koho.js                # Extracteur Koho
    ├── desjardins.js          # Extracteur Desjardins
    └── ...                    # Autres
```

### Modèles de code

#### Storage Manager
Abstraction pour gérer les données :
```javascript
await StorageManager.init();
const rules = await StorageManager.getPayeeRules();
await StorageManager.addPayeeRule({ pattern, replacement, category });
```

#### Règles de bénéficiaire
Structure des données :
```javascript
{
  id: Number,              // Horodatage unique
  bankId: Number,          // ID du compte/banque (0 = tous)
  pattern: String,         // Texte ou regex
  replacement: String,     // Nouveau bénéficiaire
  category: String,        // Catégorie YNAB
  isRegex: Boolean,        // Utilise une regex ?
  memoTemplate: String,    // Modèle avec \1, \2, etc.
  enabled: Boolean         // Activer/désactiver
}
```

#### Scripts de contenu
Chaque banque a son propre extracteur :
```javascript
function extractTransactions() {
  // 1. Sélectionner les éléments du DOM
  // 2. Extraire les données (date, bénéficiaire, montant)
  // 3. Appliquer les règles de transformation
  // 4. Retourner un tableau de transactions
}
```

### Build et distribution

#### Prérequis
- PowerShell 5.1+ (Windows)
- Firefox Developer Edition (recommandé pour les tests)

#### Build automatisé

Exécutez le script :
```powershell
.\build.ps1
```

Le script :
1. Lit la version de `manifest.json`
2. Crée le dossier `dist/`
3. Copie uniquement les fichiers nécessaires
4. Exclut les fichiers non requis (.git, .md, node_modules)
5. Produit une archive ZIP versionnée : `budget-exporter-v1.0.0-YYYYMMDD-HHMMSS.zip`
6. Valide la structure de base
7. Affiche les informations du paquet
8. Ouvre automatiquement le dossier `dist/`

#### Contenu du paquet

Le ZIP inclut :
- `manifest.json`
- Fichiers JavaScript (`.js`)
- Fichiers HTML (`.html`)
- Fichiers CSS (`.css`)
- Icônes (`.svg`, dossier `icons/`)
- Scripts de contenu (`content-scripts/`)

Exclus de l’archive :
- Documentation (`.md`)
- Contrôle de version (`.git`)
- Fichiers temporaires (`.log`, `.tmp`)
- Fichiers système (`.DS_Store`, `Thumbs.db`)

#### Tests locaux

Avant la publication :
```
1. Firefox → about:debugging
2. « This Firefox » → « Load Temporary Add-on »
3. Sélectionner le ZIP généré
4. Tester toutes les fonctionnalités
```

#### Soumission à Mozilla

1. **Aller sur :** https://addons.mozilla.org/developers/
2. **Submit a New Add-on**
3. **Choisir le type :**
   - **Listed** — Apparaît dans la boutique (révision manuelle)
   - **Self‑distributed** — Distribution autonome (signature automatique)
4. **Téléverser** le ZIP produit
5. **Remplir les informations :**
   - Nom, description, catégorie
   - Captures d’écran (optionnel mais recommandé)
   - Notes de confidentialité
6. **Attendre l’approbation** (listed) ou **signature automatique** (self‑distributed)

### Fonctions techniques avancées

#### Recherche en temps réel
- Filtre les règles à la frappe
- Validation visuelle (rouge pour < 3 caractères)
- Debounce automatique

#### Listes déroulantes recherchables
- Champ + liste combinés
- Filtrage dynamique des options
- Raccourcis clavier (Ctrl+F pour recherche globale)

#### Pagination intelligente
- 10 éléments par page (paramétrable)
- Navigation précédente/suivante
- Ajustement automatique lors des suppressions
- Réinitialisation lors des ajouts/modifications

#### Validation de formulaires
- Vérification du compte/banque requis
- Validation de regex
- Feedback visuel des erreurs
- Prévention des doublons

### Extensibilité

#### Ajouter une nouvelle banque

1. **Créer un script de contenu :**
```javascript
// content-scripts/nouvelle-banque.js
function extractTransactions() {
  const transactions = [];
  // Votre logique d’extraction ici
  return transactions;
}
```

2. **Déclarer dans manifest.json :**
```json
{
  "matches": ["*://*.nouvellebanque.com/*"],
  "js": ["content-scripts/nouvelle-banque.js"]
}
```

3. **Ajouter dans l’interface :**
   - Gérer → Comptes → Ajouter « Nouvelle banque »

#### Personnaliser le format de sortie

Modifiez la fonction de conversion CSV dans chaque script de contenu :
```javascript
function convertToYNABFormat(transactions) {
  // Adaptation selon vos besoins
  return csvString;
}
```

## 📝 Feuille de route

Fonctionnalités prévues :
- [ ] Support Chrome/Edge
- [ ] Import/export des règles
- [ ] Synchronisation cloud optionnelle
- [ ] Détection automatique des doublons
- [ ] Tableau de bord avec statistiques
- [ ] Mode sombre

## 🤝 Contribution

Les contributions sont bienvenues ! Pour ajouter une nouvelle banque :

1. Fork du dépôt
2. Créez votre script dans `content-scripts/`
3. Testez localement
4. Ouvrez une Pull Request

## 📄 Licence

Projet open source. Voir le fichier LICENSE pour les détails.

## 🙏 Remerciements

- **YNAB** — Pour l’excellent outil de budget
- **Équipe Bootstrap** — Pour le framework UI
- **Mozilla** — Pour la plateforme d’extensions robuste
- **Communauté open source** — Pour l’inspiration et les retours

---

Développé avec ❤️ par Valtoni Boaventura pour simplifier votre vie financière.
