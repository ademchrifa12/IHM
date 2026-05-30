import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
  template: `
    <nav class="navbar">
      <div class="navbar-inner">
        <a routerLink="/" class="brand">
          <div class="brand-icon">
            <mat-icon>home_repair_service</mat-icon>
          </div>
          <span class="brand-text">ServicesPro</span>
        </a>

        <div class="nav-links">
          <a routerLink="/recherche" routerLinkActive="active" class="nav-link">
            <mat-icon>search</mat-icon> Recherche
          </a>
          <a routerLink="/prestataires" routerLinkActive="active" class="nav-link">
            <mat-icon>people</mat-icon> Prestataires
          </a>
        </div>

        <div class="nav-actions">
          <ng-container *ngIf="!auth.isLogged(); else logged">
            <a mat-button routerLink="/connexion" class="btn-login">Connexion</a>
            <a mat-raised-button color="primary" routerLink="/inscription" class="btn-register">
              Commencer gratuitement
            </a>
          </ng-container>

          <ng-template #logged>
            <button mat-button [matMenuTriggerFor]="menu" class="user-btn">
              <div class="user-avatar">{{ auth.user()?.prenom?.charAt(0) }}{{ auth.user()?.nom?.charAt(0) }}</div>
              <span class="user-name">{{ auth.user()?.prenom }}</span>
              <mat-icon>expand_more</mat-icon>
            </button>
            <mat-menu #menu="matMenu" class="user-menu">
              <div class="menu-header">
                <strong>{{ auth.user()?.prenom }} {{ auth.user()?.nom }}</strong>
                <span class="text-muted">{{ auth.user()?.email }}</span>
              </div>
              <mat-divider></mat-divider>
              <a mat-menu-item *ngIf="auth.role()==='CLIENT'" routerLink="/client">
                <mat-icon>dashboard</mat-icon> Tableau de bord
              </a>
              <a mat-menu-item *ngIf="auth.role()==='PRESTATAIRE'" routerLink="/prestataire">
                <mat-icon>dashboard</mat-icon> Tableau de bord
              </a>
              <a mat-menu-item *ngIf="auth.role()==='ADMIN'" routerLink="/admin">
                <mat-icon>admin_panel_settings</mat-icon> Administration
              </a>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()" class="logout-btn">
                <mat-icon>logout</mat-icon> Déconnexion
              </button>
            </mat-menu>
          </ng-template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-outlet />
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="brand">
            <div class="brand-icon"><mat-icon>home_repair_service</mat-icon></div>
            <span class="brand-text">ServicesPro</span>
          </div>
          <p>La plateforme de référence pour trouver des professionnels qualifiés près de chez vous.</p>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <a routerLink="/">Accueil</a>
          <a routerLink="/recherche">Recherche</a>
          <a routerLink="/prestataires">Prestataires</a>
        </div>
        <div class="footer-links">
          <h4>Compte</h4>
          <a routerLink="/connexion">Connexion</a>
          <a routerLink="/inscription">Inscription</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ year }} ServicesPro — Plateforme de Services à Domicile. Tous droits réservés.</p>
      </div>
    </footer>
  `,
  styles: [`
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 0 24px;
    }
    .navbar-inner {
      max-width: var(--max-width);
      margin: 0 auto;
      display: flex;
      align-items: center;
      height: 68px;
      gap: 32px;
    }
    .brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none !important; color: var(--text);
    }
    .brand-icon {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      mat-icon { color: white; font-size: 22px; width: 22px; height: 22px; }
    }
    .brand-text { font-weight: 800; font-size: 1.2rem; letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 4px; flex: 1; }
    .nav-link {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 8px;
      font-weight: 500; font-size: 0.9rem;
      color: var(--text-secondary); text-decoration: none;
      transition: var(--transition);
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
      &:hover { background: var(--surface-alt); color: var(--text); }
      &.active { background: #e8eaf6; color: var(--primary); }
    }
    .nav-actions { display: flex; align-items: center; gap: 12px; }
    .btn-login { font-weight: 600 !important; color: var(--text) !important; }
    .btn-register { border-radius: 8px !important; font-size: 0.85rem !important; }
    .user-btn {
      display: flex !important; align-items: center; gap: 8px;
      border-radius: 8px !important;
    }
    .user-avatar {
      width: 32px; height: 32px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700; font-size: 0.75rem;
    }
    .user-name { font-weight: 600; }
    .menu-header {
      padding: 12px 16px;
      display: flex; flex-direction: column;
      strong { font-size: 0.9rem; }
      span { font-size: 0.8rem; }
    }
    .main-content { min-height: calc(100vh - 68px - 300px); }
    .footer {
      background: var(--primary-dark); color: white;
      padding: 64px 24px 0;
      margin-top: 64px;
    }
    .footer-inner {
      max-width: var(--max-width); margin: 0 auto;
      display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
      padding-bottom: 48px;
    }
    .footer-brand {
      p { color: rgba(255,255,255,.7); margin-top: 12px; font-size: 0.9rem; max-width: 320px; }
      .brand-text { color: white; }
    }
    .footer-links {
      display: flex; flex-direction: column; gap: 8px;
      h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7; margin-bottom: 8px; }
      a { color: rgba(255,255,255,.8); font-size: 0.9rem; &:hover { color: white; } }
    }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,.1);
      padding: 20px 0;
      text-align: center;
      p { color: rgba(255,255,255,.5); font-size: 0.8rem; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .footer-inner { grid-template-columns: 1fr; gap: 32px; }
      .btn-register { display: none !important; }
    }
  `],
})
export class AppComponent {
  protected auth = inject(AuthService);
  private router = inject(Router);
  year = new Date().getFullYear();
  logout() { this.auth.logout(); this.router.navigate(['/']); }
}
