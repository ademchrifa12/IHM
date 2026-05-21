import { Repository } from 'typeorm';
import { Commentaire } from '../entities/commentaire.entity';
import { Avis } from '../entities/avis.entity';
import { Reservation } from '../entities/reservation.entity';
import { CreateCommentaireDto, UpdateCommentaireDto } from '../dto';
export declare class CommentairesService {
    private commentaireRepository;
    private avisRepository;
    private reservationRepository;
    constructor(commentaireRepository: Repository<Commentaire>, avisRepository: Repository<Avis>, reservationRepository: Repository<Reservation>);
    create(createCommentaireDto: CreateCommentaireDto): Promise<Commentaire>;
    findAll(limit?: number, offset?: number): Promise<{
        data: Commentaire[];
        total: number;
    }>;
    findById(id: string): Promise<Commentaire>;
    findByService(idService: string): Promise<Commentaire[]>;
    findByClient(idClient: string): Promise<Commentaire[]>;
    update(id: string, updateCommentaireDto: UpdateCommentaireDto): Promise<Commentaire>;
    delete(id: string): Promise<void>;
    toggleVisibility(id: string, visible: boolean): Promise<Commentaire>;
    reportComment(id: string): Promise<Commentaire>;
    getServiceRating(idService: string): Promise<{
        averageRating: number;
        totalComments: number;
    }>;
}
