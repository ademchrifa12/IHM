import { ChildEntity } from 'typeorm';
import { Avis, AvisType } from './avis.entity';

/**
 * Commentaire - Spécialisation de Avis (Single Table Inheritance)
 * Hérite de Avis avec contenu textuel et note
 * 
 * Migration: L'ancienne relation Client -> Commentaire est maintenant gérée
 * via la relation Reservation -> Avis -> Commentaire
 */
@ChildEntity(AvisType.COMMENTAIRE)
export class Commentaire extends Avis {
  constructor() {
    super();
    this.typeAvis = AvisType.COMMENTAIRE;
  }
}
