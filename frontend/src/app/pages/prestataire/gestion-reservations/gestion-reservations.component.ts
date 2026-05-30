import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../../core/services/api.service';
import { Reservation } from '../../../core/models';

@Component({
  selector: 'app-gestion-reservations',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatChipsModule],
  template: `
    <div class="container" style="padding-top:24px;">
      <mat-card>
        <mat-card-header><mat-card-title>Réservations reçues</mat-card-title></mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="reservations" *ngIf="reservations.length; else vide">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let r">{{ r.dateReservation | date:'short':'':'fr' }}</td>
            </ng-container>
            <ng-container matColumnDef="service">
              <th mat-header-cell *matHeaderCellDef>Service</th>
              <td mat-cell *matCellDef="let r">{{ r.service?.titre }}</td>
            </ng-container>
            <ng-container matColumnDef="statut">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let r"><mat-chip>{{ r.statut }}</mat-chip></td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let r">
                <button mat-button color="primary" (click)="setStatut(r,'ACCEPTEE')">Accepter</button>
                <button mat-button color="warn" (click)="setStatut(r,'REFUSEE')">Refuser</button>
                <button mat-button (click)="setStatut(r,'TERMINEE')">Terminer</button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="cols"></tr>
            <tr mat-row *matRowDef="let row; columns: cols"></tr>
          </table>
          <ng-template #vide><p class="text-muted">Aucune réservation.</p></ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class GestionReservationsComponent implements OnInit {
  private api = inject(ApiService);
  reservations: Reservation[] = [];
  cols = ['date', 'service', 'statut', 'actions'];
  ngOnInit() { this.refresh(); }
  refresh() { this.api.mesReservationsPrestataire().subscribe((r) => (this.reservations = r)); }
  setStatut(r: Reservation, statut: string) {
    this.api.changerStatutReservation(r.idReservation, statut).subscribe(() => this.refresh());
  }
}
