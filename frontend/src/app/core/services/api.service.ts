import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, Categorie, Paginated, Prestataire, Region, Reservation, Commentaire, Service, SousCategorie, Ville } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  private url(p: string) { return `${environment.apiUrl}${p}`; }
  private unwrap<T>() { return map((r: ApiResponse<T>) => r.data); }

  // Catégories / Régions
  categories() { return this.http.get<ApiResponse<Categorie[]>>(this.url('/categories')).pipe(this.unwrap<Categorie[]>()); }
  sousCategories(idCategorie?: number) {
    let p = new HttpParams();
    if (idCategorie) p = p.set('idCategorie', idCategorie);
    return this.http.get<ApiResponse<SousCategorie[]>>(this.url('/sous-categories'), { params: p }).pipe(this.unwrap<SousCategorie[]>());
  }
  regions() { return this.http.get<ApiResponse<Region[]>>(this.url('/regions')).pipe(this.unwrap<Region[]>()); }
  villes(idRegion?: number) {
    let p = new HttpParams();
    if (idRegion) p = p.set('idRegion', idRegion);
    return this.http.get<ApiResponse<Ville[]>>(this.url('/villes'), { params: p }).pipe(this.unwrap<Ville[]>());
  }

  // Prestataires
  searchPrestataires(q: Record<string, any>) {
    let params = new HttpParams();
    Object.entries(q).forEach(([k, v]) => { if (v !== null && v !== undefined && v !== '') params = params.set(k, String(v)); });
    return this.http.get<ApiResponse<Paginated<Prestataire>>>(this.url('/prestataires'), { params }).pipe(this.unwrap<Paginated<Prestataire>>());
  }
  prestataire(id: number) {
    return this.http.get<ApiResponse<Prestataire>>(this.url(`/prestataires/${id}`)).pipe(this.unwrap<Prestataire>());
  }
  updateMyPrestataire(body: Partial<Prestataire>) {
    return this.http.patch<ApiResponse<Prestataire>>(this.url('/prestataires/me'), body).pipe(this.unwrap<Prestataire>());
  }
  setValidation(id: number, statut: string) {
    return this.http.patch<ApiResponse<Prestataire>>(this.url(`/prestataires/${id}/validation`), { statut }).pipe(this.unwrap<Prestataire>());
  }

  // Services
  servicesAll() { return this.http.get<ApiResponse<Service[]>>(this.url('/services')).pipe(this.unwrap<Service[]>()); }
  createService(body: any) { return this.http.post<ApiResponse<Service>>(this.url('/services'), body).pipe(this.unwrap<Service>()); }
  updateService(id: number, body: any) { return this.http.patch<ApiResponse<Service>>(this.url(`/services/${id}`), body).pipe(this.unwrap<Service>()); }
  deleteService(id: number) { return this.http.delete<ApiResponse<any>>(this.url(`/services/${id}`)).pipe(this.unwrap<any>()); }

  // Disponibilités
  disponibilites(idPrestataire: number) {
    const p = new HttpParams().set('idPrestataire', idPrestataire);
    return this.http.get<ApiResponse<any[]>>(this.url('/disponibilites'), { params: p }).pipe(this.unwrap<any[]>());
  }
  createDisponibilite(body: any) { return this.http.post<ApiResponse<any>>(this.url('/disponibilites'), body).pipe(this.unwrap<any>()); }
  deleteDisponibilite(id: number) { return this.http.delete<ApiResponse<any>>(this.url(`/disponibilites/${id}`)).pipe(this.unwrap<any>()); }

  // Réservations
  mesReservationsClient() { return this.http.get<ApiResponse<Reservation[]>>(this.url('/reservations/mes')).pipe(this.unwrap<Reservation[]>()); }
  mesReservationsPrestataire() { return this.http.get<ApiResponse<Reservation[]>>(this.url('/reservations/prestataire/mes')).pipe(this.unwrap<Reservation[]>()); }
  reserver(body: { idService: number; dateReservation: string }) { return this.http.post<ApiResponse<Reservation>>(this.url('/reservations'), body).pipe(this.unwrap<Reservation>()); }
  changerStatutReservation(id: number, statut: string) {
    return this.http.patch<ApiResponse<Reservation>>(this.url(`/reservations/${id}/statut`), { statut }).pipe(this.unwrap<Reservation>());
  }

  // Commentaires
  commentaires(idPrestataire?: number) {
    let p = new HttpParams();
    if (idPrestataire) p = p.set('idPrestataire', idPrestataire);
    return this.http.get<ApiResponse<Commentaire[]>>(this.url('/commentaires'), { params: p }).pipe(this.unwrap<Commentaire[]>());
  }
  noterPrestataire(body: { idPrestataire: number; note: number; commentaire?: string }) {
    return this.http.post<ApiResponse<Commentaire>>(this.url('/commentaires'), body).pipe(this.unwrap<Commentaire>());
  }

  // Admin
  statistiques() { return this.http.get<ApiResponse<any>>(this.url('/statistiques')).pipe(this.unwrap<any>()); }
  createCategorie(nom: string) { return this.http.post<ApiResponse<Categorie>>(this.url('/categories'), { nom }).pipe(this.unwrap<Categorie>()); }
  deleteCategorie(id: number) { return this.http.delete<ApiResponse<any>>(this.url(`/categories/${id}`)).pipe(this.unwrap<any>()); }
}
