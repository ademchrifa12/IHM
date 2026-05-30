import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-profil-prestataire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="container" style="padding-top:24px; max-width:700px;">
      <mat-card>
        <mat-card-header><mat-card-title>Mon profil professionnel</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="save()">
            <mat-form-field appearance="outline" style="width:100%">
              <mat-label>Description</mat-label>
              <textarea matInput rows="3" formControlName="description"></textarea>
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%">
              <mat-label>Photo (URL)</mat-label>
              <input matInput formControlName="photo" />
            </mat-form-field>
            <div class="row">
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Téléphone</mat-label>
                <input matInput formControlName="telephone" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Adresse</mat-label>
                <input matInput formControlName="adresse" />
              </mat-form-field>
            </div>
            <div class="row">
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Latitude</mat-label>
                <input matInput type="number" step="0.000001" formControlName="latitude" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="grow">
                <mat-label>Longitude</mat-label>
                <input matInput type="number" step="0.000001" formControlName="longitude" />
              </mat-form-field>
              <button mat-button type="button" (click)="useMyLocation()">Utiliser ma position</button>
            </div>
            <button mat-raised-button color="primary" type="submit">Enregistrer</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ProfilPrestataireComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private snack = inject(MatSnackBar);
  form = this.fb.group({
    description: [''], photo: [''], telephone: [''], adresse: [''],
    latitude: [null as number | null], longitude: [null as number | null],
  });
  useMyLocation() {
    navigator.geolocation?.getCurrentPosition((p) =>
      this.form.patchValue({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
    );
  }
  save() {
    this.api.updateMyPrestataire(this.form.value as any).subscribe(() => {
      this.snack.open('Profil mis à jour.', 'OK', { duration: 3000 });
    });
  }
}
