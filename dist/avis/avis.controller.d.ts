import { AvisService } from './avis.service';
import { CreateAvisDto, UpdateAvisDto } from '../dto';
import { Avis, AvisType } from '../entities/avis.entity';
export declare class AvisController {
    private readonly avisService;
    constructor(avisService: AvisService);
    create(createAvisDto: CreateAvisDto): Promise<Avis>;
    findAll(idReservation?: string, typeAvis?: AvisType): Promise<Avis[]>;
    findCommentaires(idReservation?: string): Promise<import("../entities/commentaire.entity").Commentaire[]>;
    findNotes(idReservation?: string): Promise<import("../entities/note.entity").Note[]>;
    findByReservation(idReservation: string): Promise<Avis[]>;
    getAverageNote(idReservation: string): Promise<number>;
    findOne(id: string): Promise<Avis>;
    update(id: string, updateAvisDto: UpdateAvisDto): Promise<Avis>;
    remove(id: string): Promise<void>;
    reportAvis(id: string): Promise<Avis>;
    toggleVisibility(id: string): Promise<Avis>;
}
