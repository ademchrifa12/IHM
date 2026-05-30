import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import * as L from 'leaflet';
import { ApiService } from '../../../core/services/api.service';
import { Prestataire } from '../../../core/models';

@Component({
  selector: 'app-liste-prestataires',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="list-page">
      <div class="list-header">
        <h1>Prestataires <span class="badge">{{ total }}</span></h1>
      </div>

      <div #map class="map-container"></div>

      <div class="presta-grid">
        <a *ngFor="let p of items" [routerLink]="['/prestataires', p.idPrestataire]" class="presta-card">
          <div class="presta-avatar">
            <img [src]="p.photo || 'https://i.pravatar.cc/120?u=' + p.idPrestataire" alt="" />
          </div>
          <div class="presta-info">
            <h3>{{ p.user?.prenom }} {{ p.user?.nom }}</h3>
            <p class="presta-service">{{ p.services?.[0]?.titre || 'Service à domicile' }}</p>
            <p class="presta-address"><mat-icon>place</mat-icon>{{ p.adresse || 'Non renseignée' }}</p>
            <div class="presta-meta">
              <span class="presta-rating"><mat-icon>star</mat-icon>{{ (p.noteMoyenne || 0) | number:'1.1-1' }}</span>
              <span *ngIf="p.distanceKm != null" class="presta-dist">{{ p.distanceKm | number:'1.1-1' }} km</span>
            </div>
            <div class="presta-chips">
              <span *ngFor="let s of (p.services || []).slice(0,3)" class="chip">{{ s.titre }}</span>
            </div>
          </div>
          <div class="presta-action">
            <mat-icon>arrow_forward</mat-icon>
          </div>
        </a>
      </div>
      <p *ngIf="!items.length" class="empty-state">
        <mat-icon>search_off</mat-icon>
        Aucun prestataire trouvé. Essayez d'élargir vos critères de recherche.
      </p>
    </div>
  `,
  styles: [`
    .list-page { max-width: var(--max-width); margin: 0 auto; padding: 48px 24px; }
    .list-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
      h1 { margin: 0; }
    }
    .map-container {
      height: 300px; border-radius: var(--radius-lg);
      border: 1px solid var(--border); margin-bottom: 32px;
      overflow: hidden;
    }
    .presta-grid { display: flex; flex-direction: column; gap: 12px; }
    .presta-card {
      display: flex; align-items: center; gap: 20px;
      padding: 20px 24px; border-radius: var(--radius-md);
      background: var(--surface); border: 1px solid var(--border);
      text-decoration: none !important; color: var(--text);
      transition: var(--transition);
      &:hover { border-color: var(--primary-light); box-shadow: var(--shadow-md); transform: translateY(-1px); }
    }
    .presta-avatar {
      flex-shrink: 0;
      img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }
    }
    .presta-info { flex: 1; h3 { margin: 0 0 4px; font-size: 1.05rem; } }
    .presta-service { color: var(--primary-light); font-weight: 500; font-size: 0.9rem; margin: 0 0 4px; }
    .presta-address {
      display: flex; align-items: center; gap: 4px; font-size: 0.85rem; color: var(--text-secondary); margin: 0 0 8px;
      mat-icon { font-size: 14px; width: 14px; height: 14px; }
    }
    .presta-meta { display: flex; gap: 16px; font-size: 0.85rem; margin-bottom: 8px; }
    .presta-rating {
      display: flex; align-items: center; gap: 2px; font-weight: 600; color: #f59e0b;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }
    .presta-dist { color: var(--text-secondary); }
    .presta-chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip {
      padding: 3px 10px; border-radius: 6px; font-size: 0.75rem;
      background: #e8eaf6; color: var(--primary); font-weight: 500;
    }
    .presta-action {
      flex-shrink: 0; color: var(--text-secondary);
      mat-icon { font-size: 20px; }
    }
    .empty-state {
      text-align: center; padding: 64px 24px; color: var(--text-secondary);
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      mat-icon { font-size: 48px; width: 48px; height: 48px; opacity: .4; }
    }
  `],
})
export class ListePrestatairesComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  @ViewChild('map', { static: true }) mapEl!: ElementRef<HTMLDivElement>;
  items: Prestataire[] = [];
  total = 0;
  private map?: L.Map;

  ngOnInit() {
    this.route.queryParams.subscribe((q) => {
      this.api.searchPrestataires(q).subscribe((res) => {
        this.items = res.items;
        this.total = res.total;
        this.renderMarkers();
      });
    });
  }

  ngAfterViewInit() {
    this.map = L.map(this.mapEl.nativeElement).setView([46.6, 2.5], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  private renderMarkers() {
    if (!this.map) return;
    this.map.eachLayer((l) => { if ((l as any)._latlng) this.map!.removeLayer(l); });
    const points: L.LatLng[] = [];
    this.items.forEach((p) => {
      if (p.latitude && p.longitude) {
        const m = L.marker([p.latitude, p.longitude]).addTo(this.map!);
        m.bindPopup(`<strong>${p.user?.prenom} ${p.user?.nom}</strong><br>${p.adresse ?? ''}`);
        points.push(L.latLng(p.latitude, p.longitude));
      }
    });
    if (points.length) this.map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
  }
}
