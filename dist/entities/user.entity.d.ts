export declare enum UserType {
    CLIENT = "client",
    PRESTATAIRE = "prestataire",
    ADMIN = "admin"
}
export declare class User {
    idUtilisateur: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: UserType;
    telephone?: string;
    adresse?: string;
    codePostal?: string;
    ville?: string;
    emailVerifie: boolean;
    estActif: boolean;
    photoUrl?: string;
    biographie?: string;
    dateCreation: Date;
    dateModification: Date;
    derniereConnexion?: Date;
    clientProfile?: any;
    prestaireProfile?: any;
    adminProfile?: any;
    sInscrire(): boolean;
    sAuthentifier(): boolean;
}
