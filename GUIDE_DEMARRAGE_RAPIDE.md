# 🚀 GUIDE DE DÉMARRAGE RAPIDE - Nouvelle Architecture

## ⚡ TL;DR (Résumé exécutif)

La structure a été refactorisée pour suivre exactement le diagramme UML fourni. Les changements clés :

1. **FicheService supprimé** → Logique consolidée dans Service
2. **Avis créé** avec héritage STI (Commentaire, Note)
3. **Disponibilité créée** pour gérer créneaux Prestataire
4. **ServiceCategorie créée** pour composition Categorie-Service
5. **Commentaires migré** vers la nouvelle structure Avis

---

## 🔧 **Installation & Configuration**

### Étape 1 : Mettre à jour les dépendances
```bash
cd a-domicile-app
npm install
```

### Étape 2 : Générer et exécuter les migrations
```bash
# Générer la migration basée sur les entités
npm run typeorm migration:generate -- -n RefactorArchitecture

# Exécuter la migration
npm run typeorm migration:run
```

### Étape 3 : Vérifier la compilation
```bash
npm run build
```

### Étape 4 : Lancer l'application
```bash
npm run start:dev
```

---

## 📚 **Utiliser les Nouveaux Endpoints**

### **1. Créer un Avis (Commentaire)**

```bash
curl -X POST http://localhost:3000/avis \
  -H "Content-Type: application/json" \
  -d '{
    "note": 5,
    "contenu": "Excellent service!",
    "idReservation": "550e8400-e29b-41d4-a716-446655440000",
    "typeAvis": "commentaire"
  }'
```

**Réponse** :
```json
{
  "idAvis": "550e8400-e29b-41d4-a716-446655440001",
  "note": 5,
  "contenu": "Excellent service!",
  "typeAvis": "commentaire",
  "estVisible": true,
  "nombreSignalement": 0,
  "dateCreation": "2026-05-21T10:00:00Z",
  "idReservation": "550e8400-e29b-41d4-a716-446655440000"
}
```

### **2. Créer une Note**

```bash
curl -X POST http://localhost:3000/avis \
  -H "Content-Type: application/json" \
  -d '{
    "note": 4,
    "idReservation": "550e8400-e29b-41d4-a716-446655440000",
    "typeAvis": "note"
  }'
```

### **3. Créer une Disponibilité**

```bash
curl -X POST http://localhost:3000/disponibilites \
  -H "Content-Type: application/json" \
  -d '{
    "joursDisponibles": [0, 1, 2, 3, 4],
    "heureDebut": "09:00",
    "heureFin": "18:00",
    "idPrestataire": "550e8400-e29b-41d4-a716-446655440002",
    "notes": "Disponibilité standard"
  }'
```

### **4. Ajouter une Catégorie à un Service (ServiceCategorie)**

```bash
curl -X POST http://localhost:3000/service-categories \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Service Premium",
    "description": "Service haut de gamme avec premium",
    "idService": "550e8400-e29b-41d4-a716-446655440003",
    "idCategorie": "550e8400-e29b-41d4-a716-446655440004"
  }'
```

### **5. Récupérer les Avis d'une Réservation**

```bash
curl http://localhost:3000/avis/reservation/550e8400-e29b-41d4-a716-446655440000
```

**Réponse** :
```json
[
  {
    "idAvis": "550e8400-e29b-41d4-a716-446655440001",
    "note": 5,
    "contenu": "Excellent service!",
    "typeAvis": "commentaire",
    "dateCreation": "2026-05-21T10:00:00Z"
  }
]
```

### **6. Récupérer Note Moyenne**

```bash
curl http://localhost:3000/avis/reservation/550e8400-e29b-41d4-a716-446655440000/moyenne
```

**Réponse** : `4.5` (note moyenne)

---

## 🏗️ **Architecture TypeScript (Exemples)**

### Utiliser AvisService

```typescript
import { AvisService } from './avis/avis.service';
import { CreateAvisDto, AvisType } from './dto';

@Injectable()
export class MyService {
  constructor(private avisService: AvisService) {}

  async ajouterCommentaire(idReservation: string, note: number, contenu: string) {
    const avisDto: CreateAvisDto = {
      note,
      contenu,
      idReservation,
      typeAvis: AvisType.COMMENTAIRE,
    };
    
    return this.avisService.create(avisDto);
  }
}
```

### Utiliser DisponibiliteService

```typescript
import { DisponibiliteService } from './disponibilites/disponibilite.service';

@Injectable()
export class ReservationService {
  constructor(private dispoService: DisponibiliteService) {}

  async verifierDisponibilite(idPrestataire: string, date: Date): Promise<boolean> {
    const dayOfWeek = date.getDay();
    const disponibilites = await this.dispoService.findActiveForDay(
      idPrestataire,
      dayOfWeek
    );
    
    return disponibilites.length > 0;
  }
}
```

### Utiliser ServiceCategorieService

```typescript
import { ServiceCategorieService } from './service-categories/service-categorie.service';

@Injectable()
export class ServiceService {
  constructor(private serviceCategorieService: ServiceCategorieService) {}

  async getServiceCategories(idService: string) {
    return this.serviceCategorieService.findByService(idService);
  }
}
```

---

## 🗄️ **Schéma de Base de Données (Références)**

### Table `avis` (STI avec discriminator)
```sql
CREATE TABLE "avis" (
  "idAvis" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "note" integer,
  "contenu" text,
  "typeAvis" varchar(50) NOT NULL,  -- 'commentaire' ou 'note'
  "estVisible" boolean DEFAULT true,
  "nombreSignalement" integer DEFAULT 0,
  "dateCreation" timestamp DEFAULT CURRENT_TIMESTAMP,
  "dateModification" timestamp DEFAULT CURRENT_TIMESTAMP,
  "idReservation" uuid NOT NULL REFERENCES "reservations"("idReservation") ON DELETE CASCADE
);
```

### Table `disponibilites`
```sql
CREATE TABLE "disponibilites" (
  "idDisponibilite" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "joursDisponibles" int[] NOT NULL,  -- Array [0,1,2,3,4]
  "heureDebut" time NOT NULL,
  "heureFin" time NOT NULL,
  "estActive" boolean DEFAULT true,
  "notes" text,
  "dateCreation" timestamp DEFAULT CURRENT_TIMESTAMP,
  "dateModification" timestamp DEFAULT CURRENT_TIMESTAMP,
  "idPrestataire" uuid NOT NULL REFERENCES "prestataires"("idPrestataire") ON DELETE CASCADE
);
```

### Table `service_categories` (Composition)
```sql
CREATE TABLE "service_categories" (
  "idServiceCategorie" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "nom" varchar(255) NOT NULL,
  "description" text,
  "dateCreation" timestamp DEFAULT CURRENT_TIMESTAMP,
  "idCategorie" uuid NOT NULL REFERENCES "categories"("idCategorie") ON DELETE CASCADE,
  "idService" uuid NOT NULL REFERENCES "services"("idService") ON DELETE CASCADE,
  UNIQUE("idCategorie", "idService")
);
```

---

## 🔀 **Migration des Anciennes Données**

Si vous aviez des données avec l'ancienne structure Commentaire :

```typescript
// Script de migration TypeORM
import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateCommentsToAvis1621234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Exemple : Mapper les anciennes colonnes vers Avis
    await queryRunner.query(`
      INSERT INTO avis (
        "idAvis", "note", "contenu", "typeAvis", "estVisible", 
        "dateCreation", "dateModification", "idReservation"
      )
      SELECT 
        gen_random_uuid(),
        "note",
        "contenu",
        'commentaire',
        "estVisible",
        "dateCreation",
        "dateModification",
        "idReservation"  -- À adapter selon votre structure
      FROM "commentaires"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback si nécessaire
  }
}
```

---

## ✅ **Checklist de Validation**

- [ ] Installation des dépendances (`npm install`)
- [ ] Migrations TypeORM exécutées avec succès
- [ ] Application compile sans erreur (`npm run build`)
- [ ] Tests unitaires passent (`npm test`)
- [ ] Tests E2E passent (`npm run test:e2e`)
- [ ] Endpoints Avis testés
- [ ] Endpoints Disponibilité testés
- [ ] Endpoints ServiceCategorie testés
- [ ] Rétrocompatibilité Commentaires vérifiée
- [ ] Performance vérifiée (requêtes < 500ms)

---

## 🐛 **Troubleshooting**

### Erreur : "FicheService not found"
**Solution** : Nettoyer les imports résiduels, la table a été supprimée.

```bash
# Rechercher les références restantes
grep -r "FicheService" src/ --include="*.ts"
```

### Erreur : "Discriminator column not found in Avis"
**Solution** : Vérifier que TypeORM supporte les discriminators pour votre version.

```typescript
// Vérifier que c'est bien dans l'entité
@Discriminator({ column: { type: 'varchar', name: 'typeAvis' } })
export class Avis { ... }
```

### Erreur de migration TypeORM
**Solution** : Recréer les migrations

```bash
npm run typeorm migration:revert
npm run typeorm migration:generate -- -n RefactorArchitectureV2
npm run typeorm migration:run
```

---

## 📖 **Documentation Complète**

Pour plus de détails, consultez :
- 📋 `ARCHITECTURE_REFACTORISATION.md` - Documentation technique complète
- 📝 `CHANGELOG_REFACTORISATION.md` - Liste détaillée des changements
- 🎯 `PROJECT_STRUCTURE.md` - Structure du projet (à jour)

---

## 💡 **Conseils et Bonnes Pratiques**

1. **Toujours valider les entités avant sauvegarde**
   ```typescript
   const errors = await validate(avisDto);
   if (errors.length > 0) throw new BadRequestException(errors);
   ```

2. **Charger les relations au besoin**
   ```typescript
   // Lazy loading au lieu d'eager
   const avis = await repo.findOne(id, { relations: ['reservation'] });
   ```

3. **Gérer les erreurs proprement**
   ```typescript
   try {
     return await this.avisService.create(dto);
   } catch (error) {
     throw new ConflictException('Erreur lors de la création');
   }
   ```

4. **Utiliser les transactions pour cohérence**
   ```typescript
   return this.dataSource.transaction(async (manager) => {
     // Opérations atomiques ici
   });
   ```

---

**Dernière mise à jour** : 21 Mai 2026
**Statut** : ✅ Prêt pour déploiement
**Support** : Voir ARCHITECTURE_REFACTORISATION.md pour assistance
