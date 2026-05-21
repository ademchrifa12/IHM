import { UserType } from '../entities/user.entity';
export declare const seedCategories: {
    nom: string;
    description: string;
    iconUrl: string;
}[];
export declare const seedRegions: {
    nomRegion: string;
}[];
export declare const seedAdminUser: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: UserType;
    telephone: string;
    adresse: string;
    codePostal: string;
    ville: string;
    emailVerifie: boolean;
    estActif: boolean;
};
export declare const seedTestUsers: ({
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: UserType;
    telephone: string;
    ville: string;
    emailVerifie: boolean;
    estActif: boolean;
    biographie?: undefined;
} | {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: UserType;
    telephone: string;
    ville: string;
    biographie: string;
    emailVerifie: boolean;
    estActif: boolean;
})[];
