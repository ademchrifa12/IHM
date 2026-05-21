import { CommentairesService } from './commentaires.service';
import { CreateCommentaireDto, UpdateCommentaireDto } from '../dto';
export declare class CommentairesController {
    private commentairesService;
    constructor(commentairesService: CommentairesService);
    findAll(limit?: string, offset?: string): Promise<{
        data: import("../entities/commentaire.entity").Commentaire[];
        total: number;
    }>;
    findOne(id: string): Promise<import("../entities/commentaire.entity").Commentaire>;
    create(createCommentaireDto: CreateCommentaireDto): Promise<import("../entities/commentaire.entity").Commentaire>;
    update(id: string, updateCommentaireDto: UpdateCommentaireDto): Promise<import("../entities/commentaire.entity").Commentaire>;
    delete(id: string): Promise<void>;
    findByService(idService: string): Promise<import("../entities/commentaire.entity").Commentaire[]>;
    getServiceRating(idService: string): Promise<{
        averageRating: number;
        totalComments: number;
    }>;
    findByClient(idClient: string): Promise<import("../entities/commentaire.entity").Commentaire[]>;
    toggleVisibility(id: string, body: {
        visible: boolean;
    }): Promise<import("../entities/commentaire.entity").Commentaire>;
    reportComment(id: string): Promise<import("../entities/commentaire.entity").Commentaire>;
}
