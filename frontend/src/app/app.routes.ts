import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/public/accueil/accueil.component').then(m => m.AccueilComponent) },
  { path: 'connexion', loadComponent: () => import('./pages/public/connexion/connexion.component').then(m => m.ConnexionComponent) },
  { path: 'inscription', loadComponent: () => import('./pages/public/inscription/inscription.component').then(m => m.InscriptionComponent) },
  { path: 'recherche', loadComponent: () => import('./pages/public/recherche/recherche.component').then(m => m.RechercheComponent) },
  { path: 'prestataires', loadComponent: () => import('./pages/public/liste-prestataires/liste-prestataires.component').then(m => m.ListePrestatairesComponent) },
  { path: 'prestataires/:id', loadComponent: () => import('./pages/public/detail-prestataire/detail-prestataire.component').then(m => m.DetailPrestataireComponent) },

  {
    path: 'client',
    canActivate: [authGuard, roleGuard(['CLIENT'])],
    children: [
      { path: '', loadComponent: () => import('./pages/client/dashboard-client/dashboard-client.component').then(m => m.DashboardClientComponent) },
      { path: 'profil', loadComponent: () => import('./pages/client/profil-client/profil-client.component').then(m => m.ProfilClientComponent) },
      { path: 'reservations', loadComponent: () => import('./pages/client/mes-reservations/mes-reservations.component').then(m => m.MesReservationsComponent) },
    ],
  },

  {
    path: 'prestataire',
    canActivate: [authGuard, roleGuard(['PRESTATAIRE'])],
    children: [
      { path: '', loadComponent: () => import('./pages/prestataire/dashboard-prestataire/dashboard-prestataire.component').then(m => m.DashboardPrestataireComponent) },
      { path: 'profil', loadComponent: () => import('./pages/prestataire/profil-prestataire/profil-prestataire.component').then(m => m.ProfilPrestataireComponent) },
      { path: 'services', loadComponent: () => import('./pages/prestataire/gestion-services/gestion-services.component').then(m => m.GestionServicesComponent) },
      { path: 'disponibilites', loadComponent: () => import('./pages/prestataire/gestion-disponibilites/gestion-disponibilites.component').then(m => m.GestionDisponibilitesComponent) },
      { path: 'reservations', loadComponent: () => import('./pages/prestataire/gestion-reservations/gestion-reservations.component').then(m => m.GestionReservationsComponent) },
    ],
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    children: [
      { path: '', loadComponent: () => import('./pages/admin/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent) },
      { path: 'prestataires', loadComponent: () => import('./pages/admin/gestion-prestataires/gestion-prestataires.component').then(m => m.GestionPrestatairesComponent) },
      { path: 'categories', loadComponent: () => import('./pages/admin/gestion-categories/gestion-categories.component').then(m => m.GestionCategoriesComponent) },
    ],
  },

  { path: '**', redirectTo: '' },
];
