import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Commentaire, Prestataire } from '../../../core/models';

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <div class="detail-page" *ngIf="prestataire as p">
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="profile-avatar">
          <img [src]="p.photo || 'https://i.pravatar.cc/160?u=' + p.idPrestataire" alt="" />
        </div>
        <div class="profile-info">
          <h1>{{ p.user?.prenom }} {{ p.user?.nom }}</h1>
          <div class="profile-rating">
            <span class="rating-stars">
              <mat-icon *ngFor="let _ of stars(Math.round(p.noteMoyenne || 0))">star</mat-icon>
            </span>
            <span class="rating-text">{{ (p.noteMoyenne || 0) | number:'1.1-1' }} / 5</span>
            <span class="rating-count">({{ p.nbAvis || 0 }} avis)</span>
          </div>
          <p class="profile-desc">{{ p.description }}</p>
          <div class="profile-contact">
            <span *ngIf="p.adresse"><mat-icon>place</mat-icon>{{ p.adresse }}</span>
            <span *ngIf="p.telephone"><mat-icon>phone</mat-icon>{{ p.telephone }}</span>
          </div>
        </div>
      </div>

      <!-- Services -->
      <section class="section-block">
        <h2><mat-icon>handyman</mat-icon> Services proposés</h2>
        <div class="services-grid">
          <div *ngFor="let s of p.services" class="service-card">
            <div class="service-top">
              <h3>{{ s.titre }}</h3>
              <span class="service-price">{{ s.prix | number:'1.0-0' }} €</span>
            </div>
            <p class="service-cat">{{ s.categorie?.nom }}{{ s.sousCategorie ? ' / ' + s.sousCategorie.nom : '' }}</p>
            <p class="service-desc">{{ s.description }}</p>
            <button mat-raised-button color="primary" (click)="selectService(s.idService)" class="btn-book">
              <mat-icon>calendar_today</mat-icon> Réserver
            </button>
          </div>
        </div>
      </section>

      <!-- Reservation Form -->
      <section *ngIf="reservationForm.value.idService" class="section-block reservation-block">
        <h2><mat-icon>event</mat-icon> Réservation</h2>
        <form [formGroup]="reservationForm" (ngSubmit)="reserver()" class="resa-form">
          <mat-form-field appearance="outline">
            <mat-label>Date et heure</mat-label>
            <input matInput type="datetime-local" formControlName="dateReservation" />
          </mat-form-field>
          <button mat-raised-button color="primary" [disabled]="reservationForm.invalid" class="btn-book">
            Confirmer la réservation
          </button>
        </form>
      </section>

      <!-- Reviews -->
      <section class="section-block">
        <h2><mat-icon>reviews</mat-icon> Avis des clients</h2>
        <div class="reviews-list">
          <div *ngFor="let c of commentaires" class="review-card">
            <div class="review-header">
              <span class="review-stars">
                <mat-icon *ngFor="let _ of stars(c.note)">star</mat-icon>
              </span>
              <span class="review-date">{{ c.dateCreation | date:'mediumDate':'':'fr' }}</span>
            </div>
            <p>{{ c.commentaire }}</p>
          </div>
          <p *ngIf="!commentaires.length" class="empty-text">Aucun avis pour le moment.</p>
        </div>

        <!-- Leave review -->
        <div *ngIf="auth.role()==='CLIENT'" class="review-form">
          <h3>Laisser un avis</h3>
          <form [formGroup]="avisForm" (ngSubmit)="noter()">
            <mat-form-field appearance="outline">
              <mat-label>Note</mat-label>
              <mat-select formControlName="note">
                <mat-option *ngFor="let n of [1,2,3,4,5]" [value]="n">{{ n }} ★</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline" style="width:100%">
              <mat-label>Commentaire</mat-label>
              <textarea matInput rows="3" formControlName="commentaire"></textarea>
            </mat-form-field>
            <button mat-raised-button color="accent" [disabled]="avisForm.invalid">Publier l'avis</button>
          </form>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .detail-page { max-width: var(--max-width); margin: 0 auto; padding: 48px 24px; }
    .profile-header {
      display: flex; gap: 32px; align-items: flex-start;
      padding: 32px; background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-lg); margin-bottom: 40px;
    }
    .profile-avatar img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid var(--border); }
    .profile-info { flex: 1; h1 { margin: 0 0 8px; } }
    .profile-rating {
      display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
    }
    .rating-stars mat-icon { color: #f59e0b; font-size: 20px; width: 20px; height: 20px; }
    .rating-text { font-weight: 700; font-size: 1rem; }
    .rating-count { color: var(--text-secondary); font-size: 0.9rem; }
    .profile-desc { color: var(--text-secondary); margin-bottom: 12px; }
    .profile-contact {
      display: flex; gap: 24px; flex-wrap: wrap;
      span { display: flex; align-items: center; gap: 6px; font-size: 0.9rem; color: var(--text-secondary);
        mat-icon { font-size: 16px; width: 16px; height: 16px; }
      }
    }
    .section-block { margin-bottom: 40px; h2 { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; } }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .service-card {
      padding: 24px; border-radius: var(--radius-md);
      background: var(--surface); border: 1px solid var(--border);
    }
    .service-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; h3 { margin: 0; font-size: 1.05rem; } }
    .service-price { font-size: 1.2rem; font-weight: 800; color: var(--primary); }
    .service-cat { font-size: 0.8rem; color: var(--primary-light); margin: 0 0 8px; }
    .service-desc { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; }
    .btn-book { border-radius: 8px !important; }
    .reservation-block {
      background: #e8eaf6; border-radius: var(--radius-lg); padding: 32px;
    }
    .resa-form { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; mat-form-field { flex: 1; min-width: 250px; } }
    .reviews-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .review-card { padding: 16px 20px; border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--border); }
    .review-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .review-stars mat-icon { color: #f59e0b; font-size: 16px; width: 16px; height: 16px; }
    .review-date { font-size: 0.8rem; color: var(--text-secondary); }
    .empty-text { color: var(--text-secondary); font-style: italic; }
    .review-form { padding: 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); h3 { margin-bottom: 16px; } }
    @media (max-width: 768px) {
      .profile-header { flex-direction: column; align-items: center; text-align: center; }
      .profile-contact { justify-content: center; }
    }
  `],
})
export class DetailPrestataireComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  protected auth = inject(AuthService);
  private router = inject(Router);

  prestataire?: Prestataire;
  commentaires: Commentaire[] = [];
  Math = Math;
  reservationForm = this.fb.group({ idService: [null as number | null, Validators.required], dateReservation: ['', Validators.required] });
  avisForm = this.fb.group({ note: [5, Validators.required], commentaire: [''] });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.prestataire(id).subscribe((p) => (this.prestataire = p));
    this.api.commentaires(id).subscribe((c) => (this.commentaires = c));
  }
  stars(n: number) { return Array(n).fill(0); }
  selectService(idService: number) {
    if (!this.auth.isLogged()) { this.router.navigate(['/connexion']); return; }
    this.reservationForm.patchValue({ idService });
  }
  reserver() {
    if (this.reservationForm.invalid) return;
    this.api.reserver(this.reservationForm.value as any).subscribe(() => {
      this.snack.open('Réservation envoyée.', 'OK', { duration: 3000 });
      this.router.navigate(['/client/reservations']);
    });
  }
  noter() {
    if (!this.prestataire) return;
    this.api.noterPrestataire({
      idPrestataire: this.prestataire.idPrestataire,
      note: this.avisForm.value.note!,
      commentaire: this.avisForm.value.commentaire || undefined,
    }).subscribe(() => {
      this.snack.open('Merci pour votre avis !', 'OK', { duration: 3000 });
      this.api.commentaires(this.prestataire!.idPrestataire).subscribe((c) => (this.commentaires = c));
      this.avisForm.reset({ note: 5 });
    });
  }
}
