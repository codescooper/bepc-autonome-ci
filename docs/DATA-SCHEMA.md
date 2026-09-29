# Schéma pédagogique

Chaque unité pédagogique doit pouvoir être consommée par une application offline.

```json
{
  "id": "3e-maths-example",
  "level": "3e",
  "subject": "mathematiques",
  "competency": "",
  "theme": "",
  "lesson": "",
  "objectives": [],
  "prerequisites": [],
  "skills": [],
  "estimated_minutes": null,
  "bepc_priority": null,
  "resources": [],
  "exercises": [],
  "source_ids": [],
  "verification_status": "to_verify"
}
```

## Principes

1. Une information curriculaire doit pointer vers au moins une source.
2. Une ressource externe n'est pas copiée automatiquement.
3. Les exercices et explications créés pour ce projet doivent être identifiables comme contenus originaux.
4. Les données doivent rester lisibles sans serveur ni connexion Internet.
5. La progression de l'élève sera stockée séparément du curriculum.
