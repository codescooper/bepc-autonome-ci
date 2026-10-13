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
