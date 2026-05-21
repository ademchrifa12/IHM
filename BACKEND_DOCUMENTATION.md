# 🏠 Backend A-Domicile - Architecture Documentation

## 📋 Vue d'ensemble du projet

Ce backend implémente une plateforme de **services à domicile** sécurisée et robuste avec NestJS, TypeORM et PostgreSQL.

### 🎯 Cas d'utilisation principaux

- **Clients** : S'inscrire, rechercher des services, réserver, commenter
- **Prestataires** : S'inscrire, proposer des services, gérer disponibilité, consulter réservations
- **Admins** : Valider profils, gérer catégories, modérer commentaires, consulter statistiques

---

## 🏗️ Architecture

### Entités principales

```
User (abstract)
├── Client
├── Prestataire
└── Admin

Service
├── Categorie (many-to-many)
├── Region (many-to-many)
├── FicheService
└── Reservation

Reservation
├── Client
├── Prestataire
└── Service

Commentaire
├── Client
└── Service
```

### Modules

```
src/
├── auth/              # Authentification JWT
├── users/             # Gestion utilisateurs
├── services/          # Gestion services
├── reservations/      # Gestion réservations
├── commentaires/      # Gestion commentaires & avis
├── categories/        # Gestion catégories
├── regions/           # Gestion régions
├── entities/          # Entités TypeORM
└── config/            # Configuration base de données
```

---

## 🔐 Sécurité

### Authentification
- **JWT Token** : Bearer tokens avec expiration 7 jours
- **Refresh Token** : Renouvellement avec expiration 30 jours
- **Password Hashing** : bcrypt avec salt

### Autorisation
- **Role-Based Access Control (RBAC)** : client, prestataire, admin
- **Guards JWT** : Validation token sur routes protégées
- **@Roles decorator** : Restriction par rôle

### Headers de sécurité
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### Validation
- **DTO validation** : class-validator
- **Whitelist** : Rejet propriétés non autorisées
- **Type transformation** : Auto-conversion types

---

## 📡 API Endpoints

### 🔑 Authentication

```
POST   /api/auth/register       - Inscription
POST   /api/auth/login          - Connexion
POST   /api/auth/refresh        - Refresh token
```

### 👥 Utilisateurs (Authentifié)

```
GET    /api/users/:id           - Profil utilisateur
PATCH  /api/users/:id           - Modifier profil
DELETE /api/users/:id           - Supprimer compte (admin)
GET    /api/users/type/:type    - Lister par type (admin)
```

### 🛠️ Services

```
GET    /api/services            - Lister services
GET    /api/services/:id        - Détail service
POST   /api/services            - Créer service (prestataire)
PATCH  /api/services/:id        - Modifier service (prestataire)
DELETE /api/services/:id        - Supprimer service (prestataire/admin)
GET    /api/services/search     - Recherche avec filtres
GET    /api/services/prestataire/:id - Services prestataire

POST   /api/services/:id/categories/:catId - Ajouter catégorie
POST   /api/services/:id/regions/:regId    - Ajouter région
```

### 📅 Réservations (Authentifié)

```
GET    /api/reservations        - Lister réservations
GET    /api/reservations/:id    - Détail réservation
POST   /api/reservations        - Créer réservation (client)
PATCH  /api/reservations/:id/status - Changer statut (prestataire/admin)
DELETE /api/reservations/:id    - Annuler réservation
GET    /api/reservations/client/:id      - Réservations client
GET    /api/reservations/prestataire/:id - Réservations prestataire
GET    /api/reservations/status/:status  - Filtrer par statut (admin)
```

### 💬 Commentaires

```
GET    /api/commentaires        - Lister commentaires
GET    /api/commentaires/:id    - Détail commentaire
POST   /api/commentaires        - Créer commentaire (client)
PATCH  /api/commentaires/:id    - Modifier commentaire (client)
DELETE /api/commentaires/:id    - Supprimer commentaire (client/admin)
GET    /api/commentaires/service/:id     - Commentaires service
GET    /api/commentaires/service/:id/rating - Note service
GET    /api/commentaires/client/:id      - Commentaires client

PATCH  /api/commentaires/:id/visibility  - Masquer/afficher (admin)
POST   /api/commentaires/:id/report      - Signaler commentaire
```

### 📂 Catégories (Admin)

```
GET    /api/categories          - Lister catégories
GET    /api/categories/:id      - Détail catégorie
POST   /api/categories          - Créer catégorie
PATCH  /api/categories/:id      - Modifier catégorie
DELETE /api/categories/:id      - Supprimer catégorie
```

### 🗺️ Régions (Admin)

```
GET    /api/regions             - Lister régions
GET    /api/regions/:id         - Détail région
POST   /api/regions             - Créer région
PATCH  /api/regions/:id         - Modifier région
DELETE /api/regions/:id         - Supprimer région
```

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Setup

1. **Cloner & installer**
```bash
cd a-domicile-app
npm install
```

2. **Configurer base de données**
```bash
# Créer base PostgreSQL
createdb a_domicile_db

# Ou via psql
psql -U postgres
> CREATE DATABASE a_domicile_db;
```

3. **Configuration environnement**
```bash
cp .env.example .env
# Éditer .env avec vos paramètres
```

4. **Démarrer développement**
```bash
npm run start:dev
```

L'API sera disponible à `http://localhost:3000`

### Production
```bash
npm run build
npm run start:prod
```

---

## 🧪 Testing

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Avec couverture
npm run test:cov
```

---

## 📊 Statuts Réservation

| Statut | Description |
|--------|-------------|
| `pending` | En attente d'acceptation |
| `accepted` | Acceptée par prestataire |
| `rejected` | Refusée |
| `completed` | Complétée |
| `cancelled` | Annulée |

---

## 🔄 Flux Authentification

```
1. Client POST /auth/register
2. Client POST /auth/login → accessToken + refreshToken
3. Client inclut: Authorization: Bearer <accessToken>
4. Token expire → POST /auth/refresh avec refreshToken
5. Nouveau accessToken généré
```

---

## 🎯 Best Practices Implémentées

✅ **Architecture modulaire** : Chaque domaine isolé  
✅ **Separation of Concerns** : Services, Controllers, Entities distincts  
✅ **Error Handling** : Exceptions HTTP appropriées  
✅ **Input Validation** : DTOs avec validation  
✅ **Type Safety** : TypeScript strict  
✅ **Logging** : Logger NestJS intégré  
✅ **Security** : JWT, bcrypt, headers sécurité  
✅ **CORS** : Configuration flexible  
✅ **Documentation** : Code commenté, README complet  

---

## 📝 Variables Environnement Essentielles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NODE_ENV` | Environnement | development |
| `PORT` | Port serveur | 3000 |
| `DB_HOST` | Host PostgreSQL | localhost |
| `DB_PORT` | Port PostgreSQL | 5432 |
| `DB_USERNAME` | User DB | admin |
| `DB_PASSWORD` | Password DB | *requis* |
| `DB_NAME` | Nom DB | a_domicile_db |
| `JWT_SECRET` | Secret JWT | *requis* |
| `JWT_EXPIRATION` | Expiration token | 7d |

---

## 🐛 Troubleshooting

**Erreur connexion DB :**
```bash
# Vérifier PostgreSQL tournant
sudo service postgresql start

# Tester connexion
psql -U admin -d a_domicile_db
```

**Erreur JWT :**
```bash
# Vérifier JWT_SECRET dans .env (min 32 chars)
# Inclure "Authorization: Bearer <token>" en header
```

**Erreur validation :**
```bash
# Vérifier DTO et données POST/PATCH
# Logs détaillent les champs invalides
```

---

## 📚 Ressources

- [NestJS Docs](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [OWASP Security](https://owasp.org)

---

## 📝 License

UNLICENSED - Propriétaire

---

**Dernière mise à jour** : Mai 2026  
**Version** : 1.0.0
