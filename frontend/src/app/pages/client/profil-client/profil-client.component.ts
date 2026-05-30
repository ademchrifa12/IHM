import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profil-client',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container" style="padding-top:24px; max-width:600px;">
      <mat-card>
        <mat-card-header><mat-card-title>Mon profil</mat-card-title></mat-card-header>
        <mat-card-content>
          <p><strong>Nom :</strong> {{ auth.user()?.nom }}</p>
          <p><strong>Prénom :</strong> {{ auth.user()?.prenom }}</p>
          <p><strong>E-mail :</strong> {{ auth.user()?.email }}</p>
          <p><strong>Rôle :</strong> {{ auth.user()?.role }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ProfilClientComponent {
  protected auth = inject(AuthService);
}
