# 📁 A-Domicile Backend - Structure du Projet

```
a-domicile-app/
│
├── 📄 Configuration & Documentation
│   ├── .env                              ✅ Variables environnement
│   ├── .env.example                      ✅ Template configuration
│   ├── package.json                      ✅ Dépendances mises à jour
│   ├── tsconfig.json                     ✅ TypeScript config
│   ├── nest-cli.json                     ✅ NestJS config
│   ├── eslint.config.mjs                 ✅ Linting config
│   │
│   ├── 📚 Documentation
│   ├── README.md                         📖 Projet overview
│   ├── BACKEND_DOCUMENTATION.md          📖 API complète (300+ lignes)
│   ├── SETUP.md                          📖 Installation guide (200+ lignes)
│   ├── PROJECT_SUMMARY.md                📖 Résumé complet (300+ lignes)
│   └── COMPLETION_REPORT.md              📖 Rapport final (400+ lignes)
│
├── 📂 src/
│   │
│   ├── 🔑 Authentication
│   │   ├── auth.service.ts               ✅ JWT, bcrypt, tokens
│   │   ├── auth.controller.ts            ✅ Register, Login, Refresh
│   │   ├── auth.module.ts                ✅ Module configuration
│   │   └── jwt-auth.guard.ts             ✅ Guard + RBAC
│   │
│   ├── 👥 Users Module
│   │   ├── users.service.ts              ✅ CRUD + validation
│   │   ├── users.controller.ts           ✅ User endpoints
│   │   └── users.module.ts               ✅ Module configuration
│   │
│   ├── 🛠️ Services Module
│   │   ├── services.service.ts           ✅ CRUD + search + filters
│   │   ├── services.controller.ts        ✅ Service endpoints
│   │   └── services.module.ts            ✅ Module configuration
│   │
│   ├── 📅 Reservations Module
│   │   ├── reservations.service.ts       ✅ CRUD + status management
│   │   ├── reservations.controller.ts    ✅ Reservation endpoints
│   │   └── reservations.module.ts        ✅ Module configuration
│   │
│   ├── 💬 Comments Module
│   │   ├── commentaires.service.ts       ✅ CRUD + ratings + modération
│   │   ├── commentaires.controller.ts    ✅ Comments endpoints
│   │   └── commentaires.module.ts        ✅ Module configuration
│   │
│   ├── 📂 Categories Module
│   │   ├── categories.service.ts         ✅ CRUD + relations
│   │   ├── categories.controller.ts      ✅ Category endpoints
│   │   └── categories.module.ts          ✅ Module configuration
│   │
│   ├── 🗺️ Regions Module
│   │   ├── regions.service.ts            ✅ CRUD + relations
│   │   ├── regions.controller.ts         ✅ Region endpoints
│   │   └── regions.module.ts             ✅ Module configuration
│   │
│   ├── 🗄️ Database & Entities
│   │   └── entities/
│   │       ├── user.entity.ts            ✅ User (abstract)
│   │       ├── client.entity.ts          ✅ Client profile
│   │       ├── prestataire.entity.ts     ✅ Prestataire profile
│   │       ├── admin.entity.ts           ✅ Admin profile
│   │       ├── service.entity.ts         ✅ Service (many-to-many)
│   │       ├── reservation.entity.ts     ✅ Reservation (5 statuts)
│   │       ├── commentaire.entity.ts     ✅ Comment (ratings 1-5)
│   │       ├── categorie.entity.ts       ✅ Category
│   │       ├── region.entity.ts          ✅ Region
│   │       └── fiche-service.entity.ts   ✅ Service detail sheet
│   │
│   ├── ⚙️ Configuration
│   │   └── config/
│   │       ├── database.config.ts        ✅ TypeORM configuration
│   │       ├── app.constants.ts          ✅ App constants & rules
│   │       └── jwt.config.ts             (Optional in constants)
│   │
│   ├── 🎯 DTOs & Validation
│   │   └── dto/
│   │       └── index.ts                  ✅ 14 DTOs complètes
│   │           ├── RegisterDto
│   │           ├── LoginDto
│   │           ├── CreateUserDto
│   │           ├── CreateServiceDto
│   │           ├── CreateReservationDto
│   │           ├── CreateCommentaireDto
│   │           └── ... (+ 8 more)
│   │
│   ├── 🛡️ Guards & Decorators
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts        ✅ @Public, @RequireRoles
│   │   └── filters/
│   │       └── all-exceptions.filter.ts  ✅ Global error handler
│   │
│   ├── 💾 Database
│   │   └── database/
│   │       └── seeds.ts                  ✅ Test data templates
│   │
│   ├── 📦 Bootstrap
│   │   ├── app.module.ts                 ✅ Root module
│   │   ├── app.controller.ts             (Keep for health check)
│   │   ├── app.service.ts                (Keep for health check)
│   │   └── main.ts                       ✅ Entry point + security
│   │
│
├── 📂 test/
│   ├── app.e2e-spec.ts                   (Optional - tests E2E)
│   └── jest-e2e.json                     (Optional - jest config)
│
├── 📂 scripts/
│   └── setup-db.sh                       ✅ Database setup automatisé
│
├── 📄 Root Configuration Files
│   ├── README.md                         📖 Project overview
│   ├── .gitignore
│   ├── .prettierrc
│   └── tsconfig.build.json
│
└── node_modules/                         (After npm install)

```

---

## 🎯 Quick Navigation Guide

### Pour démarrer
→ Voir `SETUP.md`

### Pour utiliser l'API
→ Voir `BACKEND_DOCUMENTATION.md`

### Pour comprendre l'architecture
→ Voir `PROJECT_SUMMARY.md`

### Pour détails complets
→ Voir `COMPLETION_REPORT.md`

---

## 📊 Module Breakdown

### 7 Modules Métier

```
AuthModule
  ├─ Controllers: 1 (auth.controller)
  ├─ Services: 1 (auth.service)
  ├─ Guards: 1 (jwt-auth.guard)
  └─ Exports: JWT, Auth service, Guard

UsersModule
  ├─ Controllers: 1 (users.controller)
  ├─ Services: 1 (users.service)
  ├─ Entities: 4 (User, Client, Prestataire, Admin)
  └─ Relations: Depends on AuthModule

ServicesModule
  ├─ Controllers: 1 (services.controller)
  ├─ Services: 1 (services.service)
  ├─ Entities: 4 (Service, FicheService, Categorie, Region)
  └─ Features: Search, filters, many-to-many

ReservationsModule
  ├─ Controllers: 1 (reservations.controller)
  ├─ Services: 1 (reservations.service)
  ├─ Entities: 1 (Reservation - 5 statuts)
  └─ Features: Status management, filtering

CommentairesModule
  ├─ Controllers: 1 (commentaires.controller)
  ├─ Services: 1 (commentaires.service)
  ├─ Entities: 1 (Commentaire - ratings)
  └─ Features: Modération, visibility toggle

CategoriesModule
  ├─ Controllers: 1 (categories.controller)
  ├─ Services: 1 (categories.service)
  ├─ Entities: 1 (Categorie)
  └─ Features: CRUD simple

RegionsModule
  ├─ Controllers: 1 (regions.controller)
  ├─ Services: 1 (regions.service)
  ├─ Entities: 1 (Region)
  └─ Features: CRUD simple

AppModule (Root)
  ├─ Imports: All 7 modules above
  ├─ Providers: AppService
  ├─ Controllers: AppController (health check)
  └─ Features: TypeORM config, ConfigModule
```

---

## 🔐 Security Layers

```
Layer 1: Transport
  └─ HTTPS (HSTS header configured)

Layer 2: CORS
  └─ Configurable origin, credentials

Layer 3: Authentication
  └─ JWT Bearer tokens (HS256)

Layer 4: Authorization
  └─ RBAC via @Roles decorator

Layer 5: Input Validation
  └─ DTOs with class-validator

Layer 6: Password Security
  └─ bcrypt (10 rounds)

Layer 7: Error Handling
  └─ Global exception filter (no stack traces)

Layer 8: Headers
  ├─ X-Content-Type-Options: nosniff
  ├─ X-Frame-Options: DENY
  ├─ X-XSS-Protection: 1; mode=block
  └─ Strict-Transport-Security: HSTS
```

---

## 📡 API Route Hierarchy

```
/api
├── /auth                    (Public)
│   ├── POST /register
│   ├── POST /login
│   └── POST /refresh
│
├── /users                   (Authenticated)
│   ├── GET /:id
│   ├── PATCH /:id
│   ├── DELETE /:id
│   └── GET /type/:type (Admin)
│
├── /services               (Mixed)
│   ├── GET / (Public)
│   ├── GET /:id (Public)
│   ├── GET /search (Public)
│   ├── POST / (Prestataire)
│   ├── PATCH /:id (Prestataire)
│   ├── DELETE /:id (Prestataire/Admin)
│   └── POST /:id/categories/:catId
│   └── POST /:id/regions/:regId
│
├── /reservations           (Authenticated)
│   ├── GET /
│   ├── GET /:id
│   ├── POST / (Client)
│   ├── PATCH /:id/status (Prestataire)
│   ├── DELETE /:id
│   ├── GET /client/:id
│   ├── GET /prestataire/:id
│   └── GET /status/:status (Admin)
│
├── /commentaires           (Mixed)
│   ├── GET / (Public)
│   ├── GET /:id (Public)
│   ├── GET /service/:id (Public)
│   ├── GET /service/:id/rating (Public)
│   ├── POST / (Client)
│   ├── PATCH /:id (Client)
│   ├── DELETE /:id (Client/Admin)
│   ├── PATCH /:id/visibility (Admin)
│   └── POST /:id/report
│
├── /categories             (Mixed)
│   ├── GET / (Public)
│   ├── GET /:id (Public)
│   ├── POST / (Admin)
│   ├── PATCH /:id (Admin)
│   └── DELETE /:id (Admin)
│
└── /regions                (Mixed)
    ├── GET / (Public)
    ├── GET /:id (Public)
    ├── POST / (Admin)
    ├── PATCH /:id (Admin)
    └── DELETE /:id (Admin)
```

---

## 💾 Database Schema Overview

```
ENTITIES & RELATIONSHIPS:

User (Abstract)
├── id: uuid (PK)
├── nom, prenom
├── email (UNIQUE)
├── motDePasse (hashed)
├── typeUtilisateur (ENUM: client, prestataire, admin)
├── timestamp metadata
└── Relationships:
    ├─ One-to-One: Client
    ├─ One-to-One: Prestataire
    └─ One-to-One: Admin

Service
├── id: uuid (PK)
├── titre, description
├── prix (float)
├── experienceRequise
├── idPrestataire (FK)
└── Relationships:
    ├─ Many-to-Many: Categorie
    ├─ Many-to-Many: Region
    ├─ One-to-Many: Reservation
    └─ One-to-Many: FicheService

Reservation
├── id: uuid (PK)
├── statut (ENUM: pending, accepted, rejected, completed, cancelled)
├── dateReservation
├── idClient (FK)
├── idPrestataire (FK)
├── idService (FK)
└── Relationships:
    ├─ Many-to-One: Client
    ├─ Many-to-One: Prestataire
    └─ Many-to-One: Service

Commentaire
├── id: uuid (PK)
├── note (1-5 INT)
├── contenu (TEXT)
├── idClient (FK)
├── idService (FK)
└── Relationships:
    ├─ Many-to-One: Client
    └─ Many-to-One: Service

Categorie
├── id: uuid (PK)
├── nom (UNIQUE)
└── Relationships:
    └─ Many-to-Many: Service

Region
├── id: uuid (PK)
├── nomRegion (UNIQUE)
└── Relationships:
    └─ Many-to-Many: Service
```

---

## 🚀 Deployment Ready Checklist

```
✅ Code Quality
  ✅ TypeScript strict mode
  ✅ ESLint configured
  ✅ Code comments
  ✅ No console.logs in production paths

✅ Security
  ✅ Environment variables used
  ✅ No hardcoded secrets
  ✅ JWT configured
  ✅ CORS configured
  ✅ Security headers set

✅ Database
  ✅ Migrations support (TypeORM)
  ✅ Indexes on key columns
  ✅ Cascade delete configured
  ✅ Foreign keys in place

✅ Error Handling
  ✅ Global exception filter
  ✅ Proper HTTP status codes
  ✅ Error logging

✅ Documentation
  ✅ API documentation (300+ lines)
  ✅ Setup guide (200+ lines)
  ✅ Architecture docs (300+ lines)
  ✅ Code comments throughout

⏳ Optional But Recommended
  ⏳ Unit tests
  ⏳ E2E tests
  ⏳ Integration tests
  ⏳ Rate limiting (express-rate-limit)
  ⏳ Caching (Redis)
  ⏳ Email notifications
  ⏳ File uploads (Multer)
  ⏳ API versioning
```

---

## 📞 File Purpose Reference

| File | Purpose |
|------|---------|
| `.env` | Runtime configuration |
| `app.module.ts` | Root module with all imports |
| `main.ts` | Application bootstrap & security |
| `*/*.controller.ts` | HTTP endpoints |
| `*/*.service.ts` | Business logic |
| `entities/*.ts` | Database models |
| `dto/index.ts` | Request/response validation |
| `config/*.ts` | Configuration files |
| `decorators/*.ts` | Custom decorators |
| `filters/*.ts` | Exception handling |
| `BACKEND_DOCUMENTATION.md` | API reference |
| `SETUP.md` | Installation guide |
| `PROJECT_SUMMARY.md` | Overview |

---

**Generated**: Mai 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
