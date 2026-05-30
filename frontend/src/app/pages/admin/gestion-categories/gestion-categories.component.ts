import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { Categorie } from '../../../core/models';

@Component({
  selector: 'app-gestion-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule],
  template: `
    <div class="container" style="padding-top:24px; max-width:700px;">
      <mat-card>
        <mat-card-header><mat-card-title>Catégories</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="add()" class="row">
            <mat-form-field appearance="outline" class="grow">
              <mat-label>Nom de la catégorie</mat-label>
              <input matInput formControlName="nom" />
            </mat-form-field>
            <button mat-raised-button color="primary" [disabled]="form.invalid">Ajouter</button>
          </form>
          <mat-list>
            <mat-list-item *ngFor="let c of categories">
              {{ c.nom }}
              <span class="spacer"></span>
              <button mat-icon-button color="warn" (click)="remove(c.idCategorie)"><mat-icon>delete</mat-icon></button>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class GestionCategoriesComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  categories: Categorie[] = [];
  form = this.fb.group({ nom: ['', Validators.required] });
  ngOnInit() { this.refresh(); }
  refresh() { this.api.categories().subscribe((c) => (this.categories = c)); }
  add() {
    this.api.createCategorie(this.form.value.nom!).subscribe(() => { this.form.reset(); this.refresh(); });
  }
  remove(id: number) { this.api.deleteCategorie(id).subscribe(() => this.refresh()); }
}
