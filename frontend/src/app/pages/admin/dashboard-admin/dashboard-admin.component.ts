import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dash-page">
      <div class="dash-header">
        <h1>Administration</h1>
        <p>Vue d'ensemble de la plateforme</p>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)"><mat-icon>people</mat-icon></div>
          <div class="stat-info"><span class="stat-num">{{ stats?.totalUsers || 0 }}</span><span class="stat-lbl">Utilisateurs</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:linear-gradient(135deg,#2e7d32,#66bb6a)"><mat-icon>verified</mat-icon></div>
          <div class="stat-info"><span class="stat-num">{{ stats?.totalPrestataires || 0 }}</span><span class="stat-lbl">Prestataires ({{ stats?.prestatairesValides || 0 }} validés)</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:linear-gradient(135deg,#e65100,#ff9800)"><mat-icon>event</mat-icon></div>
          <div class="stat-info"><span class="stat-num">{{ stats?.totalReservations || 0 }}</span><span class="stat-lbl">Réservations</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:linear-gradient(135deg,#6a1b9a,#ab47bc)"><mat-icon>star</mat-icon></div>
          <div class="stat-info"><span class="stat-num">{{ (stats?.noteMoyenneGlobale || 0) | number:'1.1-1' }}</span><span class="stat-lbl">Note moyenne</span></div>
        </div>
      </div>
      <div class="admin-actions">
        <a mat-raised-button color="primary" routerLink="/admin/prestataires" class="admin-btn">
          <mat-icon>verified</mat-icon> Gérer les prestataires
        </a>
        <a mat-raised-button routerLink="/admin/categories" class="admin-btn">
          <mat-icon>category</mat-icon> Gérer les catégories
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dash-page { max-width: var(--max-width); margin: 0 auto; padding: 48px 24px; }
    .dash-header { margin-bottom: 32px; h1 { margin-bottom: 4px; } p { color: var(--text-secondary); } }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .stat-card {
      display: flex; align-items: center; gap: 16px;
      padding: 24px; border-radius: var(--radius-lg);
      background: var(--surface); border: 1px solid var(--border);
    }
    .stat-icon {
      width: 52px; height: 52px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      mat-icon { color: white; font-size: 24px; }
    }
    .stat-info { display: flex; flex-direction: column; }
    .stat-num { font-size: 1.5rem; font-weight: 800; color: var(--text); }
    .stat-lbl { font-size: 0.85rem; color: var(--text-secondary); }
    .admin-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .admin-btn { height: 44px !important; border-radius: 10px !important; }
  `],
})
export class DashboardAdminComponent implements OnInit {
  private api = inject(ApiService);
  stats?: any;
  ngOnInit() { this.api.statistiques().subscribe((s) => (this.stats = s)); }
}
