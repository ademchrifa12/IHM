import { DisponibiliteService } from './disponibilite.service';
import { CreateDisponibiliteDto, UpdateDisponibiliteDto } from '../dto';
import { Disponibilite } from '../entities/disponibilite.entity';
export declare class DisponibiliteController {
    private readonly disponibiliteService;
    constructor(disponibiliteService: DisponibiliteService);
    create(createDisponibiliteDto: CreateDisponibiliteDto): Promise<Disponibilite>;
    findAll(idPrestataire?: string): Promise<Disponibilite[]>;
    findByPrestataire(idPrestataire: string): Promise<Disponibilite[]>;
    findActiveForDay(idPrestataire: string, day: string): Promise<Disponibilite[]>;
    findOne(id: string): Promise<Disponibilite>;
    update(id: string, updateDisponibiliteDto: UpdateDisponibiliteDto): Promise<Disponibilite>;
    remove(id: string): Promise<void>;
    checkAvailability(body: {
        idPrestataire: string;
        date: string;
        heureDebut: string;
        heureFin: string;
    }): Promise<boolean>;
}
