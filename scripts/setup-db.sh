#!/usr/bin/env bash

# Script de setup automatisé pour la base de données PostgreSQL

set -e

echo "🚀 Initialisation de la base de données A-Domicile..."

# Variables
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USERNAME=${DB_USERNAME:-admin}
DB_PASSWORD=${DB_PASSWORD:-SecurePassword123!}
DB_NAME=${DB_NAME:-a_domicile_db}

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si PostgreSQL est installé
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL n'est pas installé${NC}"
    exit 1
fi

# Créer l'utilisateur (s'il n'existe pas)
echo "👤 Création utilisateur PostgreSQL..."
PGPASSWORD='postgres' psql -h "$DB_HOST" -p "$DB_PORT" -U postgres -tc \
    "SELECT 1 FROM pg_user WHERE usename = '$DB_USERNAME'" | grep -q 1 || \
    PGPASSWORD='postgres' psql -h "$DB_HOST" -p "$DB_PORT" -U postgres -c \
    "CREATE USER $DB_USERNAME WITH PASSWORD '$DB_PASSWORD';"

# Créer la base de données
echo "🗄️  Création base de données..."
PGPASSWORD='postgres' psql -h "$DB_HOST" -p "$DB_PORT" -U postgres -tc \
    "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
    PGPASSWORD='postgres' psql -h "$DB_HOST" -p "$DB_PORT" -U postgres -c \
    "CREATE DATABASE $DB_NAME OWNER $DB_USERNAME;"

# Donner les droits
echo "🔐 Configuration des droits..."
PGPASSWORD='postgres' psql -h "$DB_HOST" -p "$DB_PORT" -U postgres -c \
    "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USERNAME;"

echo -e "${GREEN}✅ Base de données configurée avec succès!${NC}"
echo -e "\n${GREEN}Configuration:${NC}"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  Username: $DB_USERNAME"
echo -e "\n${GREEN}Prochaines étapes:${NC}"
echo "  1. npm install"
echo "  2. npm run start:dev"
