import { User } from './user.entity';
export declare class Admin {
    idAdmin: string;
    user: User;
    idUtilisateur: string;
    dateDernierConnect?: Date;
    niveau: string;
    permissions?: string;
    dateNommation: Date;
    dateModification: Date;
    validerProfil(utilisateur: any): void;
    gererCategories(categorie: any): void;
    consulterDash(): any;
    supprimerCommentaire(commentaireId: string): void;
}
