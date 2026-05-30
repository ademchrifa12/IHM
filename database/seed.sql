-- =====================================================================
-- Données initiales (FR) — Plateforme de Services à Domicile
-- Mot de passe par défaut pour tous les comptes seed : "Password123!"
-- Hash bcrypt (10 rounds) : $2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3
-- (Régénérez avec: node -e "console.log(require('bcrypt').hashSync('Password123!',10))")
-- =====================================================================
USE PlateformeServices;
GO

-- Régions
INSERT INTO dbo.regions(nom_region) VALUES
 (N'Île-de-France'),(N'Provence-Alpes-Côte d''Azur'),(N'Auvergne-Rhône-Alpes'),
 (N'Occitanie'),(N'Nouvelle-Aquitaine');

-- Villes
INSERT INTO dbo.villes(id_region,nom_ville) VALUES
 (1,N'Paris'),(1,N'Versailles'),(1,N'Boulogne-Billancourt'),
 (2,N'Marseille'),(2,N'Nice'),(2,N'Aix-en-Provence'),
 (3,N'Lyon'),(3,N'Grenoble'),
 (4,N'Toulouse'),(4,N'Montpellier'),
 (5,N'Bordeaux'),(5,N'Nantes');

-- Catégories
INSERT INTO dbo.categories(nom) VALUES
 (N'Plomberie'),(N'Électricité'),(N'Peinture'),(N'Jardinage'),
 (N'Ménage'),(N'Réparation électroménager'),(N'Informatique'),
 (N'Climatisation et chauffage'),(N'Déménagement');

-- Sous-catégories
INSERT INTO dbo.sous_categories(id_categorie,nom) VALUES
 (1,N'Fuite d''eau'),(1,N'Installation sanitaire'),(1,N'Débouchage canalisation'),
 (2,N'Installation électrique'),(2,N'Dépannage urgent'),(2,N'Mise aux normes'),
 (3,N'Peinture intérieure'),(3,N'Peinture extérieure'),
 (4,N'Tonte de pelouse'),(4,N'Élagage'),(4,N'Création d''espace vert'),
 (5,N'Ménage régulier'),(5,N'Grand ménage'),(5,N'Repassage'),
 (6,N'Lave-linge'),(6,N'Réfrigérateur'),(6,N'Four'),
 (7,N'Dépannage PC'),(7,N'Installation réseau'),(7,N'Suppression virus'),
 (8,N'Installation climatisation'),(8,N'Entretien chaudière'),
 (9,N'Déménagement local'),(9,N'Déménagement longue distance');

-- Compte administrateur
INSERT INTO dbo.users(nom,prenom,email,mot_de_passe,role) VALUES
 (N'Admin',N'Super',N'admin@plateforme.fr',N'$2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3',N'ADMIN');
INSERT INTO dbo.admins(id_user) VALUES (SCOPE_IDENTITY());

-- Comptes clients
INSERT INTO dbo.users(nom,prenom,email,mot_de_passe,role) VALUES
 (N'Dupont',N'Marie',N'marie.dupont@example.fr',N'$2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3',N'CLIENT');
INSERT INTO dbo.clients(id_user) VALUES (SCOPE_IDENTITY());

INSERT INTO dbo.users(nom,prenom,email,mot_de_passe,role) VALUES
 (N'Martin',N'Lucas',N'lucas.martin@example.fr',N'$2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3',N'CLIENT');
INSERT INTO dbo.clients(id_user) VALUES (SCOPE_IDENTITY());

-- Comptes prestataires
INSERT INTO dbo.users(nom,prenom,email,mot_de_passe,role) VALUES
 (N'Bernard',N'Pierre',N'pierre.plombier@example.fr',N'$2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3',N'PRESTATAIRE');
INSERT INTO dbo.prestataires(id_user,description,telephone,adresse,latitude,longitude,statut_validation) VALUES
 (SCOPE_IDENTITY(),N'Plombier professionnel avec 10 ans d''expérience à Paris.',N'+33 6 11 22 33 44',N'12 rue de Rivoli, Paris',48.8566,2.3522,N'VALIDE');

INSERT INTO dbo.users(nom,prenom,email,mot_de_passe,role) VALUES
 (N'Lefevre',N'Sophie',N'sophie.electricienne@example.fr',N'$2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3',N'PRESTATAIRE');
INSERT INTO dbo.prestataires(id_user,description,telephone,adresse,latitude,longitude,statut_validation) VALUES
 (SCOPE_IDENTITY(),N'Électricienne certifiée, intervention rapide en région parisienne.',N'+33 6 22 33 44 55',N'5 avenue Foch, Paris',48.8738,2.2950,N'VALIDE');

INSERT INTO dbo.users(nom,prenom,email,mot_de_passe,role) VALUES
 (N'Garcia',N'Antoine',N'antoine.jardinier@example.fr',N'$2b$10$2g0lD2eK0i7r2t8s9j8y1u8r2p2v6w9k3x4y5z6a7b8c9d0e1f2g3',N'PRESTATAIRE');
INSERT INTO dbo.prestataires(id_user,description,telephone,adresse,latitude,longitude,statut_validation) VALUES
 (SCOPE_IDENTITY(),N'Paysagiste à Lyon — création et entretien de jardins.',N'+33 6 33 44 55 66',N'21 rue de la République, Lyon',45.7640,4.8357,N'VALIDE');

-- Services
INSERT INTO dbo.services(id_prestataire,id_categorie,id_sous_categorie,titre,description,prix) VALUES
 (1,1,1,N'Réparation fuite d''eau',N'Détection et réparation rapide.',80.00),
 (1,1,3,N'Débouchage canalisation',N'Intervention sous 2h.',120.00),
 (2,2,5,N'Dépannage électrique urgent',N'7j/7, devis gratuit.',95.00),
 (3,4,9,N'Tonte de pelouse',N'Pelouse jusqu''à 500 m².',60.00),
 (3,4,11,N'Création d''espace vert',N'Conception sur mesure.',450.00);

-- Disponibilités exemple
INSERT INTO dbo.disponibilites(id_prestataire,date,heure_debut,heure_fin) VALUES
 (1,'2026-06-02','08:00','12:00'),
 (1,'2026-06-02','14:00','18:00'),
 (2,'2026-06-03','09:00','17:00'),
 (3,'2026-06-04','08:00','16:00');

-- Commentaires
INSERT INTO dbo.commentaires(id_client,id_prestataire,note,commentaire) VALUES
 (1,1,5,N'Excellent travail, très professionnel !'),
 (2,1,4,N'Rapide et efficace, je recommande.'),
 (1,2,5,N'Intervention au top, prix correct.'),
 (2,3,4,N'Jardin transformé, merci !');
GO
