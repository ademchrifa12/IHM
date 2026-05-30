import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../../core/services/api.service';
import { Categorie, Service, SousCategorie } from '../../../core/models';

@Component({
  selector: 'app-gestion-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatListModule],
  template: `
    <div class="container" style="padding-top:24px;">
      <mat-card>
        <mat-card-header><mat-card-title>Ajouter un service</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="add()">
            <div class="row">
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Catégorie</mat-label>
                <mat-select formControlName="idCategorie" (selectionChange)="loadSous($event.value)">
                  <mat-option *ngFor="let c of categories" [value]="c.idCategorie">{{ c.nom }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Sous-catégorie</mat-label>
                <mat-select formControlName="idSousCategorie">
                  <mat-option *ngFor="let s of sous" [value]="s.idSousCategorie">{{ s.nom }}</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" style="width:100%">
              <mat-label>Titre</mat-label>
              <input matInput formControlName="titre" />
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%">
              <mat-label>Description</mat-label>
              <textarea matInput rows="2" formControlName="description"></textarea>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Prix (€)</mat-label>
              <input matInput type="number" min="0" formControlName="prix" />
            </mat-form-field>
            <button mat-raised-button color="primary" [disabled]="form.invalid">Ajouter</button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card style="margin-top:16px;">
        <mat-card-header><mat-card-title>Mes services</mat-card-title></mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let s of services">
              <strong>{{ s.titre }}</strong> — {{ s.prix | number:'1.2-2' }} €
              <span class="text-muted" style="margin-left:8px;">{{ s.categorie?.nom }}</span>
              <span class="spacer"></span>
              <button mat-icon-button color="warn" (click)="remove(s.idService)"><mat-icon>delete</mat-icon></button>
            </mat-list-item>
          </mat-list>
          <p *ngIf="!services.length" class="text-muted">Aucun service.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class GestionServicesComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  categories: Categorie[] = [];
  sous: SousCategorie[] = [];
  services: Service[] = [];
  form = this.fb.group({
    idCategorie: [null as number | null, Validators.required],
    idSousCategorie: [null as number | null],
    titre: ['', Validators.required],
    description: [''],
    prix: [0, [Validators.required, Validators.min(0)]],
  });
  ngOnInit() {
    this.api.categories().subscribe((c) => (this.categories = c));
    this.refresh();
  }
  loadSous(id: number) { this.api.sousCategories(id).subscribe((s) => (this.sous = s)); }
  refresh() { this.api.servicesAll().subscribe((s) => (this.services = s)); }
  add() {
    this.api.createService(this.form.value).subscribe(() => { this.form.reset({ prix: 0 } as any); this.refresh(); });
  }
  remove(id: number) { this.api.deleteService(id).subscribe(() => this.refresh()); }
}
