import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dash-page">
      <div class="dash-header">
        <h1>Bonjour, {{ auth.user()?.prenom }} 👋</h1>
        <p>Bienvenue dans votre espace client</p>
      </div>
      <div class="dash-grid">
        <a routerLink="/client/profil" class="dash-card">
          <div class="dash-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)"><mat-icon>person</mat-icon></div>
          <h3>Mon profil</h3>
          <p>Modifier mes informations</p>
          <mat-icon class="dash-arrow">arrow_forward</mat-icon>
        </a>
        <a routerLink="/client/reservations" class="dash-card">
          <div class="dash-icon" style="background:linear-gradient(135deg,#e65100,#ff9800)"><mat-icon>event</mat-icon></div>
          <h3>Mes réservations</h3>
          <p>Consulter et gérer</p>
          <mat-icon class="dash-arrow">arrow_forward</mat-icon>
        </a>
        <a routerLink="/recherche" class="dash-card">
          <div class="dash-icon" style="background:linear-gradient(135deg,#2e7d32,#66bb6a)"><mat-icon>search</mat-icon></div>
          <h3>Nouveau service</h3>
          <p>Trouver un prestataire</p>
          <mat-icon class="dash-arrow">arrow_forward</mat-icon>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dash-page { max-width: var(--max-width); margin: 0 auto; padding: 48px 24px; }
    .dash-header { margin-bottom: 32px; h1 { margin-bottom: 4px; } p { color: var(--text-secondary); } }
    .dash-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .dash-card {
      display: flex; flex-direction: column; gap: 12px;
      padding: 28px; border-radius: var(--radius-lg);
      background: var(--surface); border: 1px solid var(--border);
      text-decoration: none !important; color: var(--text);
      transition: var(--transition); position: relative;
      &:hover { border-color: var(--primary-light); box-shadow: var(--shadow-md); transform: translateY(-2px); }
      h3 { margin: 0; font-size: 1.1rem; }
      p { margin: 0; font-size: 0.9rem; color: var(--text-secondary); }
    }
    .dash-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      mat-icon { color: white; }
    }
    .dash-arrow { position: absolute; top: 28px; right: 24px; color: var(--text-secondary); opacity: 0; transition: var(--transition); }
    .dash-card:hover .dash-arrow { opacity: 1; }
  `],
})
export class DashboardClientComponent {
  protected auth = inject(AuthService);
}
