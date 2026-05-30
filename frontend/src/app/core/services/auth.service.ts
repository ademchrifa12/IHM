import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AuthResponse, AuthUser } from '../models';

const ACCESS_KEY = 'psd_access';
const REFRESH_KEY = 'psd_refresh';
const USER_KEY = 'psd_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<AuthUser | null>(this.loadUser());
  readonly user = this._user.asReadonly();
  readonly isLogged = computed(() => this._user() !== null);
  readonly role = computed(() => this._user()?.role ?? null);

  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string) {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/login`, { email, motDePasse })
      .pipe(tap((r) => this.persist(r.data)));
  }

  register(payload: { nom: string; prenom: string; email: string; motDePasse: string; role: 'CLIENT' | 'PRESTATAIRE' }) {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(tap((r) => this.persist(r.data)));
  }

  refresh(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    return this.http
      .post<ApiResponse<AuthResponse>>(`${environment.apiUrl}/auth/refresh`, { refreshToken })
      .pipe(tap((r) => this.persist(r.data)));
  }

  logout() {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}).subscribe({ complete: () => this.clear() });
    this.clear();
  }

  accessToken(): string | null { return localStorage.getItem(ACCESS_KEY); }
  refreshToken(): string | null { return localStorage.getItem(REFRESH_KEY); }

  private persist(r: AuthResponse) {
    localStorage.setItem(ACCESS_KEY, r.accessToken);
    localStorage.setItem(REFRESH_KEY, r.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(r.user));
    this._user.set(r.user);
  }
  private clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
  }
  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
