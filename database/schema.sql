-- =====================================================================
-- Plateforme de Services à Domicile
-- Schéma SQL Server
-- =====================================================================
IF DB_ID('PlateformeServices') IS NULL
    CREATE DATABASE PlateformeServices;
GO
USE PlateformeServices;
GO

-- ---------- Suppression (dev only) ----------
IF OBJECT_ID('dbo.commentaires','U')   IS NOT NULL DROP TABLE dbo.commentaires;
IF OBJECT_ID('dbo.reservations','U')   IS NOT NULL DROP TABLE dbo.reservations;
IF OBJECT_ID('dbo.disponibilites','U') IS NOT NULL DROP TABLE dbo.disponibilites;
IF OBJECT_ID('dbo.services','U')       IS NOT NULL DROP TABLE dbo.services;
IF OBJECT_ID('dbo.sous_categories','U')IS NOT NULL DROP TABLE dbo.sous_categories;
IF OBJECT_ID('dbo.categories','U')     IS NOT NULL DROP TABLE dbo.categories;
IF OBJECT_ID('dbo.villes','U')         IS NOT NULL DROP TABLE dbo.villes;
IF OBJECT_ID('dbo.regions','U')        IS NOT NULL DROP TABLE dbo.regions;
IF OBJECT_ID('dbo.admins','U')         IS NOT NULL DROP TABLE dbo.admins;
IF OBJECT_ID('dbo.prestataires','U')   IS NOT NULL DROP TABLE dbo.prestataires;
IF OBJECT_ID('dbo.clients','U')        IS NOT NULL DROP TABLE dbo.clients;
IF OBJECT_ID('dbo.refresh_tokens','U') IS NOT NULL DROP TABLE dbo.refresh_tokens;
IF OBJECT_ID('dbo.users','U')          IS NOT NULL DROP TABLE dbo.users;
GO

-- ---------- USERS ----------
CREATE TABLE dbo.users (
    id_user        INT IDENTITY(1,1) PRIMARY KEY,
    nom            NVARCHAR(100) NOT NULL,
    prenom         NVARCHAR(100) NOT NULL,
    email          NVARCHAR(190) NOT NULL UNIQUE,
    mot_de_passe   NVARCHAR(255) NOT NULL,
    role           NVARCHAR(20)  NOT NULL CHECK (role IN ('CLIENT','PRESTATAIRE','ADMIN')),
    date_creation  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE dbo.refresh_tokens (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    id_user       INT NOT NULL FOREIGN KEY REFERENCES dbo.users(id_user) ON DELETE CASCADE,
    token_hash    NVARCHAR(255) NOT NULL,
    expires_at    DATETIME2 NOT NULL,
    revoked       BIT NOT NULL DEFAULT 0,
    created_at    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- ---------- CLIENTS ----------
CREATE TABLE dbo.clients (
    id_client INT IDENTITY(1,1) PRIMARY KEY,
    id_user   INT NOT NULL UNIQUE FOREIGN KEY REFERENCES dbo.users(id_user) ON DELETE CASCADE
);

-- ---------- PRESTATAIRES ----------
CREATE TABLE dbo.prestataires (
    id_prestataire     INT IDENTITY(1,1) PRIMARY KEY,
    id_user            INT NOT NULL UNIQUE FOREIGN KEY REFERENCES dbo.users(id_user) ON DELETE CASCADE,
    description        NVARCHAR(2000) NULL,
    photo              NVARCHAR(500)  NULL,
    telephone          NVARCHAR(30)   NULL,
    adresse            NVARCHAR(255)  NULL,
    latitude           FLOAT          NULL,
    longitude          FLOAT          NULL,
    statut_validation  NVARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE'
        CHECK (statut_validation IN ('EN_ATTENTE','VALIDE','REJETE','SUSPENDU'))
);

-- ---------- ADMINS ----------
CREATE TABLE dbo.admins (
    id_admin INT IDENTITY(1,1) PRIMARY KEY,
    id_user  INT NOT NULL UNIQUE FOREIGN KEY REFERENCES dbo.users(id_user) ON DELETE CASCADE
);

-- ---------- RÉGIONS / VILLES ----------
CREATE TABLE dbo.regions (
    id_region  INT IDENTITY(1,1) PRIMARY KEY,
    nom_region NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE dbo.villes (
    id_ville  INT IDENTITY(1,1) PRIMARY KEY,
    id_region INT NOT NULL FOREIGN KEY REFERENCES dbo.regions(id_region),
    nom_ville NVARCHAR(100) NOT NULL
);

-- ---------- CATÉGORIES ----------
CREATE TABLE dbo.categories (
    id_categorie INT IDENTITY(1,1) PRIMARY KEY,
    nom          NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE dbo.sous_categories (
    id_sous_categorie INT IDENTITY(1,1) PRIMARY KEY,
    id_categorie      INT NOT NULL FOREIGN KEY REFERENCES dbo.categories(id_categorie) ON DELETE CASCADE,
    nom               NVARCHAR(100) NOT NULL
);

-- ---------- SERVICES ----------
CREATE TABLE dbo.services (
    id_service        INT IDENTITY(1,1) PRIMARY KEY,
    id_prestataire    INT NOT NULL FOREIGN KEY REFERENCES dbo.prestataires(id_prestataire) ON DELETE CASCADE,
    id_categorie      INT NOT NULL FOREIGN KEY REFERENCES dbo.categories(id_categorie),
    id_sous_categorie INT NULL     FOREIGN KEY REFERENCES dbo.sous_categories(id_sous_categorie),
    titre             NVARCHAR(200) NOT NULL,
    description       NVARCHAR(2000) NULL,
    prix              DECIMAL(10,2) NOT NULL DEFAULT 0
);

-- ---------- DISPONIBILITÉS ----------
CREATE TABLE dbo.disponibilites (
    id_disponibilite INT IDENTITY(1,1) PRIMARY KEY,
    id_prestataire   INT NOT NULL FOREIGN KEY REFERENCES dbo.prestataires(id_prestataire) ON DELETE CASCADE,
    date             DATE NOT NULL,
    heure_debut      TIME NOT NULL,
    heure_fin        TIME NOT NULL
);

-- ---------- RÉSERVATIONS ----------
CREATE TABLE dbo.reservations (
    id_reservation   INT IDENTITY(1,1) PRIMARY KEY,
    id_client        INT NOT NULL FOREIGN KEY REFERENCES dbo.clients(id_client),
    id_prestataire   INT NOT NULL FOREIGN KEY REFERENCES dbo.prestataires(id_prestataire),
    id_service       INT NOT NULL FOREIGN KEY REFERENCES dbo.services(id_service),
    date_reservation DATETIME2 NOT NULL,
    statut           NVARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE'
        CHECK (statut IN ('EN_ATTENTE','ACCEPTEE','REFUSEE','TERMINEE','ANNULEE'))
);

-- ---------- COMMENTAIRES ----------
CREATE TABLE dbo.commentaires (
    id_commentaire INT IDENTITY(1,1) PRIMARY KEY,
    id_client      INT NOT NULL FOREIGN KEY REFERENCES dbo.clients(id_client),
    id_prestataire INT NOT NULL FOREIGN KEY REFERENCES dbo.prestataires(id_prestataire),
    note           INT NOT NULL CHECK (note BETWEEN 1 AND 5),
    commentaire    NVARCHAR(1000) NULL,
    date_creation  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    modere         BIT NOT NULL DEFAULT 1
);

-- ---------- INDEX ----------
CREATE INDEX IX_prestataires_geo  ON dbo.prestataires(latitude, longitude);
CREATE INDEX IX_services_cat      ON dbo.services(id_categorie, id_sous_categorie);
CREATE INDEX IX_reservations_cli  ON dbo.reservations(id_client);
CREATE INDEX IX_reservations_pres ON dbo.reservations(id_prestataire);
GO
