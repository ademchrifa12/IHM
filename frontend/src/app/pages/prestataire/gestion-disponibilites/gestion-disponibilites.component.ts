import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-gestion-disponibilites',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="container" style="padding-top:24px; max-width:600px;">
      <mat-card>
        <mat-card-header><mat-card-title>Ajouter une disponibilité</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="add()">
            <mat-form-field appearance="outline" style="width:100%">
              <mat-label>Date</mat-label>
              <input matInput type="date" formControlName="date" />
            </mat-form-field>
            <div class="row">
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Heure début</mat-label>
                <input matInput type="time" formControlName="heureDebut" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Heure fin</mat-label>
                <input matInput type="time" formControlName="heureFin" />
              </mat-form-field>
            </div>
            <button mat-raised-button color="primary" [disabled]="form.invalid">Ajouter</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class GestionDisponibilitesComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snack = inject(MatSnackBar);
  form = this.fb.group({
    date: ['', Validators.required],
    heureDebut: ['', Validators.required],
    heureFin: ['', Validators.required],
  });
  add() {
    this.api.createDisponibilite(this.form.value).subscribe(() => {
      this.snack.open('Disponibilité ajoutée.', 'OK', { duration: 2500 });
      this.form.reset();
    });
  }
}
