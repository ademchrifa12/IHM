# 🏠 Configuration du Backend A-Domicile

## Installation

### 1️⃣ Prérequis
```bash
# Vérifier Node.js
node --version  # v18+

# Vérifier PostgreSQL
psql --version  # 12+
```

### 2️⃣ Installation des dépendances
```bash
npm install
```

### 3️⃣ Configuration Base de Données

#### Option A : Script automatisé (Linux/Mac)
```bash
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh
```

#### Option B : Manuel
```bash
# Démarrer PostgreSQL
sudo service postgresql start  # Linux
brew services start postgresql  # Mac

# Créer base et utilisateur
psql -U postgres
> CREATE USER admin WITH PASSWORD 'SecurePassword123!';
> CREATE DATABASE a_domicile_db OWNER admin;
> GRANT ALL PRIVILEGES ON DATABASE a_domicile_db TO admin;
> \q
```

### 4️⃣ Configuration Environnement
```bash
# Copier fichier exemple
cp .env.example .env

# Éditer les variables (surtout JWT_SECRET)
nano .env
```

#### Variables critiques:
```env
DB_PASSWORD=votre_password_securisé
JWT_SECRET=votre_secret_jwt_min_32_caracteres
JWT_REFRESH_SECRET=votre_secret_refresh_min_32
```

### 5️⃣ Lancer le serveur

**Développement (watch mode):**
```bash
npm run start:dev
```

**Production:**
```bash
npm run build
npm run start:prod
```

✅ Serveur dispo sur `http://localhost:3000`

---

## 🧪 Test de l'API

### Inscription
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Marie",
    "email": "marie@example.com",
    "motDePasse": "Secure@123",
    "typeUtilisateur": "client"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "marie@example.com",
    "motDePasse": "Secure@123"
  }'
```

### Requête authentifiée
```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."

curl -X GET http://localhost:3000/api/users/uuid-here \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📦 Structure Projet

```
a-domicile-app/
├── src/
│   ├── auth/               # JWT, guards, strategies
│   ├── users/              # Profils utilisateurs
│   ├── services/           # Services professionnels
│   ├── reservations/       # Gestion réservations
│   ├── commentaires/       # Avis et ratings
│   ├── categories/         # Catégories services
│   ├── regions/            # Régions géographiques
│   ├── entities/           # Modèles TypeORM
│   ├── config/             # Configuration BD
│   ├── decorators/         # Custom decorators
│   ├── filters/            # Exception filters
│   ├── app.module.ts       # Module principal
│   └── main.ts             # Point entrée
├── test/                   # Tests E2E
├── .env                    # Variables environnement
├── .env.example            # Template .env
├── package.json
└── tsconfig.json
```

---

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run start:dev         # Watch mode
npm run start:debug       # Debug mode

# Build & Production
npm run build             # Compiler TypeScript
npm run start:prod        # Lancer production

# Tests
npm run test              # Tests unitaires
npm run test:watch        # Mode watch
npm run test:cov          # Avec couverture
npm run test:e2e          # Tests E2E

# Code Quality
npm run format            # Prettier
npm run lint              # ESLint
```

---

## 🔑 Authentification

### Flow JWT

```
1. POST /auth/register
   ├─ Valider données
   ├─ Hash password (bcrypt)
   └─ Créer user

2. POST /auth/login
   ├─ Chercher user par email
   ├─ Vérifier password
   ├─ Générer JWT token (7j)
   └─ Retourner access + refresh token

3. Requête protégée
   ├─ Envoyer: Authorization: Bearer <token>
   ├─ Guard JWT valide
   └─ Vérifier rôle @Roles(['client'])

4. POST /auth/refresh
   ├─ Valider refresh token (30j)
   └─ Générer nouvel access token
```

---

## 🔐 Sécurité Implémentée

✅ **Authentification JWT** - Tokens signés HS256  
✅ **Password Hashing** - bcrypt avec salt 10  
✅ **CORS** - Configurable par environnement  
✅ **Validation DTO** - class-validator  
✅ **Role-Based Access** - @Roles decorator  
✅ **Security Headers** - X-XSS-Protection, etc.  
✅ **Error Handling** - GlobalExceptionFilter  
✅ **HTTPS Ready** - HSTS header configuré  

---

## 📊 Base de Données

### Entities Principales
- **User** - Utilisateur (CLIENT/PRESTATAIRE/ADMIN)
- **Service** - Offre de service
- **Reservation** - Réservation d'un service
- **Commentaire** - Avis et notation
- **Categorie** - Catégorie service
- **Region** - Région géographique

### Relations
```
User 1 --- * Reservation
User 1 --- * Commentaire
Prestataire 1 --- * Service
Client * --- * Service (via Reservation)
Service * --- * Categorie
Service * --- * Region
```

---

## 🐛 Troubleshooting

### Erreur: "ECONNREFUSED - Connection refused"
```bash
# PostgreSQL pas en marche
sudo service postgresql start  # Linux
brew services start postgresql  # Mac
```

### Erreur: "password authentication failed"
```bash
# Vérifier credentials dans .env
# Vérifier user PostgreSQL existe:
psql -U postgres -c "SELECT * FROM pg_user;"
```

### Erreur: JWT token invalid
```bash
# Token expiré
# Solution: POST /auth/refresh avec refreshToken

# Secret ne correspond pas
# Vérifier JWT_SECRET dans .env
```

### Port 3000 occupé
```bash
# Changer PORT dans .env
# Ou libérer le port:
lsof -i :3000
kill -9 <PID>
```

---

## 📚 Documentation Complète

Voir [BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md) pour:
- Architecture détaillée
- Tous les endpoints API
- Cas d'utilisation
- Best practices

---

## 🤝 Support

Pour les questions/bugs:
1. Vérifier logs: `npm run start:dev`
2. Consulter documentation
3. Vérifier .env et base de données
4. Vérifier erreurs TypeScript: `npm run build`

---

**Version**: 1.0.0  
**Dernière mise à jour**: Mai 2026
