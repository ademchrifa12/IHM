import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../../core/services/api.service';
import { Reservation } from '../../../core/models';

@Component({
  selector: 'app-mes-reservations',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatChipsModule],
  template: `
    <div class="container" style="padding-top:24px;">
      <mat-card>
        <mat-card-header><mat-card-title>Mes réservations</mat-card-title></mat-card-header>
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
            <ng-container matColumnDef="prestataire">
              <th mat-header-cell *matHeaderCellDef>Prestataire</th>
              <td mat-cell *matCellDef="let r">#{{ r.prestataire?.idPrestataire }}</td>
            </ng-container>
            <ng-container matColumnDef="statut">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let r">
                <mat-chip>{{ r.statut }}</mat-chip>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="cols"></tr>
            <tr mat-row *matRowDef="let row; columns: cols"></tr>
          </table>
          <ng-template #vide><p class="text-muted">Aucune réservation pour le moment.</p></ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class MesReservationsComponent implements OnInit {
  private api = inject(ApiService);
  reservations: Reservation[] = [];
  cols = ['date', 'service', 'prestataire', 'statut'];
  ngOnInit() { this.api.mesReservationsClient().subscribe((r) => (this.reservations = r)); }
}
