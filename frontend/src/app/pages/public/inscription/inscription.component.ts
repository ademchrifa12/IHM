import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule],
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-brand">
          <h2>Rejoignez-nous 🚀</h2>
          <p>Créez votre compte et accédez à des centaines de professionnels qualifiés.</p>
        </div>
        <div class="auth-features">
          <div class="auth-feat"><mat-icon>check_circle</mat-icon><span>Inscription gratuite</span></div>
          <div class="auth-feat"><mat-icon>schedule</mat-icon><span>Configuration en 2 min</span></div>
          <div class="auth-feat"><mat-icon>star</mat-icon><span>Accès à tous les services</span></div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card">
          <h1>Créer un compte</h1>
          <p class="auth-sub">Remplissez les informations ci-dessous</p>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput formControlName="nom" />
                <mat-icon matPrefix>person</mat-icon>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="prenom" />
                <mat-icon matPrefix>person</mat-icon>
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline">
              <mat-label>Adresse e-mail</mat-label>
              <input matInput type="email" formControlName="email" />
              <mat-icon matPrefix>mail</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Mot de passe</mat-label>
              <input matInput type="password" formControlName="motDePasse" />
              <mat-icon matPrefix>lock</mat-icon>
              <mat-hint>Minimum 8 caractères</mat-hint>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Je suis un</mat-label>
              <mat-select formControlName="role">
                <mat-option value="CLIENT">Client — Je cherche un service</mat-option>
                <mat-option value="PRESTATAIRE">Prestataire — Je propose mes services</mat-option>
              </mat-select>
              <mat-icon matPrefix>badge</mat-icon>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading" class="auth-submit">
              {{ loading ? 'Création…' : "S'inscrire gratuitement" }}
            </button>
          </form>
          <p class="auth-link">
            Déjà inscrit ? <a routerLink="/connexion">Connectez-vous</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 68px); }
    .auth-left {
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      color: white; padding: 64px; display: flex; flex-direction: column; justify-content: center;
    }
    .auth-brand h2 { color: white; font-size: 2rem; margin-bottom: 12px; }
    .auth-brand p { color: rgba(255,255,255,.8); font-size: 1.1rem; max-width: 360px; }
    .auth-features { margin-top: 48px; display: flex; flex-direction: column; gap: 16px; }
    .auth-feat { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; opacity: .9; }
    .auth-right { display: flex; align-items: center; justify-content: center; padding: 48px; }
    .auth-card { width: 100%; max-width: 440px; }
    .auth-card h1 { font-size: 1.75rem; margin-bottom: 4px; }
    .auth-sub { color: var(--text-secondary); margin-bottom: 32px; }
    .auth-card mat-form-field { width: 100%; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .auth-submit { width: 100%; height: 48px !important; font-size: 1rem !important; border-radius: 10px !important; margin-top: 8px; }
    .auth-link { text-align: center; margin-top: 24px; color: var(--text-secondary); a { color: var(--primary); font-weight: 600; } }
    @media (max-width: 768px) {
      .auth-page { grid-template-columns: 1fr; }
      .auth-left { display: none; }
      .form-row { grid-template-columns: 1fr; }
    }
  `],
})
export class InscriptionComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  loading = false;

  form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],
    role: ['CLIENT' as 'CLIENT' | 'PRESTATAIRE', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.register(this.form.value as any).subscribe({
      next: (r) => {
        this.loading = false;
        this.router.navigate([r.data.user.role === 'PRESTATAIRE' ? '/prestataire' : '/client']);
      },
      error: () => (this.loading = false),
    });
  }
}
