import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { Categorie, Region, SousCategorie, Ville } from '../../../core/models';

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  template: `
    <div class="search-page">
      <div class="search-header">
        <h1>Recherche avancée</h1>
        <p>Trouvez le prestataire idéal selon vos critères</p>
      </div>
      <div class="search-card">
        <form [formGroup]="form" (ngSubmit)="search()">
          <div class="filter-grid">
            <mat-form-field appearance="outline">
              <mat-label>Mot-clé</mat-label>
              <input matInput formControlName="q" placeholder="ex. fuite, jardin…" />
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Catégorie</mat-label>
              <mat-select formControlName="idCategorie" (selectionChange)="onCategorie($event.value)">
                <mat-option [value]="null">— Toutes —</mat-option>
                <mat-option *ngFor="let c of categories" [value]="c.idCategorie">{{ c.nom }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Sous-catégorie</mat-label>
              <mat-select formControlName="idSousCategorie">
                <mat-option [value]="null">— Toutes —</mat-option>
                <mat-option *ngFor="let s of sousCategories" [value]="s.idSousCategorie">{{ s.nom }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Région</mat-label>
              <mat-select formControlName="idRegion" (selectionChange)="onRegion($event.value)">
                <mat-option [value]="null">— Toutes —</mat-option>
                <mat-option *ngFor="let r of regions" [value]="r.idRegion">{{ r.nomRegion }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Ville</mat-label>
              <mat-select formControlName="idVille">
                <mat-option [value]="null">— Toutes —</mat-option>
                <mat-option *ngFor="let v of villes" [value]="v.idVille">{{ v.nomVille }}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Note minimale</mat-label>
              <mat-select formControlName="noteMin">
                <mat-option [value]="null">— Toutes —</mat-option>
                <mat-option [value]="3">3 ★ et +</mat-option>
                <mat-option [value]="4">4 ★ et +</mat-option>
                <mat-option [value]="4.5">4,5 ★ et +</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Distance max (km)</mat-label>
              <mat-select formControlName="distanceKm">
                <mat-option [value]="null">— Aucune —</mat-option>
                <mat-option [value]="5">5 km</mat-option>
                <mat-option [value]="10">10 km</mat-option>
                <mat-option [value]="20">20 km</mat-option>
                <mat-option [value]="50">50 km</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div class="search-actions">
            <button mat-raised-button color="primary" type="submit" class="btn-search">
              <mat-icon>search</mat-icon> Rechercher
            </button>
            <button mat-stroked-button type="button" (click)="useMyLocation()" class="btn-loc">
              <mat-icon>my_location</mat-icon> Ma position
            </button>
            <span *ngIf="form.value.latitude" class="loc-info">
              <mat-icon>place</mat-icon>
              {{ form.value.latitude | number:'1.2-4' }}, {{ form.value.longitude | number:'1.2-4' }}
            </span>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .search-page { max-width: var(--max-width); margin: 0 auto; padding: 48px 24px; }
    .search-header { margin-bottom: 32px; h1 { margin-bottom: 4px; } p { color: var(--text-secondary); } }
    .search-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 32px;
    }
    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .filter-grid mat-form-field { width: 100%; }
    .search-actions {
      display: flex; align-items: center; gap: 12px; margin-top: 16px; flex-wrap: wrap;
    }
    .btn-search { height: 44px !important; padding: 0 28px !important; border-radius: 10px !important; }
    .btn-loc { height: 44px !important; border-radius: 10px !important; }
    .loc-info {
      display: flex; align-items: center; gap: 4px;
      font-size: 0.85rem; color: var(--text-secondary);
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }
  `],
})
export class RechercheComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  regions: Region[] = [];
  villes: Ville[] = [];

  form = this.fb.group({
    q: [''],
    idCategorie: [null as number | null],
    idSousCategorie: [null as number | null],
    idRegion: [null as number | null],
    idVille: [null as number | null],
    noteMin: [null as number | null],
    distanceKm: [null as number | null],
    latitude: [null as number | null],
    longitude: [null as number | null],
  });

  ngOnInit() {
    this.api.categories().subscribe((c) => (this.categories = c));
    this.api.regions().subscribe((r) => (this.regions = r));
  }
  onCategorie(id: number | null) {
    this.form.patchValue({ idSousCategorie: null });
    if (id) this.api.sousCategories(id).subscribe((s) => (this.sousCategories = s));
    else this.sousCategories = [];
  }
  onRegion(id: number | null) {
    this.form.patchValue({ idVille: null });
    if (id) this.api.villes(id).subscribe((v) => (this.villes = v));
    else this.villes = [];
  }
  useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      this.form.patchValue({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    });
  }
  search() {
    const params: any = {};
    Object.entries(this.form.value).forEach(([k, v]) => { if (v !== null && v !== '') params[k] = v; });
    this.router.navigate(['/prestataires'], { queryParams: params });
  }
}
