export type UserRole = 'CLIENT' | 'PRESTATAIRE' | 'ADMIN';

export interface AuthUser {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface Prestataire {
  idPrestataire: number;
  user?: { nom: string; prenom: string; email: string };
  description?: string;
  photo?: string;
  telephone?: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  statutValidation: 'EN_ATTENTE' | 'VALIDE' | 'REJETE' | 'SUSPENDU';
  services?: Service[];
  noteMoyenne?: number;
  nbAvis?: number;
  distanceKm?: number | null;
}

export interface Service {
  idService: number;
  titre: string;
  description?: string;
  prix: number;
  categorie?: Categorie;
  sousCategorie?: SousCategorie;
}

export interface Categorie {
  idCategorie: number;
  nom: string;
  sousCategories?: SousCategorie[];
}

export interface SousCategorie {
  idSousCategorie: number;
  nom: string;
}

export interface Region {
  idRegion: number;
  nomRegion: string;
  villes?: Ville[];
}
export interface Ville { idVille: number; nomVille: string; }

export interface Reservation {
  idReservation: number;
  dateReservation: string;
  statut: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE' | 'TERMINEE' | 'ANNULEE';
  service: Service;
  prestataire: Prestataire;
}

export interface Commentaire {
  idCommentaire: number;
  note: number;
  commentaire?: string;
  dateCreation: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
