import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { Categorie } from '../../../core/models';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-badge">✨ La plateforme n°1 en France</div>
      <h1>Trouvez le professionnel<br><span class="hero-highlight">parfait</span> près de chez vous</h1>
      <p>Plombier, électricien, jardinier, femme de ménage — plus de 500 prestataires vérifiés à votre service.</p>
      <div class="hero-actions">
        <a mat-raised-button color="primary" routerLink="/recherche" class="btn-hero">
          <mat-icon>search</mat-icon> Rechercher un service
        </a>
        <a mat-stroked-button routerLink="/inscription" class="btn-hero-secondary">
          Devenir prestataire →
        </a>
      </div>
      <div class="hero-trust">
        <div class="trust-item">
          <mat-icon>verified</mat-icon>
          <span>Prestataires vérifiés</span>
        </div>
        <div class="trust-item">
          <mat-icon>schedule</mat-icon>
          <span>Réponse sous 2h</span>
        </div>
        <div class="trust-item">
          <mat-icon>star</mat-icon>
          <span>4.8/5 satisfaction</span>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-bar">
      <div class="stats-inner">
        <div class="stat-item"><span class="stat-num">500+</span><span class="stat-lbl">Prestataires</span></div>
        <div class="stat-item"><span class="stat-num">10k+</span><span class="stat-lbl">Clients satisfaits</span></div>
        <div class="stat-item"><span class="stat-num">25k+</span><span class="stat-lbl">Services réalisés</span></div>
        <div class="stat-item"><span class="stat-num">4.8</span><span class="stat-lbl">Note moyenne</span></div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="section">
      <div class="section-header">
        <h2>Nos catégories de services</h2>
        <p>Des professionnels qualifiés dans tous les domaines du service à domicile</p>
      </div>
      <div class="container">
        <div class="cat-grid">
          <a *ngFor="let c of categories; let i = index"
             [routerLink]="['/prestataires']"
             [queryParams]="{ idCategorie: c.idCategorie }"
             class="cat-card animate-in"
             [style.animation-delay]="(i * 0.05) + 's'">
            <div class="cat-icon" [style.background]="gradients[i % gradients.length]">
              <mat-icon>{{ icons[i % icons.length] }}</mat-icon>
            </div>
            <h3>{{ c.nom }}</h3>
            <span class="cat-count">{{ c.sousCategories?.length || 0 }} services</span>
            <mat-icon class="cat-arrow">arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-inner">
        <h2>Prêt à simplifier votre quotidien ?</h2>
        <p>Inscrivez-vous gratuitement et trouvez un professionnel en quelques clics.</p>
        <div class="hero-actions">
          <a mat-raised-button routerLink="/inscription" class="btn-cta">
            Créer un compte gratuitement
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(255,255,255,.15);
      border: 1px solid rgba(255,255,255,.25);
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 24px;
      position: relative;
    }
    .hero-highlight {
      background: linear-gradient(90deg, #ffab40, #ff6d00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .btn-hero {
      height: 52px !important; padding: 0 32px !important;
      font-size: 1rem !important; border-radius: 12px !important;
    }
    .btn-hero-secondary {
      height: 52px !important; padding: 0 32px !important;
      font-size: 1rem !important; border-radius: 12px !important;
      color: white !important; border-color: rgba(255,255,255,.4) !important;
      &:hover { background: rgba(255,255,255,.1) !important; }
    }
    .hero-trust {
      display: flex; gap: 32px; margin-top: 48px;
      position: relative; justify-content: center; flex-wrap: wrap;
    }
    .trust-item {
      display: flex; align-items: center; gap: 8px;
      font-size: 0.9rem; opacity: 0.9;
      mat-icon { font-size: 18px; width: 18px; height: 18px; }
    }
    .stats-bar {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 32px 24px;
    }
    .stats-inner {
      max-width: var(--max-width); margin: 0 auto;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
      text-align: center;
    }
    .stat-item { display: flex; flex-direction: column; gap: 4px; }
    .stat-num {
      font-size: 2rem; font-weight: 800;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stat-lbl { font-size: 0.85rem; color: var(--text-secondary); }
    .cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .cat-card {
      display: flex; align-items: center; gap: 16px;
      padding: 20px; border-radius: var(--radius-md);
      background: var(--surface);
      border: 1px solid var(--border);
      text-decoration: none !important; color: var(--text);
      transition: var(--transition);
      position: relative; overflow: hidden;
      &:hover {
        border-color: var(--primary-light);
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
        .cat-arrow { opacity: 1; transform: translateX(0); }
      }
      h3 { font-size: 0.95rem; font-weight: 600; flex: 1; }
    }
    .cat-icon {
      width: 44px; height: 44px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      mat-icon { color: white; font-size: 22px; width: 22px; height: 22px; }
    }
    .cat-count { font-size: 0.75rem; color: var(--text-secondary); }
    .cat-arrow {
      opacity: 0; transform: translateX(-8px);
      transition: var(--transition);
      color: var(--primary-light); font-size: 18px;
    }
    .cta-section {
      padding: 80px 24px;
    }
    .cta-inner {
      max-width: 700px; margin: 0 auto; text-align: center;
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      padding: 64px 48px; border-radius: var(--radius-xl);
      color: white;
      h2 { color: white; margin-bottom: 12px; }
      p { color: rgba(255,255,255,.85); margin-bottom: 32px; }
    }
    .btn-cta {
      background: white !important; color: var(--primary) !important;
      font-weight: 700 !important; height: 52px !important;
      padding: 0 36px !important; border-radius: 12px !important;
      font-size: 1rem !important;
    }
    @media (max-width: 768px) {
      .stats-inner { grid-template-columns: repeat(2, 1fr); }
      .hero-trust { flex-direction: column; align-items: center; gap: 12px; }
    }
  `],
})
export class AccueilComponent implements OnInit {
  private api = inject(ApiService);
  categories: Categorie[] = [];
  icons = ['plumbing', 'electrical_services', 'format_paint', 'yard', 'cleaning_services', 'kitchen', 'computer', 'ac_unit', 'local_shipping'];
  gradients = [
    'linear-gradient(135deg,#1565c0,#42a5f5)',
    'linear-gradient(135deg,#e65100,#ff9800)',
    'linear-gradient(135deg,#6a1b9a,#ab47bc)',
    'linear-gradient(135deg,#2e7d32,#66bb6a)',
    'linear-gradient(135deg,#00838f,#26c6da)',
    'linear-gradient(135deg,#d84315,#ff7043)',
    'linear-gradient(135deg,#283593,#5c6bc0)',
    'linear-gradient(135deg,#00695c,#4db6ac)',
    'linear-gradient(135deg,#4e342e,#8d6e63)',
  ];
  ngOnInit() { this.api.categories().subscribe((c) => (this.categories = c)); }
}
