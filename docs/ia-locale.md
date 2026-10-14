# IA locale expérimentale — Architecture C

Le prototype utilise l'API expérimentale **LanguageModel** du navigateur lorsqu'elle est présente. Aucun service distant ni clé API ne sont utilisés pour envoyer les réponses. Le navigateur peut toutefois devoir télécharger son modèle lors de la première activation : prévoir une connexion et du stockage. La disponibilité dépend de la version du navigateur, du système et du matériel ; Chrome et autres navigateurs ne la garantissent pas.

## Tester

1. Ouvrir une unité du programme contenant une question courte avec grille de correction (par exemple « les forces » en physique-chimie).
2. Cliquer « Activer l'IA locale » si le navigateur le permet, puis attendre l'initialisation.
3. Soumettre une réponse reformulée ; le correcteur combine grille et proposition du modèle.
4. Réessayer hors connexion après installation complète, puis comparer avec le mode sans IA.

**Important :** un avis positif du LLM ne valide jamais automatiquement une réponse libre. Les réponses ambiguës restent « à confirmer » et l'élève peut consulter la correction. Ce prototype ne certifie ni l'exactitude pédagogique ni le fonctionnement hors ligne sur tous les appareils.

## Prochaines validations

- Mesurer le taux de correction sur un jeu annoté par des enseignants (réponses justes, fausses, incomplètes, contradictoires).
- Tester RAM, latence, cache et téléchargement sur des appareils Android d'entrée de gamme.
- Ajouter des grilles de correction pour les questions ouvertes restantes ; sans grille, repli manuel.
- Évaluer un moteur portable (WebLLM / Transformers.js) si l'API du navigateur est absente, sans rendre le téléchargement obligatoire.

## Prototype Transformers.js / Qwen 0,5B

Installer la dépendance après mise à jour du dépôt : `npm install`. Le bouton « Installer le modèle portable (WebGPU) » est proposé sur les questions ouvertes. L'installation n'est déclenchée qu'après clic. Le modèle `onnx-community/Qwen2.5-0.5B-Instruct` utilise `dtype: q4` et `device: webgpu`. Cette première version ne prend **pas** en charge le CPU/WASM pour ce modèle : si WebGPU échoue, le correcteur déterministe reste actif.

Le téléchargement, le cache, les performances et la disponibilité hors ligne doivent être vérifiés sur chaque catégorie d'appareil. Le modèle ne doit pas décider seul de la maîtrise de la leçon. Le prototype ne propose pas encore de gestion de suppression du cache ni de quotas.

Après `npm install`, exécuter `npm run check`, `npm run test:e2e`, puis `npm run dev`. Tester une question ouverte depuis `/programme/physique-chimie/les-forces`. Les tests automatisés existants ne chargent pas les poids du modèle ; un essai manuel WebGPU est indispensable.
