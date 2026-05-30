import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../../core/services/api.service';
import { Prestataire } from '../../../core/models';

@Component({
  selector: 'app-gestion-prestataires',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatChipsModule],
  template: `
    <div class="container" style="padding-top:24px;">
      <mat-card>
        <mat-card-header><mat-card-title>Gestion des prestataires</mat-card-title></mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="items">
            <ng-container matColumnDef="nom">
              <th mat-header-cell *matHeaderCellDef>Nom</th>
              <td mat-cell *matCellDef="let p">{{ p.user?.prenom }} {{ p.user?.nom }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>E-mail</th>
              <td mat-cell *matCellDef="let p">{{ p.user?.email }}</td>
            </ng-container>
            <ng-container matColumnDef="statut">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let p"><mat-chip>{{ p.statutValidation }}</mat-chip></td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let p">
                <button mat-button color="primary" (click)="setStatut(p,'VALIDE')">Valider</button>
                <button mat-button color="warn" (click)="setStatut(p,'REJETE')">Rejeter</button>
                <button mat-button (click)="setStatut(p,'SUSPENDU')">Suspendre</button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="cols"></tr>
            <tr mat-row *matRowDef="let row; columns: cols"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class GestionPrestatairesComponent implements OnInit {
  private api = inject(ApiService);
  items: Prestataire[] = [];
  cols = ['nom', 'email', 'statut', 'actions'];
  ngOnInit() { this.refresh(); }
  refresh() {
    this.api.searchPrestataires({ limit: 100 }).subscribe((r) => (this.items = r.items));
  }
  setStatut(p: Prestataire, statut: string) {
    this.api.setValidation(p.idPrestataire, statut).subscribe(() => this.refresh());
  }
}
