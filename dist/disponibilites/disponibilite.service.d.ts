import { Repository } from 'typeorm';
import { Disponibilite } from '../entities/disponibilite.entity';
import { Prestataire } from '../entities/prestataire.entity';
import { CreateDisponibiliteDto, UpdateDisponibiliteDto } from '../dto';
export declare class DisponibiliteService {
    private disponibiliteRepository;
    private prestaiaireRepository;
    constructor(disponibiliteRepository: Repository<Disponibilite>, prestaiaireRepository: Repository<Prestataire>);
    create(createDisponibiliteDto: CreateDisponibiliteDto): Promise<Disponibilite>;
    findAll(filters?: {
        idPrestataire?: string;
    }): Promise<Disponibilite[]>;
    findOne(idDisponibilite: string): Promise<Disponibilite>;
    findByPrestataire(idPrestataire: string): Promise<Disponibilite[]>;
    update(idDisponibilite: string, updateDisponibiliteDto: UpdateDisponibiliteDto): Promise<Disponibilite>;
    remove(idDisponibilite: string): Promise<void>;
    findActiveForDay(idPrestataire: string, dayOfWeek: number): Promise<Disponibilite[]>;
    isAvailable(idPrestataire: string, date: Date, heureDebut: string, heureFin: string): Promise<boolean>;
}
