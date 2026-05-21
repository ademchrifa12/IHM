import { ChildEntity } from 'typeorm';
import { Avis, AvisType } from './avis.entity';

/**
 * Note - Spécialisation de Avis (Single Table Inheritance)
 * Hérite de Avis avec uniquement une note numérique
 */
@ChildEntity(AvisType.NOTE)
export class Note extends Avis {
  constructor() {
    super();
    this.typeAvis = AvisType.NOTE;
  }
}
