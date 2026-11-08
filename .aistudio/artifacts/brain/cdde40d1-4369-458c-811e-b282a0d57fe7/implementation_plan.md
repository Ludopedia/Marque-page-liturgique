# Double Marque-page Liturgique pour la Bible (8 par page A4)

Application web interactive pour générer, personnaliser et imprimer des doubles marque-pages bibliques compacts (1re lecture et Évangile séparés, du lundi au samedi, hors dimanches), calibrés précisément au format 4 colonnes × 2 rangées (8 marque-pages par feuille A4).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Choix confirmés lors de la clarification :**
> - **Format de feuille & Dimensions** : 8 marque-pages par feuille A4 disposés en **4 colonnes × 2 rangées** (hauteur ~14 cm, largeur ~4,7 cm), évitant les marque-pages trop longs pour se glisser harmonieusement dans toute Bible de poche ou d'étude sans dépasser de la reliure.
> - **Contenu par marque-page** : 1 paire par mois (1 marque-page 1re lecture / épîtres + 1 marque-page Évangile). Une feuille A4 couvre ainsi **4 mois complets** (ou 2 mois avec doublons pour recto-verso).
> - **Contenu quotidien** : Références bibliques précises (1re lecture, 2e lecture pour les solennités/fêtes, Évangile), indication discrète des fêtes et mémoires liturgiques, **sans case à cocher**. Les dimanches sont exclus comme convenu.
> - **Style visuel** : Esthétique liturgique soignée avec en-têtes sobres en **bordeaux biblique** (`#80182A`) pour les 1res lectures et **bleu nuit profond** (`#162B4D`) pour les Évangiles, typographie classique et lignes de coupe fines avec repères ciseaux `✂`.

---

### 1. Overview & Core Concept

L'application permet au lecteur quotidien de la Bible de s'affranchir des post-its et des écrans en créant des marque-pages physiques élégants, durables et sur-mesure.

- **Double repère Bible** : Un marque-page reste inséré dans l'Ancien Testament / Épîtres, l'autre dans les Évangiles. Plus besoin de manipuler une feuille volante d'un bout à l'autre du livre.
- **Taille optimale** : Avec 14 cm de hauteur, les marque-pages sont parfaitement protégés à l'intérieur de la tranche de la Bible.
- **Autonomie complète** : L'application intègre un calendrier liturgique pré-rempli pour 2026-2027 (immédiatement fonctionnel hors-ligne), une synchronisation en direct avec l'API AELF pour générer n'importe quel mois futur, et la possibilité d'éditer le texte de n'importe quel jour directement au clic avant impression.

---

### 2. User Experience & Visual Design

#### A. Parcours utilisateur
1. **Écran d'accueil & Prévisualisation directe** : Visualisation en direct de la feuille A4 complète avec les 8 marque-pages (par exemple : Novembre 2026, Décembre 2026, Janvier 2027, Février 2027).
2. **Barre de commande supérieure (Top Bar)** :
   - Sélecteur rapide des 4 mois à imprimer sur la planche (ou bouton "Mois en cours + 3 mois suivants").
   - Bouton de chargement automatique via l'API AELF avec indicateur de statut.
   - Bouton "Mode d'impression" avec bascule "Couleur liturgique" ou "Noir & Blanc économique".
   - Bouton principal `Imprimer / Exporter PDF` ouvrant la boîte de dialogue d'impression optimisée CSS `@page`.
3. **Édition instantanée au clic** : Tout texte (titre, date, référence, nom de la fête) est éditable en direct (mode `contenteditable`).
4. **Guides de pliage & collage** : Option d'affichage de repères pour coller dos-à-dos les mois (ex: Nov / Déc) et créer 4 marque-pages recto-verso rigides.

#### B. Géométrie & Mathématiques spatiales d'impression (Feuille A4)
```
┌───────────────────────────────── 210 mm ────────────────────────────────┐
│  Marges : 6mm gauche/droite, 7mm haut/bas                              │
│                                                                        │
│  Rangée 1 (H: 138mm) :                                                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐               │
│  │ Mois 1-Lect│ │ Mois 1-Évg│ │ Mois 2-Lect│ │ Mois 2-Évg│   (L: 47mm)  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘               │
│  - - - - - - - - - - - Trait de coupe horizontal - - - - - - - - - - - │ 297 mm
│  Rangée 2 (H: 138mm) :                                                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐               │
│  │ Mois 3-Lect│ │ Mois 3-Évg│ │ Mois 4-Lect│ │ Mois 4-Évg│   (L: 47mm)  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘               │
└────────────────────────────────────────────────────────────────────────┘
```

#### C. Charte graphique & Typographie
- **Typographie** : 
  - Titres et en-têtes : *Cinzel* / *Cormorant Garamond* (caractère liturgique noble et solennel).
  - Références bibliques et dates : *Plus Jakarta Sans* / *DM Sans* avec chiffres tabulaires (`tabular-nums`) pour un alignement vertical parfait et une lisibilité cristalline en petits corps (6.5pt à 7.5pt).
- **Couleurs** :
  - En-tête 1re Lecture : Rouge liturgique / bordeaux `#80182A` avec texte blanc.
  - En-tête Évangile : Bleu nuit profond `#162B4D` avec texte blanc.
  - Séparateurs de semaine : Hairline discret `rgba(0,0,0,0.12)`.
  - Badge 2e lecture / Fête : Tag subtil non-pill `text-stone-600 font-medium italic text-[6pt]`.

---

### 3. Key Product Decisions & Trade-Offs

- **Décision 1 : 8 marque-pages par feuille A4 (4 mois par feuille)**
  - *Approche choisie* : Grille 4 colonnes × 2 rangées.
  - *Bénéfice* : Format de 13,8 cm de haut, idéal pour les bibles de tout format (qui mesurent en général entre 15 et 22 cm). La feuille A4 permet d'imprimer 4 mois en un seul passage (ou 2 mois recto-verso).
- **Décision 2 : Données intégrées (Offline First) + API AELF dynamique**
  - *Approche choisie* : Données liturgiques précises pour 2026-2027 pré-chargées dans le code source + connecteur API AELF officiel avec proxy / fallback pour tout autre mois ou année future.
  - *Bénéfice* : L'utilisateur peut imprimer immédiatement sans attendre de requêtes réseau, même sans connexion ou en cas d'indisponibilité du serveur AELF.
- **Décision 3 : Pas de cases à cocher (typographie ultra-dense et soignée)**
  - *Approche choisie* : Suppression des cases à cocher au profit d'un gain de place en largeur, permettant aux références longues (ex: `1 Co 3, 9c-11.16-17`) de ne pas déborder.

---

### 4. Architecture Technique & Composants

```
┌──────────────────────────────────────────────────────────────┐
│                       Interface React                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Top Control Bar                                        │  │
│  │ [Sélecteur 4 Mois] [Charger AELF] [Mode N&B] [Imprimer]│  │
│  └────────────────────────────────────────────────────────┘  │
│                               │                              │
│                               ▼                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ A4 Sheet Container (Scale-to-fit preview & @media print)│  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐ ... [8 Marque-pages]│  │
│  │  │ BookmarkItem │  │ BookmarkItem │                    │  │
│  │  │  (1re Lect)  │  │  (Évangile)  │                    │  │
│  │  └──────────────┘  └──────────────┘                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
       [Cache Liturgique Local]       [Service API AELF]
       (Nov 2026 - Déc 2027)          (Requêtes dynamiques)
```

- **Composants clés** :
  - `SheetPreview` : Rendu à l'échelle pour l'écran avec zoom interactif et rendu fidèle 1:1 en impression.
  - `BookmarkCard` : Rendu individuel d'un marque-page avec gestion des semaines, césures des références, badges de fêtes liturgiques, et zones `contenteditable`.
  - `MonthSelectorModal` : Dialogue intuitif pour sélectionner facilement la combinaison des 4 mois à imprimer.
  - `PrintStylesheet` : Règles CSS d'impression strictes (`size: A4 portrait; margin: 6mm; print-color-adjust: exact`).

---

### Prochaine Étape
Après votre validation de ce plan, nous procéderons à l'implémentation complète dans le projet avec compilation et tests d'impression.
