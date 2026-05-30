# Guide d'installation — Plateforme de Services à Domicile

## Prérequis

| Logiciel | Version minimale | Lien |
|----------|-----------------|------|
| Node.js | 18.x ou supérieur | https://nodejs.org |
| npm | 9.x ou supérieur | (inclus avec Node.js) |
| SQL Server | 2019+ (Express suffit) | https://www.microsoft.com/sql-server |
| SQL Server Management Studio (optionnel) | — | https://aka.ms/ssmsfullsetup |
| Git | 2.x | https://git-scm.com |
| Angular CLI | 17.x | `npm install -g @angular/cli` |

---

## 1. Cloner le projet

```bash
git clone <URL_DU_REPO>
cd home_services
```

---

## 2. Configuration de SQL Server

### 2.1 Activer l'authentification mixte (SQL + Windows)

1. Ouvrir **SQL Server Management Studio (SSMS)**
2. Se connecter avec **Authentification Windows**
3. Clic droit sur le serveur → **Propriétés** → **Sécurité**
4. Cocher **"Mode d'authentification SQL Server et Windows"**
5. Cliquer OK, puis **redémarrer le service SQL Server**

### 2.2 Activer TCP/IP (si désactivé)

1. Ouvrir **SQL Server Configuration Manager**
2. Aller dans **SQL Server Network Configuration → Protocols**
3. Activer **TCP/IP**
4. Double-cliquer TCP/IP → onglet **IP Addresses** → vérifier que le port **1433** est configuré sous IPAll
5. Redémarrer le service SQL Server

### 2.3 Créer le login SQL

Ouvrir SSMS (en Authentification Windows) et exécuter :

```sql
CREATE LOGIN plateforme_user WITH PASSWORD = 'Plateforme2026!';
GO
ALTER SERVER ROLE sysadmin ADD MEMBER plateforme_user;
GO
```

> **Note** : En production, ne pas donner `sysadmin`. Créer la DB d'abord puis donner `db_owner` uniquement sur `PlateformeServices`.

### 2.4 Créer la base de données et les tables

```bash
sqlcmd -S localhost -U plateforme_user -P "Plateforme2026!" -i database/schema.sql
```

### 2.5 Insérer les données initiales (seed)

Le fichier seed doit être converti en UTF-16 pour que les caractères français soient stockés correctement :

**PowerShell :**
```powershell
[System.IO.File]::ReadAllText("database/seed.sql", [System.Text.Encoding]::UTF8) | Out-File -Encoding unicode "database/seed-utf16.sql"
sqlcmd -S localhost -U plateforme_user -P "Plateforme2026!" -d PlateformeServices -i "database/seed-utf16.sql"
```

**Ou via SSMS :** ouvrir `database/seed.sql` directement dans SSMS et exécuter (SSMS gère le UTF-8 correctement).

---

## 3. Backend (NestJS)

### 3.1 Installer les dépendances

```bash
cd backend
npm install
```

### 3.2 Configurer l'environnement

Créer le fichier `backend/.env` (un exemple est déjà fourni) :

```env
NODE_ENV=development
PORT=3000
APP_CORS_ORIGIN=http://localhost:4200

DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=plateforme_user
DB_PASSWORD=Plateforme2026!
DB_NAME=PlateformeServices
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true

JWT_ACCESS_SECRET=plateforme_services_access_2026_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=plateforme_services_refresh_2026_secret
JWT_REFRESH_EXPIRES=7d
```

> Modifier `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD` selon votre configuration locale.

### 3.3 Lancer le backend

```bash
npm run start:dev
```

Le serveur démarre sur **http://localhost:3000**.  
Documentation Swagger disponible sur **http://localhost:3000/api**.

---

## 4. Frontend (Angular)

### 4.1 Installer les dépendances

```bash
cd frontend
npm install
```

### 4.2 Lancer le frontend

```bash
npx ng serve --port 4200 --open
```

L'application s'ouvre sur **http://localhost:4200**.

---

## 5. Comptes de test (seed)

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@plateforme.fr | Password123! |
| Client | marie.dupont@example.fr | Password123! |
| Client | lucas.martin@example.fr | Password123! |
| Prestataire | pierre.plombier@example.fr | Password123! |
| Prestataire | sophie.electricienne@example.fr | Password123! |
| Prestataire | antoine.jardinier@example.fr | Password123! |

---

## 6. Structure du projet

```
home_services/
├── backend/             # API NestJS (TypeScript)
│   ├── src/
│   │   ├── modules/     # auth, users, clients, prestataires, categories, etc.
│   │   ├── common/      # guards, decorators, filters
│   │   └── app.module.ts
│   ├── .env             # Configuration (ne pas committer en prod)
│   └── package.json
├── frontend/            # Application Angular 17
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/    # services, guards, interceptors, models
│   │   │   └── pages/   # public/, client/, prestataire/, admin/
│   │   ├── styles.scss  # Thème global + Material custom
│   │   └── index.html
│   └── package.json
├── database/
│   ├── schema.sql       # Création des tables
│   └── seed.sql         # Données initiales
└── INSTALLATION.md      # Ce fichier
```

---

## 7. Ports utilisés

| Service | Port |
|---------|------|
| Frontend Angular | 4200 |
| Backend NestJS | 3000 |
| SQL Server | 1433 |

---

## 8. Résolution de problèmes

### "Login failed for user 'plateforme_user'"
- Vérifier que l'authentification mixte est activée (étape 2.1)
- Vérifier que le login existe : `SELECT name FROM sys.server_principals WHERE name='plateforme_user'`

### "TCP Provider: No connection could be made"
- Vérifier que TCP/IP est activé (étape 2.2)
- Vérifier que le service SQL Server est démarré
- Vérifier le pare-feu (port 1433)

### Caractères accentués corrompus (Ã©, Ã¨, etc.)
- Le fichier seed doit être exécuté en UTF-16 via sqlcmd ou directement dans SSMS
- Voir étape 2.5

### "Cannot find module" dans le backend
```bash
cd backend
rm -rf node_modules
npm install
```

### Le frontend ne compile pas
```bash
cd frontend
rm -rf node_modules
npm install
npx ng serve
```
