"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTestUsers = exports.seedAdminUser = exports.seedRegions = exports.seedCategories = void 0;
const user_entity_1 = require("../entities/user.entity");
exports.seedCategories = [
    {
        nom: 'Ménage & Nettoyage',
        description: 'Services de nettoyage et entretien de maison',
        iconUrl: 'https://example.com/icons/cleaning.png',
    },
    {
        nom: 'Bricolage & Réparation',
        description: 'Services de réparation et maintenance',
        iconUrl: 'https://example.com/icons/repair.png',
    },
    {
        nom: 'Jardinage',
        description: 'Services d\'entretien de jardins et espaces verts',
        iconUrl: 'https://example.com/icons/gardening.png',
    },
    {
        nom: 'Garde d\'enfants',
        description: 'Services de garde et babysitting',
        iconUrl: 'https://example.com/icons/childcare.png',
    },
    {
        nom: 'Cours & Tutoring',
        description: 'Services d\'enseignement et cours privés',
        iconUrl: 'https://example.com/icons/tutoring.png',
    },
    {
        nom: 'Courses & Livraisons',
        description: 'Services de courses et livraisons',
        iconUrl: 'https://example.com/icons/shopping.png',
    },
    {
        nom: 'Assistances diverses',
        description: 'Autres services d\'assistance personnelle',
        iconUrl: 'https://example.com/icons/assistance.png',
    },
];
exports.seedRegions = [
    { nomRegion: 'Île-de-France' },
    { nomRegion: 'Auvergne-Rhône-Alpes' },
    { nomRegion: 'Nouvelle-Aquitaine' },
    { nomRegion: 'Occitanie' },
    { nomRegion: 'Bourgogne-Franche-Comté' },
    { nomRegion: 'Bretagne' },
    { nomRegion: 'Centre-Val de Loire' },
    { nomRegion: 'Corse' },
    { nomRegion: 'Grand Est' },
    { nomRegion: 'Hauts-de-France' },
    { nomRegion: 'Normandie' },
    { nomRegion: 'Provence-Alpes-Côte d\'Azur' },
    { nomRegion: 'Pays de la Loire' },
];
exports.seedAdminUser = {
    nom: 'Admin',
    prenom: 'Super',
    email: 'admin@adomicile.com',
    motDePasse: 'Admin@123456',
    typeUtilisateur: user_entity_1.UserType.ADMIN,
    telephone: '+33123456789',
    adresse: '123 Rue de l\'Admin',
    codePostal: '75000',
    ville: 'Paris',
    emailVerifie: true,
    estActif: true,
};
exports.seedTestUsers = [
    {
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@example.com',
        motDePasse: 'Client@123456',
        typeUtilisateur: user_entity_1.UserType.CLIENT,
        telephone: '+33612345678',
        ville: 'Paris',
        emailVerifie: true,
        estActif: true,
    },
    {
        nom: 'Martin',
        prenom: 'Jean',
        email: 'jean.martin@example.com',
        motDePasse: 'Prest@123456',
        typeUtilisateur: user_entity_1.UserType.PRESTATAIRE,
        telephone: '+33687654321',
        ville: 'Lyon',
        biographie: 'Expert en nettoyage avec 5 ans d\'expérience',
        emailVerifie: true,
        estActif: true,
    },
    {
        nom: 'Bernard',
        prenom: 'Pierre',
        email: 'pierre.bernard@example.com',
        motDePasse: 'Prest@123456',
        typeUtilisateur: user_entity_1.UserType.PRESTATAIRE,
        telephone: '+33698765432',
        ville: 'Marseille',
        biographie: 'Bricoleur passionné, tous les petits travaux',
        emailVerifie: true,
        estActif: true,
    },
];
//# sourceMappingURL=seeds.js.map