import { Repository } from 'typeorm';
import { Avis, AvisType } from '../entities/avis.entity';
import { Commentaire } from '../entities/commentaire.entity';
import { Note } from '../entities/note.entity';
import { Reservation } from '../entities/reservation.entity';
import { CreateAvisDto, UpdateAvisDto } from '../dto';
export declare class AvisService {
    private avisRepository;
    private commentaireRepository;
    private noteRepository;
    private reservationRepository;
    constructor(avisRepository: Repository<Avis>, commentaireRepository: Repository<Commentaire>, noteRepository: Repository<Note>, reservationRepository: Repository<Reservation>);
    create(createAvisDto: CreateAvisDto): Promise<Avis>;
    findAll(filters?: {
        idReservation?: string;
        typeAvis?: AvisType;
    }): Promise<Avis[]>;
    findCommentaires(idReservation?: string): Promise<Commentaire[]>;
    findNotes(idReservation?: string): Promise<Note[]>;
    findOne(idAvis: string): Promise<Avis>;
    update(idAvis: string, updateAvisDto: UpdateAvisDto): Promise<Avis>;
    remove(idAvis: string): Promise<void>;
    findByReservation(idReservation: string): Promise<Avis[]>;
    getAverageNote(idReservation: string): Promise<number>;
    reportAvis(idAvis: string): Promise<Avis>;
    toggleVisibility(idAvis: string): Promise<Avis>;
}
